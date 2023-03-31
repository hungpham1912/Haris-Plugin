import { HttpStatus, Injectable } from '@nestjs/common';
import { VerifyOtpMerchant } from 'src/core/auth/dto/verify.dto';
import { MailService } from 'src/core/mails/mail.service';
import { MERCHANT_CONSTANT } from 'src/core/merchants/constants/merchant.constant';
import { Merchant } from 'src/core/merchants/entities/merchant.entity';
import { MERCHANT_AUTH_ERROR } from 'src/core/merchants/errors/auth.error';
import { MerchantInfoService } from 'src/core/merchant_info/merchant_info.service';
import { OtpType } from 'src/core/otp/entities/otp.entity';
import { OtpService } from 'src/core/otp/otp.service';
import { MoreThanOrEqual } from 'typeorm';
import { getTemplateInfoMerchant } from 'views/mail-infor';
import { getTemplateOtp } from 'views/mail-register';

@Injectable()
export class PluginMerchantHelpService {
  constructor(
    private readonly otpService: OtpService,
    private readonly mailService: MailService,
    private readonly merchantInfoService: MerchantInfoService,
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
      return {
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.log('🚀 ~ file: help.service.ts:27 ~ :', error);
      throw error;
    }
  }

  async VerifyForgotKey(body: VerifyOtpMerchant, merchant: Merchant) {
    try {
      const otp = await this.otpService.findOne({
        email: merchant.email,
        expiry: MoreThanOrEqual(new Date()),
        otp: body.otp,
      });

      if (!otp) {
        return {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: MERCHANT_AUTH_ERROR[3],
        };
      }
      const info = await this.merchantInfoService.findOne({
        merchantId: merchant.id,
      });

      this.mailService.sendMailFormSystem({
        subject: MERCHANT_CONSTANT.mail.sendKey,
        to: merchant.email,
        text: otp.otp,
        html: await getTemplateInfoMerchant({
          name: merchant.name,
          privateKey: info.privateKey,
          publicKey: info.publicKey,
        }),
      });

      return { statusCode: HttpStatus.OK };
    } catch (error) {
      console.log('🚀 ~ file: help.service.ts:27 ~ :', error);
      throw error;
    }
  }
}
