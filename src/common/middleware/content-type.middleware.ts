import {
  Injectable,
  NestMiddleware,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class ContentTypeMiddleware implements NestMiddleware {
  use(request: Request, _response: Response, next: NextFunction): void {
    if (request.method === 'POST' || request.method === 'PATCH') {
      const contentType = request.headers['content-type'];

      if (!contentType || !contentType.includes('application/json')) {
        throw new UnsupportedMediaTypeException(
          'The media type of the request is not supported',
        );
      }
    }

    next();
  }
}
