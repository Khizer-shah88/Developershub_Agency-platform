import { PortfolioService } from './portfolio.service';
export declare class PortfolioController {
    private portfolioService;
    constructor(portfolioService: PortfolioService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        imageUrl: string;
        clientName: string | null;
        projectUrl: string | null;
    }[]>;
    create(body: any): import("@prisma/client").Prisma.Prisma__PortfolioClient<{
        id: string;
        createdAt: Date;
        title: string;
        description: string;
        imageUrl: string;
        clientName: string | null;
        projectUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, body: any): import("@prisma/client").Prisma.Prisma__PortfolioClient<{
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
