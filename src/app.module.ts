import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customProvider } from './app.provider';
import { Chat } from './core/chats/entities/chat.entity';
import { Conversation } from './core/conversations/entities/conversation.entity';
import { Manager } from './core/managers/entities/manager.entity';
import { Talked } from './core/talkeds/entities/talked.entity';
import { User } from './core/users/entities/user.entity';
import { UserConversation } from './core/user_conversation/entities/user_conversation.entity';
import { ClientModule } from './module/client/client.module';
import { OperatorModule } from './module/operator/operator.module';
import { ENV_CONFIG } from './shared/constants/env.constant';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [Manager, User, Chat, UserConversation, Conversation, Talked],
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      ...ENV_CONFIG.database.harisPrd,
      synchronize: true,
    }),

    OperatorModule,
    RouterModule.register([
      {
        path: 'api/operator',
        module: OperatorModule,
      },
    ]),
    ClientModule,
    RouterModule.register([
      {
        path: 'api/client',
        module: ClientModule,
      },
    ]),
  ],
  providers: [...customProvider],
})
export class AppModule {}
