import { BankingModule } from 'src/module/banking/banking.module';
import { ClientModule } from 'src/module/client/client.module';
import { OperatorModule } from 'src/module/operator/operator.module';
import { PluginModule } from 'src/module/plugin/plugin.module';
import { CreateSwaggerParam } from '../create.swagger';
import { SocialNetworkModule } from 'src/module/social-network/social-network.module';

export const CREATE_SWAGGER: CreateSwaggerParam[] = [
  {
    description: 'API documentation for version 1 project',
    title: 'Project API - Web App',
    version: '1.0',
    module: ClientModule,
    param: 'client/docs/api',
  },
  {
    description: 'API documentation for version 1 project',
    title: 'Project API - Web App',
    version: '1.0',
    module: OperatorModule,
    param: 'operator/docs/api',
  },
  {
    description: 'API documentation for version 1 project',
    title: 'Project API - Plugin',
    version: '1.0',
    module: PluginModule,
    param: 'plugin/docs/api',
  },
  {
    description: 'API documentation for version 1 project',
    title: 'Project API - Banking',
    version: '1.0',
    module: BankingModule,
    param: 'banking/docs/api',
  },
  {
    description: 'API documentation for version 1 project',
    title: 'Project API - Web App',
    version: '1.0',
    module: SocialNetworkModule,
    param: 'social/docs/api',
  },
];
