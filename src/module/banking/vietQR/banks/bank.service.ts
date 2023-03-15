import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateQRDto } from 'src/core/banks/dto/banks.dto';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { BANK_CONSTANT } from './constants/bank.constant';

@Injectable()
export class BankService {
  constructor(private readonly httpService: HttpService) {}

  async getBanks() {
    try {
      const res = await this.httpService.axiosRef.get(BANK_CONSTANT.api.banks);
      return res.data;
    } catch (error) {
      console.log('🚀 ~ file: bank.service.ts:15 ~', error?.response?.data);
      throw error;
    }
  }

  async createQR(param: CreateQRDto) {
    const headers = {
      'x-client-id': ENV_CONFIG.vietQR.clientID,
      'x-api-key': ENV_CONFIG.vietQR.apiKey,
      'Content-Type': 'application/json',
    };

    const body = {
      accountNo: param.accountNo,
      accountName: param.accountName,
      acqId: param.acqId,
      addInfo: param.addInfo,
      amount: String(param.amount),
      template: param.template,
    };
    try {
      const res = await this.httpService.axiosRef.post(
        BANK_CONSTANT.api.generate,
        body,
        { headers },
      );
      return res.data;
    } catch (error) {
      console.log('🚀 ~ file: bank.service.ts:15 ~', error?.response?.data);
      throw error;
    }
  }
}
