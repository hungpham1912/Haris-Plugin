import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery } from 'nestjs-paginate';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { Operator, PaginateBuilder } from 'src/shared/lib/paginate/condition';
import { Repository } from 'typeorm';
import { MERCHANT_CONSTANT } from './constants/merchant.constant';
import { CreateMerchantParam } from './dto/create-merchant.dto';
import { Merchant } from './entities/merchant.entity';
import { MerchantFilter } from './models/merchant.model';

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

  async paginate(
    limit: number,
    page: number,
    query: PaginateQuery,
    filter: MerchantFilter,
  ) {
    try {
      const { alias, column } = MERCHANT_CONSTANT.paginate;
      return await new PaginateBuilder<Merchant>(
        this.merchantRepository.createQueryBuilder(alias),
        alias,
      )
        .andWhere(
          column.merchantCode,
          filter?.merchantCode,
          filter?.merchantCode != undefined,
          Operator.LIKE_RIGHT,
        )

        .getPaginate({ limit, page, query });
    } catch (error) {
      throw error;
    }
  }
}
