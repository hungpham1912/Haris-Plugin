import { Injectable } from '@nestjs/common';
import { RegisterMerchantUserDto, SignDto } from 'src/core/auth/dto/auth.dto';
import { MerchantsService } from 'src/core/merchants/merchants.service';
import { generateKey } from 'src/shared/helper/system.helper';

@Injectable()
export class PluginAuthService {
  constructor(private readonly merchantsService: MerchantsService) {}
  async registerMerchantUser(body: RegisterMerchantUserDto) {
    return body;
  }

  async merchantRegister() {
    try {
      const merchantCode = await this.merchantsService.createMerchantCode(0);
      const key = generateKey();
      return await this.merchantsService.create({ merchantCode, ...key });
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:17 ~ :', error);
      throw error;
    }
  }

  async sign(body: SignDto) {}
}
