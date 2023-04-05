import { Injectable, Scope, Logger } from '@nestjs/common';
import { Chat } from 'src/core/chats/entities/chat.entity';
import { Conversation } from 'src/core/conversations/entities/conversation.entity';
import { Gateway } from 'src/core/gateways/entities/gateway.entity';
import { Log } from 'src/core/logs/entities/log.entity';
import { Manager } from 'src/core/managers/entities/manager.entity';
import { Merchant } from 'src/core/merchants/entities/merchant.entity';
import { MerchantInfo } from 'src/core/merchant_info/entities/merchant_info.entity';
import { Otp } from 'src/core/otp/entities/otp.entity';
import { Talked } from 'src/core/talkeds/entities/talked.entity';
import { User } from 'src/core/users/entities/user.entity';
import { UserConversation } from 'src/core/user_conversation/entities/user_conversation.entity';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DropboxLog } from 'src/core/dropbox_logs/entities/dropbox_log.entity';
import { KeyInfo } from 'src/core/key_info/entities/key_info.entity';
import { File } from 'src/core/files/entities/file.entity';

export const ENTITIES = [
  Manager,
  User,
  Chat,
  UserConversation,
  Conversation,
  Talked,
  Merchant,
  MerchantInfo,
  Gateway,
  Log,
  Otp,
  DropboxLog,
  KeyInfo,
  File,
];

export const SOURCE_CONFIG: DataSourceOptions = {
  type: 'postgres',
  entities: ENTITIES,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: false,
  ...ENV_CONFIG.database.harisPrd,
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
