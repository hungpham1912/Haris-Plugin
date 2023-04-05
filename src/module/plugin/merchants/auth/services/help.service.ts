import { HttpStatus, Injectable } from '@nestjs/common';
import { VerifyForgotKeyMerchant } from 'src/core/auth/dto/verify.dto';
import { MailService } from 'src/core/mails/mail.service';
import { MERCHANT_CONSTANT } from 'src/core/merchants/constants/merchant.constant';
import { Merchant } from 'src/core/merchants/entities/merchant.entity';
import { MERCHANT_AUTH_ERROR } from 'src/core/merchants/errors/auth.error';
import { MerchantInfoService } from 'src/core/merchant_info/merchant_info.service';
import { OtpType } from 'src/core/otp/entities/otp.entity';
import { OtpService } from 'src/core/otp/otp.service';
import { MoreThanOrEqual } from 'typeorm';
import { getTemplateInfoMerchant } from 'views/mail-infor';
import { getTemplateOtp } from 'views/mail-otp';
import { PluginFilesService } from 'src/module/plugin/files/file.service';
import { MerchantInfo } from 'src/core/merchant_info/entities/merchant_info.entity';
import { KeyInfoService } from 'src/core/key_info/key_info.service';

@Injectable()
export class PluginMerchantHelpService {
  constructor(
    private readonly otpService: OtpService,
    private readonly mailService: MailService,
    private readonly merchantInfoService: MerchantInfoService,
    private readonly pluginFilesService: PluginFilesService,
    private readonly keyInfoService: KeyInfoService,
  ) {}
  async forgotKey(merchant: Merchant) {
    try {
      if (merchant.keysInfo.length < 2) {
        await this.keyInfoService.delete({ merchantId: merchant.id });
        const info = await this.merchantInfoService.findOne({
          merchantId: merchant.id,
        });
        await this.pluginFilesService.createKeyFile(info);
      }
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

  async verifyForgotKey(body: VerifyForgotKeyMerchant, merchant: Merchant) {
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

      this.getLinkAndSendMail(info, merchant);

      return { statusCode: HttpStatus.OK };
    } catch (error) {
      console.log('🚀 ~ file: help.service.ts:27 ~ :', error);
      throw error;
    }
  }

  async getLinkAndSendMail(info: MerchantInfo, merchant: Merchant) {
    try {
      const links = await this.pluginFilesService.getLinkKeyFile(info);
      this.mailService.sendMailFormSystem({
        subject: MERCHANT_CONSTANT.mail.sendKey,
        to: merchant.email,
        html: await getTemplateInfoMerchant({
          name: merchant.name,
          privateKey: links.linkPrivate,
          publicKey: links.linkPublic,
        }),
      });
    } catch (error) {
      console.log('🚀 ~ file: help.service.ts:84 ~ :', error);
      return;
    }
  }
}
