import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
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

  makeId(length: number) {
    let result = '';
    const characters = ENV_CONFIG.system.characters;
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  async countByQuery(query: any) {
    try {
      return await this.merchantRepository.count({ where: query });
    } catch (error) {
      throw error;
    }
  }
}
