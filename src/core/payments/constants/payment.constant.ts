import { ENV_CONFIG } from 'src/shared/constants/env.constant';

export const PAYMENT_CONSTANT = {
  momo: {
    createPaymentOneTime: `${ENV_CONFIG.momo.baseUrl}/v2/gateway/api/create`,
  },
};
