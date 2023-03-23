import { Injectable } from '@nestjs/common';
import { LogsService } from 'src/core/logs/logs.service';
import { PaymentByMomoParam } from 'src/core/payments/dto/create-payment.dto';
import { PaymentsService } from 'src/core/payments/payments.service';

@Injectable()
export class BankingPaymentService {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly logsService: LogsService,
  ) {}

  async paymentByMomo(body: PaymentByMomoParam) {
    return body;
  }

  async momoPaymentCallback(req) {
    return await this.logsService.create({ log: req, path: req.path });
  }
}
