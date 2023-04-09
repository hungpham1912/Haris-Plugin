import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { buildFacebookUrl } from './helper/facebook.helper';
import { FACEBOOK_CONSTANT } from './constants/facebook.constant';

@Injectable()
export class SocialFacebookService {
  constructor(private readonly httpService: HttpService) {}

  async demo() {
    const url = buildFacebookUrl(
      '1694010094215794',
      FACEBOOK_CONSTANT.option.getFeed,
    );
    console.log(
      '🚀 ~ file: facebook.service.ts:15 ~ SocialFacebookService ~ demo ~ url:',
      url,
    );
    const params = {};
    const res = await this.httpService.axiosRef.get(url, { params });
  }
}
