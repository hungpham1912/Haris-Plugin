import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customProvider } from './app.provider';
import { BankingModule } from './module/banking/banking.module';
import { ClientModule } from './module/client/client.module';
import { OperatorModule } from './module/operator/operator.module';
import { PluginModule } from './module/plugin/plugin.module';
import { ENV_CONFIG } from './shared/constants/env.constant';
import { MerchantInfoModule } from './core/merchant_info/merchant_info.module';
import { ENTITIES } from './database/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: ENTITIES,
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
    MerchantInfoModule,
  ],
  providers: [...customProvider],
})
export class AppModule {}
