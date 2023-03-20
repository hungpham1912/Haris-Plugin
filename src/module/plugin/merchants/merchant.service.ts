import { Injectable } from '@nestjs/common';
import { PaginateQuery } from 'nestjs-paginate';
import { MerchantsService } from 'src/core/merchants/merchants.service';
import { MerchantFilter } from 'src/core/merchants/models/merchant.model';

@Injectable()
export class PluginMerchantService {
  constructor(private readonly merchantsService: MerchantsService) {}

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
