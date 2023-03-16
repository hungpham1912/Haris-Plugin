import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BankingBankService } from 'src/module/banking/banks/bank.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [BankingBankService],
  exports: [BankingBankService],
})
export class BankModule {}
