import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CliChatsService } from 'src/module/client/chats/chat.service';
import { UserConversation } from '../user_conversation/entities/user_conversation.entity';
import { UserConversationService } from '../user_conversation/user_conversation.service';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, UserConversation])],
  providers: [ChatsService, CliChatsService, UserConversationService],
  exports: [ChatsService, CliChatsService, UserConversationService],
})
export class ChatsModule {}
