import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTalkedDto } from './dto/create-talked.dto';
import { Talked } from './entities/talked.entity';

@Injectable()
export class TalkedService {
  constructor(
    @InjectRepository(Talked)
    private readonly talkedRepository: Repository<Talked>,
  ) {}
  async multipleCreates(create: CreateTalkedDto[]) {
    try {
      const param = this.talkedRepository.create(create);
      return await this.talkedRepository.save(param);
    } catch (error) {
      throw error;
    }
  }
}
