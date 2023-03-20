import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchant } from 'src/core/merchants/entities/merchant.entity';
import { MerchantsService } from 'src/core/merchants/merchants.service';
import { UsersModule } from 'src/core/users/users.module';
import { PluginAuthService } from './auth.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Merchant])],
  providers: [UsersModule, MerchantsService, PluginAuthService],
  exports: [UsersModule, MerchantsService, PluginAuthService],
})
export class PluginAuthModule {}
