import { Server } from 'socket.io';
export declare class NotificationsGateway {
    server: Server;
    handleMessage(client: any, payload: any): string;
    sendNewInquiry(inquiry: unknown): void;
    sendNewAppointment(appointment: unknown): void;
}
