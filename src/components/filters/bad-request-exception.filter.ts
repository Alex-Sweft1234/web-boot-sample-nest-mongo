import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

const STATUS = { ERROR_STATUS_REQUEST: 'Bad Request' };

const MESSAGE = { BAD_REQUEST: 'Отсутствуют данные для аутентификации пользователя' };

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: [MESSAGE.BAD_REQUEST],
      error: STATUS.ERROR_STATUS_REQUEST,
    });
  }
}
