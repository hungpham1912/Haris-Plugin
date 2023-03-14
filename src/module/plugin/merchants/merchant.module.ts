import { Module } from '@nestjs/common';
import { MerchantsModule } from 'src/core/merchants/merchants.module';

@Module({
  imports: [MerchantsModule],
  providers: [MerchantsModule],
  exports: [MerchantsModule],
})
export class PluginMerchantModule {}
