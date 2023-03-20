import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchant } from 'src/core/merchants/entities/merchant.entity';
import { MerchantsService } from 'src/core/merchants/merchants.service';
import { MerchantInfo } from 'src/core/merchant_info/entities/merchant_info.entity';
import { MerchantInfoService } from 'src/core/merchant_info/merchant_info.service';
import { UsersModule } from 'src/core/users/users.module';
import { PluginAuthService } from './auth.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Merchant, MerchantInfo])],
  providers: [
    UsersModule,
    MerchantsService,
    PluginAuthService,
    MerchantInfoService,
  ],
  exports: [
    UsersModule,
    MerchantsService,
    PluginAuthService,
    MerchantInfoService,
  ],
})
export class PluginAuthModule {}
