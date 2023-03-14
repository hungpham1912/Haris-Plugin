import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMerchantParam } from './dto/create-merchant.dto';
import { Merchant } from './entities/merchant.entity';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant)
    private readonly merchantRepository: Repository<Merchant>,
  ) {}
  async create(body: CreateMerchantParam) {
    try {
      const params = this.merchantRepository.create(body);
      return await this.merchantRepository.save(params);
    } catch (error) {
      throw error;
    }
  }
}
