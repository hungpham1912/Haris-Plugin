import { Module } from '@nestjs/common';
import { ConversationsModule } from 'src/module/core/conversations/conversations.module';

@Module({
  imports: [ConversationsModule],
  providers: [ConversationsModule],
  exports: [ConversationsModule],
})
export class CliConversationModule {}
