import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentByMomoParam } from 'src/core/payments/dto/create-payment.dto';
import { BASE_ERROR } from 'src/shared/error/base.error';
import { ClientPaymentService } from './payment.service';

@ApiTags('Payments')
@Controller('payments')
export class ClientPaymentController {
  constructor(private readonly cliPaymentService: ClientPaymentService) {}

  @Post('momo')
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
