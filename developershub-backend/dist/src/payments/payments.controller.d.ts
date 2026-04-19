import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    createCheckout(body: {
        appointmentId: string;
        amount: number;
    }): Promise<{
        url: any;
    }>;
}
