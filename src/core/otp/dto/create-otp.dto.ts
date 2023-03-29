export class CreateOtpDto {
  otp: string;
  expiry: number;
  type: string;
  email?: string;
  phone?: string;
}
