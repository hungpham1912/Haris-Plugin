import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  RegisterMerchantDto,
  RegisterMerchantUserDto,
} from 'src/core/auth/dto/auth.dto';
import { VerifyOtpRegisterMerchant } from 'src/core/auth/dto/verify.dto';
import { SignDto } from 'src/core/merchants/dto/auth-merchant.dto';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { Public } from 'src/wanders/decorators/public.decorator';
import { PluginAuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('')
export class PluginAuthController {
  constructor(private readonly pluginAuthService: PluginAuthService) {}

  @Post('sign')
  @Public()
  @ApiOperation({ summary: 'Gen signature' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  async sign(@Body() body: SignDto) {
    try {
      return await this.pluginAuthService.sign(body);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }

  @Post('merchantRegister')
  @Public()
  @ApiOperation({ summary: 'Register merchant app' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  async merchantRegister(@Body() body: RegisterMerchantDto) {
    try {
      return await this.pluginAuthService.merchantRegister(body);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }

  @Post('merchantRegister/verifyOtp')
  @Public()
  @ApiOperation({ summary: 'Verify otp for register merchant app' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  async verifyOtp(@Body() body: VerifyOtpRegisterMerchant) {
    try {
      return await this.pluginAuthService.verifyRegisterMerchant(body);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }

  @Post('merchants/:merchantId/users/register')
  @ApiOperation({ summary: 'Register for merchant user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  async userRegister(@Body() body: RegisterMerchantUserDto) {
    try {
      return await this.pluginAuthService.registerMerchantUser(body);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }
}
