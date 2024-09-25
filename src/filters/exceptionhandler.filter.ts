import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';

@Catch()
export class ExceptionHandleFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const requestsTime = new Date().toISOString();
    console.log(exception.message)
    if (exception instanceof ValidationError) {
      console.log(exception);
      response.status(404).json({
        message: 'Validation error',
        requestsTime,
        url: request.url,
        errorName: 'Validation',
        statusCode: 500,
      });
    } else if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        message: exception.message,
        requestsTime,
        url: request.url,
        errorName: exception.name,
        statusCode: exception.getStatus(),
      });
    } else {
      response.status(500).json({
        message: exception?.message || 'Internal server error',
        requestsTime,
        url: request.url,
        errorName: exception?.name,
        statusCode: 500,
      });
    }
  }
}
