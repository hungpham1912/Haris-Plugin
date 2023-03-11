import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatParam } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async create(create: CreateChatParam) {
    try {
      const param = this.chatRepository.create(create);
      return await this.chatRepository.save(param);
    } catch (error) {
      throw error;
    }
  }
}
