import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientPaymentService } from 'src/module/banking/payments/payment.service';
import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentsService, ClientPaymentService],
  exports: [PaymentsService, ClientPaymentService],
})
export class PaymentsModule {}
