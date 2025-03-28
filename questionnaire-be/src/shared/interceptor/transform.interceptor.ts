import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controller = context.getClass().name; // 取得controller name
    const handler = context.getHandler().name; // 取得method name
    // const ctx = context.switchToHttp();
    // const response = ctx.getResponse();
    // const request = ctx.getRequest();
    return next.handle().pipe(
      map((data) => {
        if (
          controller === 'DownloadController' &&
          handler === 'downloadExcel'
        ) {
          return data;
        }
        const res = {
          data: data,
          code: 0,
          message: '请求成功',
        };
        return res;
      }),
    );
  }
}
