import { Injectable, Scope, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Chat } from 'src/module/core/chats/entities/chat.entity';
import { Conversation } from 'src/module/core/conversations/entities/conversation.entity';
import { Manager } from 'src/module/core/managers/entities/manager.entity';
import { Talked } from 'src/module/core/talkeds/entities/talked.entity';
import { User } from 'src/module/core/users/entities/user.entity';
import { UserConversation } from 'src/module/core/user_conversation/entities/user_conversation.entity';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { DataSource, DataSourceOptions } from 'typeorm';

export class DatabaseConfig {
  config: TypeOrmModuleOptions = {
    type: 'postgres',
    entities: [Manager, User, Chat, UserConversation, Conversation, Talked],
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

export const SOURCE_CONFIG: DataSourceOptions = {
  type: 'postgres',
  entities: [Manager, User, Chat, UserConversation, Conversation, Talked],
  synchronize: false,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  ...ENV_CONFIG.database,
};

@Injectable({
  scope: Scope.DEFAULT,
})
export class Source {
  public static source: DataSource;

  public static connect() {
    return this.source;
  }

  public static async setConnect() {
    const source = new DataSource(SOURCE_CONFIG);
    await source
      .initialize()
      .then(() => {
        Logger.log('Data Source has been initialized!');
      })
      .catch((err) => {
        Logger.error('Error during Data Source initialization', err);
      });
    this.source = source;
  }
}
