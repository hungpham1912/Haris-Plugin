import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MerchantGuard } from 'src/core/merchants/guards/merchant.guard';
import { PaymentByMomoParam } from 'src/core/payments/dto/create-payment.dto';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { BankingPaymentService } from './payment.service';

@ApiTags('Payments')
@Controller('payments')
export class BankingPaymentController {
  constructor(private readonly cliPaymentService: BankingPaymentService) {}

  @Post('momo')
  @UseGuards(MerchantGuard)
  @ApiHeader({ name: 'Authorization', description: 'Signature' })
  @ApiOperation({ summary: 'Payment by momo' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 200, description: 'OK' })
  async paymentByMomo(@Body() body: PaymentByMomoParam) {
    try {
      return await this.cliPaymentService.paymentByMomo(body);
    } catch (error) {
      return { ...BASE_ERROR[0] };
    }
  }
}
