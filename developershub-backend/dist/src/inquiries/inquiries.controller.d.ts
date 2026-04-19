import { InquiriesService } from './inquiries.service';
export declare class InquiriesController {
    private inquiriesService;
    constructor(inquiriesService: InquiriesService);
    create(body: any): Promise<{
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
    findAll(req: any): import("@prisma/client").Prisma.PrismaPromise<({
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
