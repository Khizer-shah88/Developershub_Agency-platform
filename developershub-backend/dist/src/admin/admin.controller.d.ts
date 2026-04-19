import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
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
    updateUserRole(id: string, role: string, req: any): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeUser(id: string, req: any): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
