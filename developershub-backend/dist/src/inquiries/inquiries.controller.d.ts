import { InquiriesService } from './inquiries.service';
export declare class InquiriesController {
    private inquiriesService;
    constructor(inquiriesService: InquiriesService);
    create(body: any): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        message: string;
        phone: string | null;
        status: string;
        userId: string | null;
        serviceId: string | null;
    }>;
    findAll(req: any): import("@prisma/client").Prisma.PrismaPromise<({
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
    })[]>;
    updateStatus(id: string, status: string): import("@prisma/client").Prisma.Prisma__InquiryClient<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        message: string;
        phone: string | null;
        status: string;
        userId: string | null;
        serviceId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
