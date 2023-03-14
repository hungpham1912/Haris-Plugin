import { getConfig } from '../lib/config/config.lib';

export const ENV_CONFIG = {
  database: {
    harisPrd: {
      host: getConfig('database.harisPrd.host'),
      username: getConfig('database.harisPrd.username'),
      password: getConfig('database.harisPrd.password'),
      database: getConfig('database.harisPrd.database'),
    },
  },
  jwt: {
    secret: getConfig('jwt.secret'),
  },
  system: {
    port: getConfig('system.port') || 3000,
    apiVersion: getConfig('system.api_version'),
    characters: getConfig('system.characters'),
  },
  source: {
    user: {
      defaultAvatar: getConfig('source.user.defaultAvatar'),
    },
    conversation: {
      defaultAvatar: getConfig('source.conversation.defaultAvatar'),
    },
    merchant: {
      lenghtMerchantCode: getConfig('source.lengthMerchantCode'),
    },
  },
};
