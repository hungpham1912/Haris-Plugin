import { Module } from '@nestjs/common';
import { BankModule } from './banks/bank.module';

@Module({
  imports: [BankModule],
})
export class BankingModule {}
