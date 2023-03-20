import { Injectable } from '@nestjs/common';
import { RegisterMerchantUserDto } from 'src/core/auth/dto/auth.dto';
import { MerchantsService } from 'src/core/merchants/merchants.service';

@Injectable()
export class PluginAuthService {
  constructor(private readonly merchantsService: MerchantsService) {}
  async registerMerchantUser(body: RegisterMerchantUserDto) {
    return body;
  }

  async merchantRegister() {
    try {
      const merchantCode = await this.merchantsService.createMerchantCode(0);
      this.merchantsService.create({ merchantCode });
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:17 ~ :', error);
      throw error;
    }
  }
}
