import { Module } from '@nestjs/common';
import { PluginMerchantController } from './merchants/merchant.controller';
import { PluginMerchantModule } from './merchants/merchant.module';

@Module({
  imports: [PluginMerchantModule],
  controllers: [PluginMerchantController],
})
export class PluginModule {}
