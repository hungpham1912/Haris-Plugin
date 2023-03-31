import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { VerifyForgotKeyMerchant } from 'src/core/auth/dto/verify.dto';
import { Merchant } from 'src/core/merchants/entities/merchant.entity';
import { JwtMerchantAuthGuard } from 'src/core/merchants/guards/jwt.guard';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { AuthResponse } from 'src/wanders/decorators/auth.decorator';
import { PluginMerchantHelpService } from '../services/help.service';

@ApiTags('Help')
@UseGuards(JwtMerchantAuthGuard)
@Controller('merchant/')
export class PluginMerchantHelpController {
  constructor(private readonly pluginAuthService: PluginMerchantHelpService) {}

  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @Post('/verifyForgotKey')
  @ApiOperation({ summary: 'Verify forgot key' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  async verifyForgotKey(
    @AuthResponse() merchant: Merchant,
    @Body() body: VerifyForgotKeyMerchant,
  ) {
    try {
      return await this.pluginAuthService.verifyForgotKey(body, merchant);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }
}
