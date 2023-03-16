import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CliPaymentService } from 'src/module/banking/payments/payment.service';
import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentsService, CliPaymentService],
  exports: [PaymentsService, CliPaymentService],
})
export class PaymentsModule {}
