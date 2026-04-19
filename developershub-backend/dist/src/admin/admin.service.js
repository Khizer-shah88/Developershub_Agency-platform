"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOverview() {
        const [users, services, portfolio, blogPosts, inquiries, appointments] = await this.prisma.$transaction([
            this.prisma.user.count(),
            this.prisma.service.count(),
            this.prisma.portfolio.count(),
            this.prisma.blogPost.count(),
            this.prisma.inquiry.count(),
            this.prisma.appointment.count(),
        ]);
        const [recentInquiries, recentAppointments] = await Promise.all([
            this.prisma.inquiry.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { Service: true, User: true },
            }),
            this.prisma.appointment.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { Service: true, User: true },
            }),
        ]);
        return {
            stats: {
                users,
                services,
                portfolio,
                blogPosts,
                inquiries,
                appointments,
            },
            recentInquiries,
            recentAppointments,
        };
    }
    listUsers() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateUserRole(userId, role, actorId) {
        const normalizedRole = role?.toUpperCase();
        if (normalizedRole !== 'ADMIN' && normalizedRole !== 'CLIENT') {
            throw new common_1.BadRequestException('role must be ADMIN or CLIENT');
        }
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role === normalizedRole) {
            return user;
        }
        if (user.role === 'ADMIN' && normalizedRole === 'CLIENT') {
            if (actorId && actorId === user.id) {
                throw new common_1.BadRequestException('You cannot demote your own admin account');
            }
            const adminCount = await this.prisma.user.count({
                where: { role: 'ADMIN' },
            });
            if (adminCount <= 1) {
                throw new common_1.BadRequestException('Cannot demote the last admin user');
            }
        }
        return this.prisma.user.update({
            where: { id: userId },
            data: { role: normalizedRole },
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
    async removeUser(userId, actorId) {
        const user = await this.prisma.user.findUnique({
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
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (actorId && actorId === user.id) {
            throw new common_1.BadRequestException('You cannot remove your own account');
        }
        if (user.role === 'ADMIN') {
            const adminCount = await this.prisma.user.count({
                where: { role: 'ADMIN' },
            });
            if (adminCount <= 1) {
                throw new common_1.BadRequestException('Cannot remove the last admin user');
            }
        }
        await this.prisma.$transaction([
            this.prisma.inquiry.updateMany({
                where: { userId: user.id },
                data: { userId: null },
            }),
            this.prisma.appointment.updateMany({
                where: { userId: user.id },
                data: { userId: null },
            }),
            this.prisma.user.delete({ where: { id: user.id } }),
        ]);
        return user;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map