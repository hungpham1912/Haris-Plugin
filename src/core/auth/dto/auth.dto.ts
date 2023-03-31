import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MerchantNotExistConstraint } from 'src/core/merchants/constraints/auth-merchant.contraints';
import { MERCHANT_AUTH_ERROR } from 'src/core/merchants/errors/auth.error';

export class LoginDto {
  @ApiProperty({
    description: 'Phone number',
    example: '0964816xxx',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phone: string;

  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterManagerDto {
  @ApiProperty({
    description: 'Email',
    example: 'example@just.engineer.com',
  })
  @IsDefined()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Full name',
    example: 'Donlar Tump',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Phone number',
    example: '0964816xxx',
  })
  @IsDefined()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phone: string;
}

export class RegisterUserDto {
  @ApiProperty({
    description: 'Email',
    example: 'example@just.engineer.com',
  })
  @IsDefined()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Full name',
    example: 'Donlar Tump',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Phone number',
    example: '0964816xxx',
  })
  @IsDefined()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phone: string;
}

export class RegisterMerchantUserDto {
  @ApiProperty({
    description: '32 length',
    example: 'L6JkskgIW3rIMGIiyZ3L2GpIKET0LjsE',
  })
  @IsDefined()
  @IsString()
  @MinLength(32)
  @MaxLength(32)
  @IsNotEmpty()
  merchantUserCode: string;
}

export class RegisterMerchantDto {
  @ApiProperty({
    description: 'Mail',
    example: 'example@gmail.com',
  })
  @IsDefined()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: '1234567',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  password: string;

  @ApiProperty({
    description: 'Name',
    example: '',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}

export class LoginMerchantDto {
  @ApiProperty({
    description: 'Mail',
    example: 'example@gmail.com',
  })
  @IsDefined()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Validate(MerchantNotExistConstraint, { message: MERCHANT_AUTH_ERROR[4] })
  email: string;

  @ApiProperty({
    description: 'Password',
    example: '1234567',
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  password: string;
}

export class CreateMerchantUserParam extends RegisterMerchantUserDto {
  role: string;
  merchantId: string;
}
