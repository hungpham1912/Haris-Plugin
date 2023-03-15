import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BankService {
  constructor(private readonly httpService: HttpService) {}

  async getBanks() {
    try {
      const res = await this.httpService.axiosRef.get(
        'https://api.vietqr.io/v2/banks',
      );
      return res.data;
    } catch (error) {
      console.log('🚀 ~ file: bank.service.ts:15 ~', error?.response?.data);
      throw error;
    }
  }
}
