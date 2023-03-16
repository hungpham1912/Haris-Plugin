import { Injectable } from '@nestjs/common';
import { PaymentsService } from 'src/core/payments/payments.service';

@Injectable()
export class CliPaymentService {
  constructor(private readonly paymentsService: PaymentsService) {}
}
