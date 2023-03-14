import { Module } from '@nestjs/common';
import { PluginMerchantModule } from './merchants/merchant.module';

@Module({
  imports: [PluginMerchantModule],
  controllers: [],
  exports: [],
})
export class PluginModule {}
