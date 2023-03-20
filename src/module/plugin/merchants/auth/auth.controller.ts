import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterMerchantUserDto, SignDto } from 'src/core/auth/dto/auth.dto';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { Public } from 'src/wanders/decorators/public.decorator';
import { PluginAuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('')
export class PluginAuthController {
  constructor(private readonly pluginAuthService: PluginAuthService) {}

  @ApiBearerAuth()
  @Get('sign')
  @Public()
  @ApiOperation({ summary: 'Register merchant app' })
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

  @ApiBearerAuth()
  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Register merchant app' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  async merchantRegister() {
    try {
      return await this.pluginAuthService.merchantRegister();
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
