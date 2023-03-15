import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BanksController } from './bank.controller';
import { BankService } from './bank.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [BanksController],
  providers: [BankService],
  exports: [BankService],
})
export class BankModule {}
