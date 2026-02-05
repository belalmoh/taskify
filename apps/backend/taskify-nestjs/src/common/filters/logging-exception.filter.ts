import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class LoggingExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger('HTTP');

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException
            ? exception.message
            : 'Internal server error';

        // Log the error
        this.logger.error(`✗ ${request.method} ${request.url} ${status} - ${message}`);

        // Send JSON response instead of re-throwing
        const errorResponse = exception instanceof HttpException
            ? exception.getResponse()
            : { message: 'Internal server error' };

        response.status(status).json(errorResponse);
    }
}
