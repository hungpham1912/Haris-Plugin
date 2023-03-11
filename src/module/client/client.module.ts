import { Module } from '@nestjs/common';
import { CliAuthController } from './auth/auth.controller';
import { CliAuthModule } from './auth/auth.module';
import { CliChatsController } from './chats/chat.controller';
import { CliChatsModule } from './chats/chat.module';
import { CliConversationController } from './conversations/conversation.controller';
import { CliConversationModule } from './conversations/conversation.module';
import { CliUserController } from './users/user.controller';
import { CliUserModule } from './users/user.module';

@Module({
  imports: [
    CliAuthModule,
    CliUserModule,
    CliChatsModule,
    CliConversationModule,
  ],
  controllers: [
    CliAuthController,
    CliUserController,
    CliChatsController,
    CliConversationController,
  ],
  exports: [],
})
export class ClientModule {}
