import { AppointmentsService } from './appointments.service';
export declare class AppointmentsController {
    private appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(body: any): Promise<{
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
        phone: string | null;
        status: string;
        userId: string | null;
        serviceId: string | null;
        dateTime: Date;
        notes: string | null;
        paymentStatus: string;
    })[]>;
    updateStatus(id: string, status: string): import("@prisma/client").Prisma.Prisma__AppointmentClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
