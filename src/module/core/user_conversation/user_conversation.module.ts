import { Module } from '@nestjs/common';
import { UserConversationService } from './user_conversation.service';

@Module({
  providers: [UserConversationService],
})
export class UserConversationModule {}
