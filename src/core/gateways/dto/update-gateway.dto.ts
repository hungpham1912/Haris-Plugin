import { PartialType } from '@nestjs/swagger';
import { CreateGatewayDto } from './create-gateway.dto';

export class UpdateGatewayDto extends PartialType(CreateGatewayDto) {}
