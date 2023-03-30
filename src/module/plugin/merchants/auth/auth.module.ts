import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/core/auth/auth.service';
import { MailModule } from 'src/core/mails/mail.module';
import { Merchant } from 'src/core/merchants/entities/merchant.entity';
import { MerchantsService } from 'src/core/merchants/merchants.service';
import { MerchantInfo } from 'src/core/merchant_info/entities/merchant_info.entity';
import { MerchantInfoService } from 'src/core/merchant_info/merchant_info.service';
import { Otp } from 'src/core/otp/entities/otp.entity';
import { OtpModule } from 'src/core/otp/otp.module';
import { UsersModule } from 'src/core/users/users.module';
import { PluginMerchantAuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Merchant, MerchantInfo, Otp]),
    MailModule,
    OtpModule,
  ],
  providers: [
    MerchantsService,
    PluginMerchantAuthService,
    MerchantInfoService,
    AuthService,
    JwtService,
  ],
  exports: [MerchantsService, PluginMerchantAuthService, MerchantInfoService],
})
export class PluginAuthModule {}
