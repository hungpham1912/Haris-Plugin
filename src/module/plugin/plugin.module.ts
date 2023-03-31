import { Module } from '@nestjs/common';
import { PluginAuthController } from './merchants/auth/controllers/auth.controller';
import { PluginAuthModule } from './merchants/auth/auth.module';
import { PluginMerchantController } from './merchants/merchant.controller';
import { PluginMerchantModule } from './merchants/merchant.module';
import { PluginMerchantHelpController } from './merchants/auth/controllers/help.controller';

@Module({
  imports: [PluginMerchantModule, PluginAuthModule],
  controllers: [
    PluginMerchantController,
    PluginAuthController,
    PluginMerchantHelpController,
  ],
})
export class PluginModule {}
