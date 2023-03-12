import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customProvider } from './app.provider';
import { DatabaseConfig } from './database/database.config';
import { ClientModule } from './module/client/client.module';
import { OperatorModule } from './module/operator/operator.module';
import { TalkedsModule } from './module/core/talkeds/talkeds.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(new DatabaseConfig().getConfig()),
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
    TalkedsModule,
  ],
  providers: [...customProvider],
})
export class AppModule {}
