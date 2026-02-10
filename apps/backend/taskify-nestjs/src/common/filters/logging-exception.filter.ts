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

        const stack = exception instanceof Error ? exception.stack : '';

        // Log the error with status and message
        this.logger.error(`✗ ${request.method} ${request.url} ${status} - ${message}`);

        // If it's a 500 error or not an HttpException, log the stack trace
        if (status >= 500 || !(exception instanceof HttpException)) {
            this.logger.error(stack);
        }

        const errorResponse = exception instanceof HttpException
            ? exception.getResponse()
            : {
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: 'Internal server error',
                error: exception instanceof Error ? exception.message : 'Unknown'
            };

        response.status(status).json(errorResponse);
    }
}
