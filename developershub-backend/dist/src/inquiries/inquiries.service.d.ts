import { PrismaService } from '../prisma/prisma.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';
export declare class InquiriesService {
    private prisma;
    private notificationsGateway;
    constructor(prisma: PrismaService, notificationsGateway: NotificationsGateway);
    create(data: any): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        message: string;
        status: string;
        userId: string | null;
        serviceId: string | null;
        createdAt: Date;
    }>;
    findAll(role?: string, userId?: string): import("@prisma/client").Prisma.PrismaPromise<({
        User: {
            id: string;
            name: string;
            email: string;
            createdAt: Date;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            updatedAt: Date;
        };
        Service: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            price: number | null;
            imageUrl: string | null;
            category: string | null;
        };
    } & {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        message: string;
        status: string;
        userId: string | null;
        serviceId: string | null;
        createdAt: Date;
    })[]>;
    updateStatus(id: string, status: string): import("@prisma/client").Prisma.Prisma__InquiryClient<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        message: string;
        status: string;
        userId: string | null;
        serviceId: string | null;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
