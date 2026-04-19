import { PrismaService } from '../prisma/prisma.service';
export declare class BlogService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        imageUrl: string | null;
        slug: string;
        content: string;
        author: string;
    }[]>;
    findOne(slug: string): import("@prisma/client").Prisma.Prisma__BlogPostClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        imageUrl: string | null;
        slug: string;
        content: string;
        author: string;
    }, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    create(data: any): import("@prisma/client").Prisma.Prisma__BlogPostClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        imageUrl: string | null;
        slug: string;
        content: string;
        author: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: any): import("@prisma/client").Prisma.Prisma__BlogPostClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        imageUrl: string | null;
        slug: string;
        content: string;
        author: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__BlogPostClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        imageUrl: string | null;
        slug: string;
        content: string;
        author: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
