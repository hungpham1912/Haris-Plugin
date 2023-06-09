import { Injectable } from '@nestjs/common';
import { PaginateQuery } from 'nestjs-paginate';
import { ConversationsService } from 'src/core/conversations/conversations.service';
import {
  CreateConversationDto,
  CreateConversationParam,
} from 'src/core/conversations/dto/create-conversation.dto';
import {
  Conversation,
  ConversationType,
} from 'src/core/conversations/entities/conversation.entity';
import { ConversationFilter } from 'src/core/conversations/models/conversation.model';
import { TalkedService } from 'src/core/talkeds/talkeds.service';
import { User } from 'src/core/users/entities/user.entity';
import { UsersService } from 'src/core/users/users.service';
import { CreateUserConversationParam } from 'src/core/user_conversation/dto/create-user_conversation.dto';
import { UserConversationRole } from 'src/core/user_conversation/entities/user_conversation.entity';
import { UserConversationService } from 'src/core/user_conversation/user_conversation.service';
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
      };

      const users = await this.usersService.findAll({ id: In(body.userIds) });
      let conversation: Conversation;

      if (body.userIds.length > 1) {
        param.type = ConversationType.GROUP;
        const name = this.buildNameGroupChat(users, user);

        conversation = await this.conversationsService.create(param);

        const userConversationParam: CreateUserConversationParam[] = users.map(
          (value: User) => {
            return {
              userId: value.id,
              conversationId: conversation.id,
              nickName: user.fullName,
              showName: name,
              backgroundUrl: ENV_CONFIG.source.conversation.defaultAvatar,
            };
          },
        );

        userConversationParam.push({
          userId: user.id,
          conversationId: conversation.id,
          nickName: user.fullName,
          role: UserConversationRole.ADMIN,
          showName: name,
          backgroundUrl: ENV_CONFIG.source.conversation.defaultAvatar,
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
              backgroundUrl: user.avatarUrl,
            };
          },
        );

        userConversationParam.push({
          userId: user.id,
          conversationId: conversation.id,
          nickName: user.fullName,
          showName: users[0].fullName,
          backgroundUrl: users[0].avatarUrl,
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
        user,
      );
    } catch (error) {
      console.log('🚀 ~ file: users.service.ts:15 ~ ', error);
      throw error;
    }
  }
}
