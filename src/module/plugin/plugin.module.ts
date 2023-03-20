import { Module } from '@nestjs/common';
import { PluginAuthController } from './merchants/auth/auth.controller';
import { PluginAuthModule } from './merchants/auth/auth.module';
import { PluginMerchantController } from './merchants/merchant.controller';
import { PluginMerchantModule } from './merchants/merchant.module';

@Module({
  imports: [PluginMerchantModule, PluginAuthModule],
  controllers: [PluginMerchantController, PluginAuthController],
})
export class PluginModule {}
