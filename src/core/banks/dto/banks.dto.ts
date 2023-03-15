import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  IsEnum,
} from 'class-validator';
import { TemplateType } from '../entities/bank.entity';

export class CreateQRDto {
  @ApiProperty({
    example: '',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  accountNo: string;
  @ApiProperty({
    example: '',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  accountName: string;
  @ApiProperty({
    example: '',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  acqId: string;
  @ApiProperty({
    example: '',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  addInfo: string;

  @ApiProperty({
    example: 10000,
  })
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  @Max(1000000)
  @Min(1)
  amount: number;

  @ApiProperty({
    example: '',
  })
  @IsDefined()
  @IsEnum(TemplateType)
  @IsNotEmpty()
  template: string;
}
