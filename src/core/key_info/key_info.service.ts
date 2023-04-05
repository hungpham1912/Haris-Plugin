import { Injectable } from '@nestjs/common';
import { CreateKeyInfoDto } from './dto/create-key_info.dto';
import { KeyInfo } from './entities/key_info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class KeyInfoService {
  constructor(
    @InjectRepository(KeyInfo)
    private readonly keyInfoRepository: Repository<KeyInfo>,
  ) {}
  async create(create: CreateKeyInfoDto[]) {
    try {
      return await this.keyInfoRepository.save(create);
    } catch (error) {
      throw error;
    }
  }

  async find(query: FindOptionsWhere<KeyInfo>) {
    try {
      return await this.keyInfoRepository
        .createQueryBuilder('key_info')
        .leftJoinAndSelect('key_info.file', 'file')
        .where(query)
        .getMany();
    } catch (error) {
      throw error;
    }
  }
}
