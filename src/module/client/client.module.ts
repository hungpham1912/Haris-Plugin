import { Module } from '@nestjs/common';
import { CliAuthController } from './auth/auth.controller';
import { CliAuthModule } from './auth/auth.module';
import { CliChatsController } from './chats/chat.controller';
import { CliChatsModule } from './chats/chat.module';
import { CliUserController } from './users/user.controller';
import { CliUserModule } from './users/user.module';

@Module({
  imports: [CliAuthModule, CliUserModule, CliChatsModule],
  controllers: [CliAuthController, CliUserController, CliChatsController],
  exports: [],
})
export class ClientModule {}
