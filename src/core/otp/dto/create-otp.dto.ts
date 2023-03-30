export class CreateOtpDto {
  otp: string;
  expiry: Date;
  type: string;
  email?: string;
  phone?: string;
}
