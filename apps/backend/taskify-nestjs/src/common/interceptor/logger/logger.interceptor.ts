import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
	private readonly logger = new Logger(LoggerInterceptor.name);

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();
		const { method, url, body } = request;
		const now = Date.now();

		this.logger.log(`→ ${method} ${url}`);
		if (Object.keys(body || {}).length > 0) {
			this.logger.debug(`Body: ${JSON.stringify(body)}`);
		}

		return next.handle().pipe(
			tap(() => {
				const response = context.switchToHttp().getResponse();
				const { statusCode } = response;
				this.logger.log(`← ${method} ${url} ${statusCode} - ${Date.now() - now}ms`);
			})
		);
	}
}
