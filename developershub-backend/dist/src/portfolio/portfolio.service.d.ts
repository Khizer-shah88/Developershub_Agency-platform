import { PrismaService } from '../prisma/prisma.service';
export declare class PortfolioService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        imageUrl: string;
        clientName: string | null;
        projectUrl: string | null;
    }[]>;
    create(data: any): import("@prisma/client").Prisma.Prisma__PortfolioClient<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        imageUrl: string;
        clientName: string | null;
        projectUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__PortfolioClient<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        imageUrl: string;
        clientName: string | null;
        projectUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__PortfolioClient<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        imageUrl: string;
        clientName: string | null;
        projectUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
