import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ProblemDetailsDto } from './dto/problem-details.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const detail =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : ((exceptionResponse as { message?: string }).message ??
          'An error occurred');

    const problemDetails: ProblemDetailsDto = {
      type: 'about:blank',
      title: HttpStatus[status] || 'Error',
      status: status,
      detail: detail,
      instance: ctx.getRequest<{ url: string }>().url,
    };

    response.setHeader('Content-Type', 'application/problem+json');
    response.status(status).json(problemDetails);
  }
}
