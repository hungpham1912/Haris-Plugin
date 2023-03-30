import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { Repository } from 'typeorm';
import { CreateOtpDto } from './dto/create-otp.dto';
import { Otp } from './entities/otp.entity';
import { generateOTP } from './otp.helper';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
  ) {}
  async create(type: string, phone?: string, email?: string) {
    try {
      const expiredAt = new Date();
      expiredAt.setMinutes(
        expiredAt.getMinutes() + ENV_CONFIG.system.expiryOtp,
      );

      const dto: CreateOtpDto = {
        type,
        expiry: expiredAt,
        email,
        phone,
        otp: generateOTP(ENV_CONFIG.system.numberCharactersOtp),
      };

      return await this.otpRepository.save(dto);
    } catch (error) {
      throw error;
    }
  }
}
