import { Injectable } from '@nestjs/common';
import { MerchantInfo } from 'src/core/merchant_info/entities/merchant_info.entity';
import * as fs from 'fs';
import { MERCHANT_CONSTANT } from 'src/core/merchants/constants/merchant.constant';
import { createUUID } from 'src/shared/helper/system.helper';

@Injectable()
export class PluginFilesService {
  async createKeyFile(body: MerchantInfo) {}

  buildNameFile(uuid: string) {
    return {
      privateUrl: `${uuid}_private.pem`,
      publicUrl: `${uuid}_public.pem`,
    };
  }
}
