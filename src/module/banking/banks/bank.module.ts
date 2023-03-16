import { Module } from '@nestjs/common';
import { BankModule } from 'src/core/banks/bank.module';

@Module({
  imports: [BankModule],
  providers: [BankModule],
  exports: [BankModule],
})
export class ClientBankModule {}
