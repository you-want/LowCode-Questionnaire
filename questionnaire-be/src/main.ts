import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { TransformInterceptor } from './shared/interceptor/transform.interceptor';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 给请求添加prefix
  app.setGlobalPrefix('api/question');

  // port
  // const configService = app.get(ConfigService);
  // const port = configService.get('port');
  // await app.listen(port);
  await app.listen(3001);
}
bootstrap();
