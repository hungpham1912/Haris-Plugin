import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MerchantFilter } from 'src/core/merchants/models/merchant.model';

export const MerchantFilterDecor = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { query } = request;
    const filter: MerchantFilter = {
      merchantCode: query?.merchantCode,
    };

    return filter;
  },
);
