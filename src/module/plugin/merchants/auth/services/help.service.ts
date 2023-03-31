import { Injectable } from '@nestjs/common';
import { MailService } from 'src/core/mails/mail.service';
import { MERCHANT_CONSTANT } from 'src/core/merchants/constants/merchant.constant';
import { Merchant } from 'src/core/merchants/entities/merchant.entity';
import { OtpType } from 'src/core/otp/entities/otp.entity';
import { OtpService } from 'src/core/otp/otp.service';
import { getTemplateOtp } from 'views/mail-register';

@Injectable()
export class PluginMerchantHelpService {
  constructor(
    private readonly otpService: OtpService,
    private readonly mailService: MailService,
  ) {}
  async forgotKey(merchant: Merchant) {
    try {
      const otp = await this.otpService.create({
        type: OtpType.EMAIL,
        email: merchant.email,
      });
      this.mailService.sendMailFormSystem({
        subject: MERCHANT_CONSTANT.mail.forgotKey,
        to: otp.email,
        html: await getTemplateOtp(merchant.name, otp.otp),
      });
    } catch (error) {
      console.log('🚀 ~ file: help.service.ts:27 ~ :', error);
      throw error;
    }
  }
}
