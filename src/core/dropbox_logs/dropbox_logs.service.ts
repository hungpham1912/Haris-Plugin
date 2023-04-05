import { Injectable } from '@nestjs/common';
import { CreateDropboxLogDto } from './dto/create-dropbox_log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DropboxLog } from './entities/dropbox_log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DropboxLogsService {
  constructor(
    @InjectRepository(DropboxLog)
    private readonly dropboxLogRepository: Repository<DropboxLog>,
  ) {}

  async create(create: CreateDropboxLogDto) {
    try {
      return await this.dropboxLogRepository.save(create);
    } catch (error) {
      throw error;
    }
  }
}
