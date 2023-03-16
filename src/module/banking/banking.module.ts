import { Module } from '@nestjs/common';
import { ClientBanksController } from './banks/bank.controller';
import { ClientBankModule } from './banks/bank.module';
import { ClientPaymentController } from './payments/payment.controller';
import { ClientPaymentModule } from './payments/payment.module';

@Module({
  imports: [ClientBankModule, ClientPaymentModule],
  controllers: [ClientPaymentController, ClientBanksController],
})
export class BankingModule {}
