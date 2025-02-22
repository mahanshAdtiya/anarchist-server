import { HttpException, HttpStatus } from '@nestjs/common';

export class AppError extends HttpException {
  constructor(message: string, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(
      { status: 'error', message },
      statusCode,
    );
  }
}
