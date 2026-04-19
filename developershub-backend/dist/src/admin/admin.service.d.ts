import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getOverview(): Promise<{
        stats: {
            users: number;
            services: number;
            portfolio: number;
            blogPosts: number;
            inquiries: number;
            appointments: number;
        };
        recentInquiries: ({
            User: {
                id: string;
                name: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                createdAt: Date;
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
            createdAt: Date;
            message: string;
            phone: string | null;
            status: string;
            userId: string | null;
            serviceId: string | null;
        })[];
        recentAppointments: ({
            User: {
                id: string;
                name: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                createdAt: Date;
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
            createdAt: Date;
            phone: string | null;
            status: string;
            userId: string | null;
            serviceId: string | null;
            dateTime: Date;
            notes: string | null;
            paymentStatus: string;
        })[];
    }>;
    listUsers(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateUserRole(userId: string, role: string, actorId?: string): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeUser(userId: string, actorId?: string): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
