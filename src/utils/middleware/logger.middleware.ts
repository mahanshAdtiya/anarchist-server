import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl } = req;

    Logger.log(`➡️ Incoming Request: [${method}] ${originalUrl}`, 'RequestLogger');

    res.on('finish', () => {
      const duration = Date.now() - start;
      Logger.log(`✅ Completed: [${method}] ${originalUrl} - ${res.statusCode} (${duration}ms)`, 'RequestLogger');
    });

    next();
  }
}
