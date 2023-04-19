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
        // Host: '<calculated when request is sent>',
        // cookie: `sb=XrozZO6uF1ZCiTHq8fwuhpI1; datr=XrozZBF0Qi-jxah3jW76XsXn; dpr=1; c_user=100009853482209; xs=35%3AAgCCHrzwoN7OZw%3A2%3A1681238632%3A-1%3A6384; fr=0Nq6tv30lBYMjOm1X.AWU1qQ4CEhLVFvPM5rfrpknRABE.BkNaiA.V6.AAA.0.0.BkNapq.AWVEx4SxI8A; presence=C%7B%22t3%22%3A%5B%7B%22i%22%3A%22g.5776774895739542%22%7D%5D%2C%22utc3%22%3A1681239780952%2C%22v%22%3A1%7D; usida=eyJ2ZXIiOjEsImlkIjoiQXJzeXQxZWc1eGRoOSIsInRpbWUiOjE2ODEyNDAyNTJ9; wd=1251x944`,
      };

      const res = await this.httpService.axiosRef.get(url, { headers });
      console.log(
        '🚀 ~ file: facebook.service.ts:29 ~ SocialFacebookService ~ demo ~ res:',
        res,
      );
      return { facebookStatus: res.status, detail: res.data };
    } catch (error) {
      return {
        facebookStatus: error?.response?.status,
        detail: error?.response?.data,
      };
    }
  }
}
