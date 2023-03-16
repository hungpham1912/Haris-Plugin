import { Injectable } from '@nestjs/common';
import { PaymentByMomoParam } from 'src/core/payments/dto/create-payment.dto';
import { PaymentsService } from 'src/core/payments/payments.service';

@Injectable()
export class BankingPaymentService {
  constructor(private readonly paymentsService: PaymentsService) {}

  async paymentByMomo(body: PaymentByMomoParam) {
    return body;
  }
}
