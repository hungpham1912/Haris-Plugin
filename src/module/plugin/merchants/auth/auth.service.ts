import { Injectable } from '@nestjs/common';
import { RegisterMerchantUserDto } from 'src/core/auth/dto/auth.dto';
import { SignDto } from 'src/core/merchants/dto/auth-merchant.dto';
import { MerchantsService } from 'src/core/merchants/merchants.service';
import { MerchantInfoService } from 'src/core/merchant_info/merchant_info.service';
import { generateKey } from 'src/shared/helper/system.helper';
import crypto = require('crypto');

@Injectable()
export class PluginAuthService {
  constructor(
    private readonly merchantsService: MerchantsService,
    private readonly merchantInfoService: MerchantInfoService,
  ) {}
  async registerMerchantUser(body: RegisterMerchantUserDto) {
    return body;
  }

  async merchantRegister() {
    try {
      const merchantCode = await this.merchantsService.createMerchantCode(0);
      const key = generateKey();
      const merchant = await this.merchantsService.create({
        merchantCode,
      });
      this.merchantInfoService.create({
        merchantId: merchant.id,
        ...key,
      });
      return merchant;
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:17 ~ :', error);
      throw error;
    }
  }

  async sign(data: SignDto) {
    try {
      const { merchantCode, timestamp, body } = data;
      const str = `${merchantCode}\n${timestamp}\n${JSON.stringify(body)}`;
      console.log(
        '🚀 ~ file: auth.service.ts:40 ~ PluginAuthService ~ sign ~ str:',
        str,
      );
      // const merchant = await this.merchantsService.findOne({ merchantCode });

      // const info = await this.merchantInfoService.findOne({
      //   merchantId: merchant.id,
      // });
      // console.log(
      //   '🚀 ~ file: auth.service.ts:46 ~ PluginAuthService ~ sign ~ merchant:',
      //   info.privateKey,
      // );

      // const privateKey = info.privateKey.split('\n')[1];
      // console.log(
      //   '🚀 ~ file: auth.service.ts:52 ~ PluginAuthService ~ sign ~ privateKey:',
      //   privateKey,
      // );

      // const encryptedData = crypto.createSign('RSA-SHA256');
      // encryptedData.write(str);
      // encryptedData.end();
      // const signature = encryptedData.sign(privateKey, 'base64');

      // const signature = crypto
      //   .sign('SHA256', Buffer.from(str), privateKey)
      //   .toString('base64z');

      return signature;
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:50 ~ :', error);
      throw error;
    }
  }
}
