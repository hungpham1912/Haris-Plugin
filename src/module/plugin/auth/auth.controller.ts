import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterMerchantUserDto } from 'src/core/auth/dto/auth.dto';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { PluginAuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('')
export class CliAuthController {
  constructor(private readonly pluginAuthService: PluginAuthService) {}

  @Post('merchants/:merchantId/users/register')
  @ApiOperation({ summary: 'Register for merchant user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  async register(@Body() body: RegisterMerchantUserDto) {
    try {
      return await this.pluginAuthService.registerMerchantUser(body);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }
}
