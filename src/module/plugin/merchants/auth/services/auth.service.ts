import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'src/core/auth/auth.service';
import {
  LoginMerchantDto,
  RegisterMerchantDto,
  RegisterMerchantUserDto,
} from 'src/core/auth/dto/auth.dto';
import { VerifyOtpMerchant } from 'src/core/auth/dto/verify.dto';
import { MailService } from 'src/core/mails/mail.service';
import { MERCHANT_CONSTANT } from 'src/core/merchants/constants/merchant.constant';
import { SignDto } from 'src/core/merchants/dto/auth-merchant.dto';
import { MERCHANT_AUTH_ERROR } from 'src/core/merchants/errors/auth.error';
import { MerchantsService } from 'src/core/merchants/merchants.service';
import { MerchantInfoService } from 'src/core/merchant_info/merchant_info.service';
import { OtpType } from 'src/core/otp/entities/otp.entity';
import { OtpService } from 'src/core/otp/otp.service';
import { generateKey, genSignature } from 'src/shared/helper/system.helper';
import { MoreThanOrEqual } from 'typeorm';
import { getTemplateInfoMerchant } from 'views/mail-infor';
import { getTemplateOtp } from 'views/mail-otp';
import { MerchantInfo } from 'src/core/merchant_info/entities/merchant_info.entity';
import { Merchant } from 'src/core/merchants/entities/merchant.entity';
import { PluginFilesService } from 'src/module/plugin/files/file.service';

@Injectable()
export class PluginMerchantAuthService {
  constructor(
    private readonly merchantsService: MerchantsService,
    private readonly merchantInfoService: MerchantInfoService,
    private readonly otpService: OtpService,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
    private readonly pluginFilesService: PluginFilesService,
  ) {}
  async registerMerchantUser(body: RegisterMerchantUserDto) {
    return body;
  }

  async merchantRegister(body: RegisterMerchantDto) {
    try {
      const merchantCode = await this.merchantsService.createMerchantCode(0);
      const key = generateKey();

      const password = await this.authService.hashPassword(body.password);

      const merchant = await this.merchantsService.create({
        merchantCode,
        email: body.email,
        password,
        name: body.name,
      });
      this.merchantInfoService.create({
        merchantId: merchant.id,
        ...key,
      });

      const otp = await this.otpService.create({
        type: OtpType.EMAIL,
        email: body.email,
      });
      this.mailService.sendMailFormSystem({
        subject: MERCHANT_CONSTANT.mail.register,
        to: otp.email,
        html: await getTemplateOtp(merchant.name, otp.otp),
      });

      return merchant;
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:17 ~ :', error);
      throw error;
    }
  }

  async sign(data: SignDto) {
    try {
      const { merchantCode } = data;
      const merchant = await this.merchantsService.findOne({ merchantCode });
      const info = await this.merchantInfoService.findOne({
        merchantId: merchant.id,
      });
      return genSignature(data, info.privateKey);
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:50 ~ :', error);
      throw error;
    }
  }

  async verifyRegisterMerchant(body: VerifyOtpMerchant) {
    try {
      const merchant = await this.merchantsService.findOne({
        id: body.merchantId,
      });

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

      await this.merchantsService.update(merchant.id, { isAccepted: true });

      const info = await this.merchantInfoService.findOne({
        merchantId: merchant.id,
      });
      this.uploadAndSendFile(info, merchant);

      return {
        statusCode: HttpStatus.OK,
        accessToken: await this.authService.generateJwtToken({
          id: merchant.id,
        }),
      };
    } catch (error) {
      console.log('🚀 ~ file: auth.service.ts:88 ~  ~ error:', error);
      throw error;
    }
  }

  async uploadAndSendFile(info: MerchantInfo, merchant: Merchant) {
    const links = await this.pluginFilesService.uploadAndGetLink(info);

    this.mailService.sendMailFormSystem({
      subject: MERCHANT_CONSTANT.mail.sendKey,
      to: merchant.email,
      html: await getTemplateInfoMerchant({
        name: merchant.name,
        privateKey: links.linkPrivate,
        publicKey: links.linkPublic,
      }),
    });
  }

  async login(body: LoginMerchantDto) {
    const merchant = await this.merchantsService.findOne({
      email: body.email,
    });
    const { password } = merchant;
    if (!(await this.authService.checkPassword(body.password, password)))
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: MERCHANT_AUTH_ERROR[5],
      };
    return {
      id: merchant.id,
      accessCode: await this.authService.generateJwtToken({ id: merchant.id }),
    };
  }
}
