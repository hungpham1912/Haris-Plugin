import { PartialType } from '@nestjs/swagger';
import { CreateKeyInfoDto } from './create-key_info.dto';

export class UpdateKeyInfoDto extends PartialType(CreateKeyInfoDto) {}
