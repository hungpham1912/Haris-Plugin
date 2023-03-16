import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CliPaymentService } from './payment.service';

@ApiTags('Payments')
@Controller('payments')
export class CliPaymentController {
  constructor(private readonly cliPaymentService: CliPaymentService) {}
}
