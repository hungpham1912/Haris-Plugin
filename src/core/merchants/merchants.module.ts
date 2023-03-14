import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantsService } from './merchants.service';
import { Merchant } from './entities/merchant.entity';
import { PluginMerchantService } from 'src/module/plugin/merchants/merchant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Merchant])],
  providers: [MerchantsService, PluginMerchantService],
  exports: [MerchantsService, PluginMerchantService],
})
export class MerchantsModule {}
