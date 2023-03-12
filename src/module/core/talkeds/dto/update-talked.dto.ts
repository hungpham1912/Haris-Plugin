import { PartialType } from '@nestjs/swagger';
import { CreateTalkedDto } from './create-talked.dto';

export class UpdateTalkedDto extends PartialType(CreateTalkedDto) {}
