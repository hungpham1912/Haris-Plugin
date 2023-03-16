import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateQRDto } from 'src/core/banks/dto/banks.dto';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { Public } from 'src/wanders/decorators/public.decorator';
import { BankService } from './bank.service';

@ApiTags('Banks')
@Controller('banks')
export class BanksController {
  constructor(private readonly bankService: BankService) {}

  @Get('getBanks')
  @Public()
  @ApiOperation({ summary: 'Get all banks' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getBanks() {
    try {
      return await this.bankService.getBanks();
    } catch (error) {
      return { ...BASE_ERROR[0], detail: error?.response?.data };
    }
  }

  @Post('createQR')
  @Public()
  @ApiOperation({ summary: 'Create QR' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  async createQR(@Body() body: CreateQRDto) {
    try {
      return await this.bankService.createQR(body);
    } catch (error) {
      return { ...BASE_ERROR[0], detail: error?.response?.data };
    }
  }
}
