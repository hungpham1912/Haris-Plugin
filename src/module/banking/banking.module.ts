import { Module } from '@nestjs/common';
import { BankingBanksController } from './banks/bank.controller';
import { BankingBankModule } from './banks/bank.module';
import { BankingPaymentController } from './payments/payment.controller';
import { BankingPaymentsModule } from './payments/payment.module';

@Module({
  imports: [BankingBankModule, BankingPaymentsModule],
  controllers: [BankingPaymentController, BankingBanksController],
})
export class BankingModule {}
