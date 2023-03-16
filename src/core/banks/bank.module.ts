import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientBankService } from 'src/module/banking/banks/bank.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ClientBankService],
  exports: [ClientBankService],
})
export class BankModule {}
