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
exports.InquiriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_gateway_1 = require("../notifications/notifications.gateway");
let InquiriesService = class InquiriesService {
    prisma;
    notificationsGateway;
    constructor(prisma, notificationsGateway) {
        this.prisma = prisma;
        this.notificationsGateway = notificationsGateway;
    }
    async create(data) {
        const payload = {
            ...data,
            name: typeof data?.name === 'string' ? data.name.trim() : '',
            email: typeof data?.email === 'string' ? data.email.trim() : '',
            message: typeof data?.message === 'string' ? data.message.trim() : '',
            phone: typeof data?.phone === 'string' ? data.phone.trim() : data?.phone,
        };
        if (!payload.name || !payload.email || !payload.message) {
            throw new common_1.BadRequestException('Name, email and message are required.');
        }
        if (payload.serviceId) {
            const serviceExists = await this.prisma.service.findUnique({
                where: { id: payload.serviceId },
                select: { id: true },
            });
            if (!serviceExists) {
                delete payload.serviceId;
            }
        }
        if (payload.userId) {
            const userExists = await this.prisma.user.findUnique({
                where: { id: payload.userId },
                select: { id: true },
            });
            if (!userExists) {
                delete payload.userId;
            }
        }
        const inquiry = await this.prisma.inquiry.create({ data: payload });
        const gateway = this.notificationsGateway;
        gateway.sendNewInquiry?.(inquiry);
        return inquiry;
    }
    findAll(role, userId) {
        const where = role === 'ADMIN' ? {} : { userId };
        return this.prisma.inquiry.findMany({
            where,
            include: { Service: true, User: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    updateStatus(id, status) {
        return this.prisma.inquiry.update({
            where: { id },
            data: { status },
        });
    }
};
exports.InquiriesService = InquiriesService;
exports.InquiriesService = InquiriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_gateway_1.NotificationsGateway])
], InquiriesService);
//# sourceMappingURL=inquiries.service.js.map