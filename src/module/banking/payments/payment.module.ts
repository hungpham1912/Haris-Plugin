import { Module } from '@nestjs/common';
import { PaymentsModule } from 'src/core/payments/payments.module';

@Module({
  imports: [PaymentsModule],
  providers: [PaymentsModule],
  exports: [PaymentsModule],
})
export class ClientPaymentModule {}
