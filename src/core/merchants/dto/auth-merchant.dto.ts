import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsNumber,
  Validate,
} from 'class-validator';
import { PaymentByMomoParam } from 'src/core/payments/dto/create-payment.dto';
import {
  MerchantICodeExistConstraint,
  SignBodyConstraint,
} from '../constraints/auth-merchant.contraints';
import { SIGN_ERROR } from '../errors/auth.error';

export class SignDto {
  @ApiProperty({
    description: '32 length',
    example: 'L6JkskgIW3rIMGIiyZ3L2GpIKET0LjsE',
  })
  @IsDefined()
  @IsString()
  @MinLength(32)
  @MaxLength(32)
  @IsNotEmpty()
  @Validate(MerchantICodeExistConstraint, { message: SIGN_ERROR[1] })
  merchantCode: string;

  @ApiProperty({
    example: '',
  })
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  timestamp: string;

  @ApiProperty({
    example: {
      partnerCode: '',
      partnerName: '',
      storeId: '',
      requestType: '',
      ipnUrl: '',
      redirectUrl: '',
      orderId: '',
      amount: 123,
      lang: '',
      orderInfo: '',
      requestId: '',
      extraData: '',
      signature: '',
    },
  })
  @IsDefined()
  @IsNotEmpty()
  @Validate(SignBodyConstraint, { message: SIGN_ERROR[2] })
  body: PaymentByMomoParam;
}
