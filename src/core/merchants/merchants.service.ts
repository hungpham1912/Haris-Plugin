import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery } from 'nestjs-paginate';
import { makeId } from 'src/shared/helper/system.helper';
import { Operator, PaginateBuilder } from 'src/shared/lib/paginate/condition';
import { Repository } from 'typeorm';
import { MERCHANT_CONSTANT } from './constants/merchant.constant';
import { CreateMerchantParam } from './dto/create-merchant.dto';
import { Merchant } from './entities/merchant.entity';
import { MERCHANT_ERROR } from './errors/merchant.error';
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

  async countByQuery(query: any) {
    try {
      return await this.merchantRepository.count({ where: query });
    } catch (error) {
      throw error;
    }
  }

  async findOne(query: any) {
    try {
      return await this.merchantRepository.findOne({ where: query });
    } catch (error) {
      throw error;
    }
  }

  async createMerchantCode(retry: number) {
    try {
      const merchantCode = makeId(32);

      if (retry > 3) {
        throw {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: MERCHANT_ERROR[1],
        };
      }
      const check = await this.countByQuery({
        merchantCode,
      });
      if (!check) {
        return merchantCode;
      }
      this.createMerchantCode(retry + 1);
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
