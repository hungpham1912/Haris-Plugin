import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ConversationFilter } from 'src/module/core/conversations/models/conversation.model';

export const ConversationFilterDecor = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { query } = request;
    const filter: ConversationFilter = {
      showName: query?.showName,
    };

    return filter;
  },
);
