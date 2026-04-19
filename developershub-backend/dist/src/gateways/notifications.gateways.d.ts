import { OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class NotificationsGateway implements OnGatewayConnection {
    server: Server;
    handleConnection(client: any): void;
    sendNewInquiry(inquiry: any): void;
    sendNewAppointment(appointment: any): void;
}
