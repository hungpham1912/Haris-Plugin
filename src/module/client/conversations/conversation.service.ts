import { Injectable } from '@nestjs/common';
import { PaginateQuery } from 'nestjs-paginate';
import { ConversationsService } from 'src/module/core/conversations/conversations.service';
import {
  CreateConversationDto,
  CreateConversationParam,
} from 'src/module/core/conversations/dto/create-conversation.dto';
import {
  Conversation,
  ConversationType,
} from 'src/module/core/conversations/entities/conversation.entity';
import { ConversationFilter } from 'src/module/core/conversations/models/conversation.model';
import { TalkedService } from 'src/module/core/talkeds/talkeds.service';
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
    private readonly talkedService: TalkedService,
  ) {}

  async create(user: User, body: CreateConversationDto) {
    try {
      const param: CreateConversationParam = {
        type: '',
        backgroundUrl: '',
      };

      const users = await this.usersService.findAll({ id: In(body.userIds) });
      let conversation: Conversation;

      if (body.userIds.length > 1) {
        param.type = ConversationType.GROUP;
        param.backgroundUrl = ENV_CONFIG.source.conversation.defaultAvatar;
        const name = this.buildNameGroupChat(users, user);

        conversation = await this.conversationsService.create(param);

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
      } else {
        param.type = ConversationType.DUO;
        conversation = await this.conversationsService.create(param);

        const userConversationParam: CreateUserConversationParam[] = users.map(
          (value: User) => {
            return {
              userId: value.id,
              conversationId: conversation.id,
              nickName: value.fullName,
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

        this.userConversationService.multipleCreates(userConversationParam);

        const talked = await this.talkedService.findOne({
          userId: user.id,
          talkerId: users[0].id,
        });

        if (talked) return talked.conversation;
      }

      users.push(user);
      this.talkedService.multipleCreates(users, conversation);
      return conversation;
    } catch (error) {
      console.log('🚀 ~ file: chat.service.ts:14 ~ :', error);
      throw error;
    }
  }

  buildNameGroupChat(users: User[], user: User) {
    let name = user.fullName;
    users.forEach((value) => {
      name += `, ${value.fullName.split(' ')[0]}`;
    });

    return name;
  }

  async getConversation(
    user: User,
    query: PaginateQuery,
    filter: ConversationFilter,
  ) {
    try {
      const { limit, page } = query;
      return await this.userConversationService.paginate(
        limit,
        page,
        query,
        filter,
      );
    } catch (error) {
      console.log('🚀 ~ file: users.service.ts:15 ~ ', error);
      throw error;
    }
  }
}
