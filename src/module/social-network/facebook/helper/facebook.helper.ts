import { ENV_CONFIG } from 'src/shared/constants/env.constant';

export function buildFacebookUrl(id: string, option: string, token: string) {
  return `${ENV_CONFIG.facebook.baseUrl}${id}/${option}?access_token=${token}&debug=all&format=json&method=get&pretty=0&suppress_http_code=1&transport=cors`;
}
