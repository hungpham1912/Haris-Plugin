import { Injectable } from '@nestjs/common';
import { PaginateQuery } from 'nestjs-paginate';
import { ConversationsService } from 'src/module/core/conversations/conversations.service';
import {
  CreateConversationDto,
  CreateConversationParam,
} from 'src/module/core/conversations/dto/create-conversation.dto';
import { ConversationType } from 'src/module/core/conversations/entities/conversation.entity';
import { User } from 'src/module/core/users/entities/user.entity';
import { UsersService } from 'src/module/core/users/users.service';
import { CreateUserConversationParam } from 'src/module/core/user_conversation/dto/create-user_conversation.dto';
import { UserConversationRole } from 'src/module/core/user_conversation/entities/user_conversation.entity';
import { UserConversationService } from 'src/module/core/user_conversation/user_conversation.service';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { In } from 'typeorm';

@Injectable()
export class CliConversationService {
  constructor(
    private readonly conversationsService: ConversationsService,
    private readonly usersService: UsersService,
    private readonly userConversationService: UserConversationService,
  ) {}

  async create(user: User, body: CreateConversationDto) {
    try {
      const param: CreateConversationParam = {
        type: '',
        backgroundUrl: '',
      };

      const users = await this.usersService.findAll({ id: In(body.userIds) });

      const name = this.buildName(users, user);
      if (body.userIds.length > 1) {
        param.type = ConversationType.GROUP;
        param.backgroundUrl = ENV_CONFIG.source.conversation.defaultAvatar;

        const conversation = await this.conversationsService.create(param);

        const userConversationParam: CreateUserConversationParam[] = users.map(
          (value: User) => {
            return {
              userId: value.id,
              conversationId: conversation.id,
              nickName: user.fullName,
              showName: name,
            };
          },
        );

        userConversationParam.push({
          userId: user.id,
          conversationId: conversation.id,
          nickName: user.fullName,
          role: UserConversationRole.ADMIN,
          showName: name,
        });

        this.userConversationService.multipleCreates(userConversationParam);
        return conversation;
      } else {
        param.type = ConversationType.DUO;
        const conversation = await this.conversationsService.create(param);

        const userConversationParam: CreateUserConversationParam[] = users.map(
          (value: User) => {
            return {
              userId: value.id,
              conversationId: conversation.id,
              nickName: user.fullName,
              showName: user.fullName,
            };
          },
        );

        userConversationParam.push({
          userId: user.id,
          conversationId: conversation.id,
          nickName: user.fullName,
          showName: users[0].fullName,
        });
      }
    } catch (error) {
      console.log('🚀 ~ file: chat.service.ts:14 ~ :', error);
      throw error;
    }
  }

  buildName(users: User[], user: User) {
    let name = '';
    if (users.length > 1) {
      users.forEach((value, index: number) => {
        if (index > 0) name += `, ${value.fullName.split(' ')[0]}`;
        else name += value.fullName.split(' ')[0];
      });
    } else {
    }
    return name;
  }

  async getConversation(user: User, query: PaginateQuery) {
    // try {
    //   const { limit, page } = query;
    //   return await this.usersService.paginate(limit, page, query, filter);
    // } catch (error) {
    //   console.log('🚀 ~ file: users.service.ts:15 ~ ', error);
    //   throw error;
    // }
  }
}
