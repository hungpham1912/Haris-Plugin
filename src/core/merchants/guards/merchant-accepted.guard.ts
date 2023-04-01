import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { MESSAGES_BASE_ERROR } from 'src/shared/error/base.error';
import { MERCHANT_AUTH_ERROR } from '../errors/auth.error';
import { Merchant } from '../entities/merchant.entity';

@Injectable()
export class MerchantAcceptedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const merchant: Merchant = request.user;
      if (!merchant?.isAccepted) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: MERCHANT_AUTH_ERROR[6],
            error: MESSAGES_BASE_ERROR[4],
          },
          HttpStatus.BAD_REQUEST,
        );
      }
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
