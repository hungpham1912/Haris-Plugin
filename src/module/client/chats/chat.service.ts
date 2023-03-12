import { HttpStatus, Injectable } from '@nestjs/common';
import { PaginateQuery } from 'nestjs-paginate';
import { ChatsService } from 'src/core/chats/chats.service';
import {
  CreateChatDto,
  CreateChatParam,
} from 'src/core/chats/dto/create-chat.dto';
import { CHAT_BAD_RQ_ERROR } from 'src/core/chats/errors/chat.error';
import { ChatFilter } from 'src/core/chats/models/chat.model';
import { User } from 'src/core/users/entities/user.entity';
import { UserConversationService } from 'src/core/user_conversation/user_conversation.service';

@Injectable()
export class CliChatsService {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly userConversationService: UserConversationService,
  ) {}

  async createChats(user: User, body: CreateChatDto) {
    try {
      const check = await this.userConversationService.findOne({
        userId: user.id,
        conversationId: body.conversationId,
      });
      if (!check)
        return {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          error: CHAT_BAD_RQ_ERROR[2],
        };
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

  async getMessages(
    conversationId: string,
    query: PaginateQuery,
    filter: ChatFilter,
  ) {
    try {
      const { limit, page } = query;
      return await this.chatsService.paginate(
        limit,
        page,
        query,
        filter,
        conversationId,
      );
    } catch (error) {
      throw error;
    }
  }
}
