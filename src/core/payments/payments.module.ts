import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankingPaymentService } from 'src/module/banking/payments/payment.service';
import { Log } from '../logs/entities/log.entity';
import { LogsService } from '../logs/logs.service';
import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Log])],
  providers: [PaymentsService, BankingPaymentService, LogsService],
  exports: [PaymentsService, BankingPaymentService, LogsService],
})
export class PaymentsModule {}
