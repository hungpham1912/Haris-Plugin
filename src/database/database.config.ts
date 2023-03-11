import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Manager } from 'src/module/core/managers/entities/manager.entity';
import { User } from 'src/module/core/users/entities/user.entity';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';

export class DatabaseConfig {
  config: TypeOrmModuleOptions = {
    type: 'postgres',
    entities: [Manager, User],
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
