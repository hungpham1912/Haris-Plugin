import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { Log } from 'src/core/logs/entities/log.entity';
import { Source } from 'src/database/database.config';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return this.matching(data, context);
      }),
      timeout(30000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }

  matching(data: any, context: ExecutionContext) {
    let status = 200;
    const request = context.switchToHttp().getRequest();
    console.log(
      '🚀 ~ file: transform.interceptor.ts:43 ~ matching ~ request:',
      request.client,
    );
    console.log(
      '🚀 ~ file: transform.interceptor.ts:43 ~ matching ~ request:',
      Object.keys(request),
    );

    const { url, method } = request;
    Source.connect()
      .getRepository(Log)
      .save({ log: { ip: request?.socket?.remoteAddress }, path: url });
    switch (true) {
      case !data:
        break;
      case typeof data.statusCode != 'number' && method == HttpMethod.GET:
        status = HttpStatus.OK;
        break;
      case typeof data.statusCode != 'number' && method == HttpMethod.POST:
        status = HttpStatus.CREATED;
        break;
      case typeof data.statusCode == 'number':
        status = data.statusCode;
        break;
    }

    const now = new Date().toISOString();
    context.switchToHttp().getResponse().status(status);

    console.log(`💥💥 ${method}  ~ ${url}  ${status} ... ${now}`);
    return data;
  }
}

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
}
