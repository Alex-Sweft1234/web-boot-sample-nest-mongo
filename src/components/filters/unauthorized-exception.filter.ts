import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

const STATUS = { ERROR_STATUS_REQUEST: 'Unauthorized' };

const MESSAGE = { UNAUTHORIZED: 'Отсутствуют данные для аутентификации' };

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: [MESSAGE.UNAUTHORIZED],
      error: STATUS.ERROR_STATUS_REQUEST,
    });
  }
}
