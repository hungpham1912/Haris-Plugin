import { ENV_CONFIG } from 'src/shared/constants/env.constant';

export const BANK_CONSTANT = {
  api: {
    banks: `${ENV_CONFIG.vietQR.baseUrl}/v2/banks`,
    generate: `${ENV_CONFIG.vietQR.baseUrl}/v2/generate`,
  },
};
