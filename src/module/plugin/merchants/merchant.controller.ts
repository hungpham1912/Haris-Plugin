import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { MerchantFilter } from 'src/core/merchants/models/merchant.model';
import { JwtAuthManagerGuard } from 'src/module/operator/auth/guards/jwt-auth.guard';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { MerchantFilterDecor } from 'src/wanders/decorators/merchant.decorator';
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

  @ApiQuery({
    example: 1,
    name: 'page',
  })
  @ApiQuery({
    example: 10,
    name: 'limit',
  })
  @ApiQuery({
    example: '',
    name: 'merchantCode',
  })
  @ApiBearerAuth()
  @Get('')
  @Public()
  @UseGuards(JwtAuthManagerGuard)
  @ApiOperation({ summary: 'Register merchant app' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  getAll(
    @Paginate() query: PaginateQuery,
    @MerchantFilterDecor() filter: MerchantFilter,
  ) {
    try {
      return this.pluginMerchantService.getAll(query, filter);
    } catch (error) {
      return BASE_ERROR[0];
    }
  }
}
