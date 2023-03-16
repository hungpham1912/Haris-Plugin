import { Module } from '@nestjs/common';
import { GatewaysService } from './gateways.service';

@Module({
  providers: [GatewaysService],
  exports: [GatewaysService],
})
export class GatewaysModule {}
