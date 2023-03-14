import { Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthManagerGuard } from 'src/module/operator/auth/guards/jwt-auth.guard';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { Public } from 'src/wanders/decorators/public.decorator';
import { PluginMerchantService } from './merchant.service';

@ApiTags('Merchants')
@Controller('merchants')
export class PluginMerchantController {
  constructor(private readonly pluginMerchantService: PluginMerchantService) {}

  @ApiBearerAuth()
  @Post('register')
  @Public()
  @UseGuards(JwtAuthManagerGuard)
  @ApiOperation({ summary: 'Register merchant app' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  register() {
    try {
      return this.pluginMerchantService.register(0);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }
}
