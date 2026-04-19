"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcryptjs"));
const nodemailer = require('nodemailer');
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        let user;
        try {
            user = await this.prisma.user.create({
                data: { name, email, password: hashedPassword, role: 'CLIENT' },
            });
        }
        catch (error) {
            if (error?.code === 'P2002') {
                throw new common_1.ConflictException('Email already exists');
            }
            throw error;
        }
        return this.login(user.email, password);
    }
    async login(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        };
    }
    async setupAdmin(name, email, password) {
        const existingAdmin = await this.prisma.user.findFirst({
            where: { role: 'ADMIN' },
            select: { id: true },
        });
        if (existingAdmin) {
            throw new common_1.BadRequestException('Admin already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            return await this.prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: 'ADMIN',
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                },
            });
        }
        catch (error) {
            if (error?.code === 'P2002') {
                throw new common_1.ConflictException('Email already exists');
            }
            throw error;
        }
    }
    async requestPasswordReset(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true },
        });
        const genericResponse = {
            message: 'If an account exists for this email, a password reset link has been sent.',
        };
        if (!user) {
            return genericResponse;
        }
        const smtpHost = process.env.SMTP_HOST?.trim();
        const smtpPort = Number(process.env.SMTP_PORT || '587');
        const smtpUser = process.env.SMTP_USER?.trim();
        const smtpPass = process.env.SMTP_PASS?.trim();
        const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:3000').trim();
        const mailFrom = (process.env.MAIL_FROM || smtpUser)?.trim();
        if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !mailFrom) {
            throw new common_1.BadRequestException('Password reset email is not configured on server');
        }
        const resetToken = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            type: 'password_reset',
        }, { expiresIn: '15m' });
        const resetUrl = `${frontendUrl.replace(/\/$/, '')}/reset-password?token=${encodeURIComponent(resetToken)}`;
        const isGmail = smtpHost === 'smtp.gmail.com';
        const transporter = isGmail
            ? nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: smtpUser,
                    pass: smtpPass,
                },
            })
            : nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: smtpUser,
                    pass: smtpPass,
                },
            });
        try {
            await transporter.sendMail({
                from: mailFrom,
                to: user.email,
                subject: 'DevelopersHub password reset',
                text: `Reset your password using this link (valid for 15 minutes): ${resetUrl}`,
                html: `
          <p>You requested a password reset for DevelopersHub.</p>
          <p>This link is valid for <strong>15 minutes</strong>.</p>
          <p><a href="${resetUrl}">Reset Password</a></p>
          <p>If you did not request this, you can ignore this email.</p>
        `,
            });
        }
        catch (error) {
            const detail = error?.response || error?.message || 'Unknown SMTP error';
            console.error('Password reset email send failed:', detail);
            throw new common_1.BadRequestException(`Failed to send reset email. Check SMTP credentials and sender settings. Detail: ${detail}`);
        }
        return genericResponse;
    }
    async resetPassword(token, newPassword) {
        let payload;
        try {
            payload = this.jwtService.verify(token);
        }
        catch {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        if (payload?.type !== 'password_reset' || !payload?.sub) {
            throw new common_1.BadRequestException('Invalid reset token payload');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: payload.sub },
            data: { password: hashedPassword },
        });
        return { message: 'Password reset successful. You can now log in.' };
    }
    async me(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map