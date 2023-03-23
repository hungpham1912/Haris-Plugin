import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { MerchantInfo } from 'src/core/merchant_info/entities/merchant_info.entity';
import { Source } from 'src/database/database.config';
import { MESSAGES_BASE_ERROR } from 'src/shared/error/base.error';
import { genSignature } from 'src/shared/helper/system.helper';
import { SignDto } from '../dto/auth-merchant.dto';
import { Merchant } from '../entities/merchant.entity';
import {
  MERCHANT_AUTH_ERROR,
  MERCHANT_GUARD_ERROR,
} from '../errors/auth.error';

@Injectable()
export class MerchantGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const message: string[] = [];
      const conditions: { condition: boolean; position: number }[] = [];

      const signature = request?.headers?.authorization;
      const { query, body } = request;

      conditions.push({ condition: !signature, position: 1 });
      conditions.push({ condition: !query?.merchantCode, position: 2 });

      if (query?.timestamp) {
        conditions.push({
          condition: Date.now() - query?.timestamp > 300000,
          position: 3,
        });
        conditions.push({
          condition: query.timestamp > Date.now(),
          position: 4,
        });
        conditions.push({ condition: isNaN(query?.timestamp), position: 5 });
      }
      conditions.push({ condition: !query?.timestamp, position: 6 });

      if (query?.merchantCode) {
        const check = await Source.connect()
          .getRepository(Merchant)
          .findOne({
            where: { merchantCode: query?.merchantCode },
          });
        if (!check) message.push(MERCHANT_GUARD_ERROR[7]);
        else {
          const info = await Source.connect()
            .getRepository(MerchantInfo)
            .findOne({
              where: { merchantId: check.id },
            });
          const signDto: SignDto = {
            body,
            merchantCode: query?.merchantCode,
            timestamp: Number(query?.timestamp),
          };

          const signData = genSignature(signDto, info.privateKey);
          if (signData.signature !== signature)
            message.push(MERCHANT_GUARD_ERROR[8]);
        }

        request.merchant = check;
      }
      conditions.forEach((value) => {
        if (value.condition) {
          message.push(MERCHANT_GUARD_ERROR[value.position]);
        }
      });

      if (message.length > 0)
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message,
            error: 'BAD_REQUEST',
          },
          HttpStatus.BAD_REQUEST,
        );

      return true;
    } catch (error) {
      if (!error?.response?.statusCode) {
        console.log('🚀 ~ file: merchant.guard.ts:41 ~ error:', error);

        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: MERCHANT_AUTH_ERROR[0],
            error: MESSAGES_BASE_ERROR[1],
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw error;
    }
  }
}
