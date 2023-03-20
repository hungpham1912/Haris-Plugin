import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantInfo } from './entities/merchant_info.entity';
import { MerchantInfoService } from './merchant_info.service';

@Module({
  imports: [TypeOrmModule.forFeature([MerchantInfo])],
  providers: [MerchantInfoService],
  exports: [MerchantInfoService],
})
export class MerchantInfoModule {}
