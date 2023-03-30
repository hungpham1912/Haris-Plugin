export class CreateOtpDto {
  type: string;
  email?: string;
  phone?: string;
}

export class CreateOtpParam extends CreateOtpDto {
  otp: string;
  expiry: Date;
}
