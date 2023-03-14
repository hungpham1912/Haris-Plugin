import { HttpStatus, Injectable } from '@nestjs/common';
import { MERCHANT_ERROR } from 'src/core/merchants/errors/merchant.error';
import { MerchantsService } from 'src/core/merchants/merchants.service';

@Injectable()
export class PluginMerchantService {
  constructor(private readonly merchantsService: MerchantsService) {}

  async register(retry: number) {
    try {
      const merchantCode = this.merchantsService.makeId(32);

      if (retry > 3) {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: MERCHANT_ERROR[1],
        };
      }
      const check = await this.merchantsService.countByQuery({
        merchantCode,
      });
      if (!check) {
        return await this.merchantsService.create({ merchantCode });
      }
      this.register(retry + 1);
    } catch (error) {
      console.log('🚀 ~ file: merchant.service.ts:19 ~ :', error);
      throw error;
    }
  }
}
