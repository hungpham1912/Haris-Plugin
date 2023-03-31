import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Merchant } from 'src/core/merchants/entities/merchant.entity';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { AuthResponse } from 'src/wanders/decorators/auth.decorator';
import { PluginMerchantHelpService } from '../services/help.service';

@ApiTags('Help')
@Controller('merchant/')
export class PluginMerchantHelpController {
  constructor(private readonly pluginAuthService: PluginMerchantHelpService) {}

  @Post('/forgotKey')
  @ApiOperation({ summary: 'Merchant forgot key' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  async forgotKey(@AuthResponse() merchant: Merchant) {
    try {
      return await this.pluginAuthService.forgotKey(merchant);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }
}
