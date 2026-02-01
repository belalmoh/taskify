import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ApiResponse, ApiErrorResponse } from '../../dto/api-response';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((data) => {
				return {
					success: true,
					data,
					timestamp: new Date().toISOString(),
				} as ApiResponse<any>;
			}),
			catchError((error) => {
				const ctx = context.switchToHttp();
				const response = ctx.getResponse();

				const status = error instanceof HttpException
					? error.getStatus()
					: HttpStatus.INTERNAL_SERVER_ERROR;

				const errorResponse: ApiErrorResponse = {
					success: false,
					error: {
						code: error.name || 'InternalServerError',
						message: error.message || 'Something went wrong',
						details: error instanceof HttpException ? error.getResponse() : undefined,
					},
					timestamp: new Date().toISOString(),
				};

				response.status(status).json(errorResponse);

				// Return empty observable to complete the stream
				return throwError(() => error);
			}),
		);
	}
}
