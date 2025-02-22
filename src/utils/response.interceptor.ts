import { ResponseDto } from './data';

import { Observable, map } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data) => new ResponseDto<T>('success', 'Request successful', data)),
    );
  }
}
