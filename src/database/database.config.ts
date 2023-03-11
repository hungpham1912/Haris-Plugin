import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Chat } from 'src/module/core/chats/entities/chat.entity';
import { Conversation } from 'src/module/core/conversations/entities/conversation.entity';
import { Manager } from 'src/module/core/managers/entities/manager.entity';
import { User } from 'src/module/core/users/entities/user.entity';
import { UserConversation } from 'src/module/core/user_conversation/entities/user_conversation.entity';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';

export class DatabaseConfig {
  config: TypeOrmModuleOptions = {
    type: 'postgres',
    entities: [Manager, User, Chat, UserConversation, Conversation],
    synchronize: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    ...ENV_CONFIG.database,
  };

  getConfig() {
    return this.config;
  }
}
