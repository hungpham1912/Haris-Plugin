import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConversationParam } from './dto/create-conversation.dto';
import { Conversation } from './entities/conversation.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly chatRepository: Repository<Conversation>,
  ) {}

  async create(create: CreateConversationParam) {
    try {
      const param = this.chatRepository.create(create);
      return await this.chatRepository.save(param);
    } catch (error) {
      throw error;
    }
  }
}
