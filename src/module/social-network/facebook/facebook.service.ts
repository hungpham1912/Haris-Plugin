import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { buildFacebookUrl } from './helper/facebook.helper';
import { FACEBOOK_CONSTANT } from './constants/facebook.constant';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';

@Injectable()
export class SocialFacebookService {
  constructor(private readonly httpService: HttpService) {}

  async demo() {
    try {
      const url = buildFacebookUrl(
        '1694010094215794',
        FACEBOOK_CONSTANT.option.getFeed,
        ENV_CONFIG.facebook.accessToken,
      );
      console.log(
        '🚀 ~ file: facebook.service.ts:18 ~ SocialFacebookService ~ demo ~ url:',
        url,
      );

      const headers = {
        authority: 'graph.facebook.com',
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
        'content-type': 'application/x-www-form-urlencoded',
      };

      const res = await this.httpService.axiosRef.get(url, { headers });
      return { facebookStatus: res.status, detail: res.data };
    } catch (error) {
      return {
        facebookStatus: error?.response?.status,
        detail: error?.response?.data,
      };
    }
  }
}
