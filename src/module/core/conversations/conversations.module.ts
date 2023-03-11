import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CliConversationService } from 'src/module/client/conversations/conversation.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserConversation } from '../user_conversation/entities/user_conversation.entity';
import { UserConversationService } from '../user_conversation/user_conversation.service';
import { ConversationsService } from './conversations.service';
import { Conversation } from './entities/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, User, UserConversation])],
  providers: [
    ConversationsService,
    CliConversationService,
    UsersService,
    UserConversationService,
  ],
  exports: [
    ConversationsService,
    CliConversationService,
    UsersService,
    UserConversationService,
  ],
})
export class ConversationsModule {}
