import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customProvider } from './app.provider';
import { BankingModule } from './module/banking/banking.module';
import { ClientModule } from './module/messenger/client/client.module';
import { OperatorModule } from './module/messenger/operator/operator.module';
import { PluginModule } from './module/plugin/plugin.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { SocialNetworkModule } from './module/social-network/social-network.module';
import { SOURCE_CONFIG } from './database/database.config';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 1,
      limit: 100,
    }),
    TypeOrmModule.forRoot(SOURCE_CONFIG[0]),

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
    PluginModule,
    RouterModule.register([
      {
        path: 'api/plugin',
        module: PluginModule,
      },
    ]),
    BankingModule,
    RouterModule.register([
      {
        path: 'api/banking',
        module: BankingModule,
      },
    ]),
    SocialNetworkModule,
    RouterModule.register([
      {
        path: 'api/social',
        module: SocialNetworkModule,
      },
    ]),
  ],
  providers: [...customProvider],
})
export class AppModule {}
