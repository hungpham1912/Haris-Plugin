import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  IsNotEmpty,
  IsUUID,
  Validate,
  MinLength,
  MaxLength,
} from 'class-validator';
import { MerchantIdNotExistConstraint } from 'src/core/merchants/constraints/auth-merchant.contraints';
import { MERCHANT_AUTH_ERROR } from 'src/core/merchants/errors/auth.error';

export class VerifyOtpRegisterMerchant {
  @ApiProperty({
    description: 'Merchant Id',
    example: '',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @Validate(MerchantIdNotExistConstraint, { message: MERCHANT_AUTH_ERROR[2] })
  merchantId: string;

  @ApiProperty({
    description: 'Otp',
    example: '1111',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(4)
  otp: string;
}
