import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserConversationParam } from './dto/create-user_conversation.dto';
import { UserConversation } from './entities/user_conversation.entity';

@Injectable()
export class UserConversationService {
  constructor(
    @InjectRepository(UserConversation)
    private readonly chatRepository: Repository<UserConversation>,
  ) {}

  async multipleCreates(create: CreateUserConversationParam[]) {
    try {
      const param = this.chatRepository.create(create);
      return await this.chatRepository.save(param);
    } catch (error) {
      throw error;
    }
  }
}
