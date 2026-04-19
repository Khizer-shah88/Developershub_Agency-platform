import { BlogService } from './blog.service';
export declare class BlogController {
    private blogService;
    constructor(blogService: BlogService);
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
    create(body: any): import("@prisma/client").Prisma.Prisma__BlogPostClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        imageUrl: string | null;
        slug: string;
        content: string;
        author: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, body: any): import("@prisma/client").Prisma.Prisma__BlogPostClient<{
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
