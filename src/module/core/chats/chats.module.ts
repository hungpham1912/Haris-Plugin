import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CliChatsService } from 'src/module/client/chats/chat.service';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ChatsService, CliChatsService],
  exports: [ChatsService, CliChatsService],
})
export class ChatsModule {}
