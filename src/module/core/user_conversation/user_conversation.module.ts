import { Module } from '@nestjs/common';
import { UserConversationService } from './user_conversation.service';
import { UserConversationController } from './user_conversation.controller';

@Module({
  controllers: [UserConversationController],
  providers: [UserConversationService]
})
export class UserConversationModule {}
