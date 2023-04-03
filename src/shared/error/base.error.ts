import { HttpStatus } from '@nestjs/common';
import { BasicResponse } from '../basic.response';

export const MESSAGES_BASE_ERROR = {
  1: 'INTERNAL_SERVER_ERROR(*)',
  2: 'BAD_REQUEST',
  3: 'FORBIDDEN',
  4: 'UNAUTHORIZED',
  5: 'TOO_MANY_REQUEST',
};

export const BASE_ERROR: Array<BasicResponse> = [
  {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    error: MESSAGES_BASE_ERROR[1],
  },
];
