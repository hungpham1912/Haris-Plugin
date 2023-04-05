import { Module } from '@nestjs/common';
import { PluginAuthController } from './merchants/auth/controllers/auth.controller';
import { PluginAuthModule } from './merchants/auth/auth.module';
import { PluginMerchantController } from './merchants/merchant.controller';
import { PluginMerchantModule } from './merchants/merchant.module';
import { PluginMerchantHelpController } from './merchants/auth/controllers/help.controller';
import { PluginFilesModule } from './files/file.module';

@Module({
  imports: [PluginMerchantModule, PluginAuthModule, PluginFilesModule],
  controllers: [
    PluginMerchantController,
    PluginAuthController,
    PluginMerchantHelpController,
  ],
})
export class PluginModule {}
