import { Module } from '@nestjs/common';
import { BankingBanksController } from './banks/bank.controller';
import { BankingBankModule } from './banks/bank.module';
import { ClientPaymentController } from './payments/payment.controller';
import { ClientPaymentModule } from './payments/payment.module';

@Module({
  imports: [BankingBankModule, ClientPaymentModule],
  controllers: [ClientPaymentController, BankingBanksController],
})
export class BankingModule {}
