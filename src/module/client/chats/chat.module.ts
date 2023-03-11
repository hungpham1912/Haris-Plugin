import { Module } from '@nestjs/common';
import { ChatsModule } from 'src/module/core/chats/chats.module';

@Module({
  imports: [ChatsModule],
  providers: [ChatsModule],
  exports: [ChatsModule],
})
export class CliChatsModule {}
