import { ENV_CONFIG } from 'src/shared/constants/env.constant';

export function buildFacebookUrl(id: string, option: string) {
  return `${ENV_CONFIG.facebook.baseUrl}${id}/${option}`;
}
