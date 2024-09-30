import { Module } from '@nestjs/common';
import { ChatsModule } from 'src/core/chats/chats.module';

@Module({
  imports: [ChatsModule],
  providers: [ChatsModule],
  exports: [ChatsModule],
})
export class CliChatsModule {}
