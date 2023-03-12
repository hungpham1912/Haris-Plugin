import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConversation } from './entities/user_conversation.entity';
import { UserConversationService } from './user_conversation.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserConversation])],
  providers: [UserConversationService],
})
export class UserConversationModule {}
