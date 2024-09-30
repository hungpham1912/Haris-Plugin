import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CliConversationService } from 'src/module/messenger/client/conversations/conversation.service';
import { Talked } from '../talkeds/entities/talked.entity';
import { TalkedService } from '../talkeds/talkeds.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserConversation } from '../user_conversation/entities/user_conversation.entity';
import { UserConversationService } from '../user_conversation/user_conversation.service';
import { ConversationsService } from './conversations.service';
import { Conversation } from './entities/conversation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, User, UserConversation, Talked]),
  ],
  providers: [
    ConversationsService,
    CliConversationService,
    UsersService,
    UserConversationService,
    TalkedService,
  ],
  exports: [
    ConversationsService,
    CliConversationService,
    UsersService,
    UserConversationService,
    TalkedService,
  ],
})
export class ConversationsModule {}
