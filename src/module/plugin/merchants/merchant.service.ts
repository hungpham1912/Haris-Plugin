import { HttpStatus, Injectable } from '@nestjs/common';
import { PaginateQuery } from 'nestjs-paginate';
import { MERCHANT_ERROR } from 'src/core/merchants/errors/merchant.error';
import { MerchantsService } from 'src/core/merchants/merchants.service';
import { MerchantFilter } from 'src/core/merchants/models/merchant.model';

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

  async getAll(query: PaginateQuery, filter: MerchantFilter) {
    try {
      const { limit, page } = query;
      return await this.merchantsService.paginate(limit, page, query, filter);
    } catch (error) {
      console.log('🚀 ~ file: users.service.ts:15 ~ ', error);
      throw error;
    }
  }

  async demo() {
    const code = 'L6JkskgIW3rIMGIiyZ3L2GpIKET0LjsE';
    return code;
  }
}
