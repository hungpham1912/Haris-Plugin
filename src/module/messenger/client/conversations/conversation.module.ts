import { Module } from '@nestjs/common';
import { ConversationsModule } from 'src/core/conversations/conversations.module';

@Module({
  imports: [ConversationsModule],
  providers: [ConversationsModule],
  exports: [ConversationsModule],
})
export class CliConversationModule {}
