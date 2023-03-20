import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMerchantInfoDto } from './dto/create-merchant_info.dto';
import { MerchantInfo } from './entities/merchant_info.entity';

@Injectable()
export class MerchantInfoService {
  constructor(
    @InjectRepository(MerchantInfo)
    private readonly merchantInfoRepository: Repository<MerchantInfo>,
  ) {}
  async create(createMerchantInfoDto: CreateMerchantInfoDto) {
    try {
      return await this.merchantInfoRepository.save(createMerchantInfoDto);
    } catch (error) {
      throw error;
    }
  }
}