import { Injectable } from '@nestjs/common';
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
        name: '',
        type: '',
      };

      const users = await this.usersService.findAll({ id: In(body.userIds) });

      param.name = this.buildName(users);
      if (body.userIds.length > 1) {
        param.type = ConversationType.GROUP;
      } else {
        param.type = ConversationType.DUO;
      }

      const conversation = await this.conversationsService.create(param);

      const userConversationParam: CreateUserConversationParam[] = users.map(
        (value: User) => {
          return {
            userId: value.id,
            conversationId: conversation.id,
            nickName: user.fullName,
          };
        },
      );

      if (body.userIds.length > 1) {
        userConversationParam.push({
          userId: user.id,
          conversationId: conversation.id,
          nickName: user.fullName,
          role: UserConversationRole.ADMIN,
        });
      } else {
        userConversationParam.push({
          userId: user.id,
          conversationId: conversation.id,
          nickName: user.fullName,
          role: UserConversationRole.MEMBER,
        });
      }
      this.userConversationService.multipleCreates(userConversationParam);
      return conversation;
    } catch (error) {
      console.log('🚀 ~ file: chat.service.ts:14 ~ :', error);
      throw error;
    }
  }

  buildName(users: User[]) {
    let name = '';
    users.forEach((value, index: number) => {
      if (index > 0) name += `, ${value.fullName.split(' ')[0]}`;
      else name += value.fullName.split(' ')[0];
    });
    return name;
  }
}
