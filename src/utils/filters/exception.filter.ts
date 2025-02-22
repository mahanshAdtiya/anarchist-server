import { Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseDto } from '../data';


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went very wrong';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseMessage = exception.getResponse();
      message = typeof responseMessage === 'string' ? responseMessage : (responseMessage as any).message || exception.message;
    }

    const isDev = this.configService.get<string>('NODE_ENV') === 'development';

    if (isDev) {
      console.error(exception);
      return response.status(status).json(new ResponseDto('error', message, { stack: exception.stack }));
    }

    response.status(status).json(new ResponseDto('error', message));
  }
}
