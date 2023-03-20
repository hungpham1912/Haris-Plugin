import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class MerchantGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const signature = request?.headers?.authorization;
    console.log(
      '🚀 ~ file: merchant.guard.ts:9 ~ MerchantGuard ~ canActivate ~ signature:',
      request?.headers?.authorization,
    );

    return false;
  }
}
