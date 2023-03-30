import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateOtpDto, CreateOtpParam } from './dto/create-otp.dto';
import { Otp } from './entities/otp.entity';
import { generateOTP } from './otp.helper';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
  ) {}
  async create(dto: CreateOtpDto) {
    try {
      const expiredAt = new Date();
      expiredAt.setMinutes(
        expiredAt.getMinutes() + ENV_CONFIG.system.expiryOtp,
      );

      const param: CreateOtpParam = {
        expiry: expiredAt,
        otp: generateOTP(ENV_CONFIG.system.numberCharactersOtp),
        ...dto,
      };

      return await this.otpRepository.save(param);
    } catch (error) {
      throw error;
    }
  }
  async findOne(query: FindOptionsWhere<Otp>) {
    try {
      return await this.otpRepository.findOne({ where: query });
    } catch (error) {}
  }
}
