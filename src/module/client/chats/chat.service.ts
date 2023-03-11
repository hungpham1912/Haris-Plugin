import { Injectable } from '@nestjs/common';
import { ChatsService } from 'src/module/core/chats/chats.service';
import {
  CreateChatDto,
  CreateChatParam,
} from 'src/module/core/chats/dto/create-chat.dto';
import { User } from 'src/module/core/users/entities/user.entity';

@Injectable()
export class CliChatsService {
  constructor(private readonly chatsService: ChatsService) {}

  async createChats(user: User, body: CreateChatDto) {
    try {
      const param: CreateChatParam = {
        ...body,
        userId: user.id,
      };
      return await this.chatsService.create(param);
    } catch (error) {
      console.log('🚀 ~ file: chat.service.ts:14 ~ :', error);
      throw error;
    }
  }
}
