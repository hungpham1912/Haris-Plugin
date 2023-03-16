import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateQRDto } from 'src/core/banks/dto/banks.dto';
import { BANK_ERROR } from 'src/core/banks/errors/bank.error';
import { ENV_CONFIG } from 'src/shared/constants/env.constant';
import { BANK_CONSTANT } from './constants/bank.constant';

@Injectable()
export class BankingBankService {
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
      const { data } = res;

      if (data?.code != BANK_CONSTANT.vietQR.codeSuccess) {
        return {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          error: BANK_ERROR[1],
          detail: data,
        };
      }
      return data;
    } catch (error) {
      console.log('🚀 ~ file: bank.service.ts:15 ~', error?.response?.data);
      throw error;
    }
  }
}
