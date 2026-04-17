import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './utils/response.interceptor';
import { GlobalExceptionFilter } from './utils/filters';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  const configService = app.get(ConfigService);

  const allowedOrigins = configService.get<string>('CORS_ORIGIN') || '*';

  app.enableCors({
    origin: allowedOrigins === '*' ? true : allowedOrigins.split(','),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: allowedOrigins !== '*', 
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter(configService));

  const port = configService.get<number>('PORT') ?? 8080;
  const baseUrl = configService.get<string>('BASE_URL');

  await app.listen(port);

  console.log(`🚀 Server started on ${baseUrl}`);
}

bootstrap();