import { Module } from '@nestjs/common';
import { BankModule } from './vietQR/banks/bank.module';

@Module({
  imports: [BankModule],
})
export class BankingModule {}
