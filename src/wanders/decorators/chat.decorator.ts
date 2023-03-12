import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ChatFilter } from 'src/module/core/chats/models/chat.model';

export const ChatFilterDecor = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { query } = request;
    const filter: ChatFilter = {
      content: query?.content,
    };

    return filter;
  },
);
