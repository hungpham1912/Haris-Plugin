import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { MESSAGES_BASE_ERROR } from 'src/shared/error/base.error';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();

    const getRes: any = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      message: getRes.message,
      error: MESSAGES_BASE_ERROR[1],
    });
  }
}

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response
      .status(status)

      .json({
        statusCode: status,
        message: 'Account insufficient permissions to take action',
        error: MESSAGES_BASE_ERROR[2],
      });
  }
}

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response
      .status(status)

      .json({
        statusCode: status,
        message: 'An error occurred while processing the access token',
        error: MESSAGES_BASE_ERROR[3],
      });
  }
}
