import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        if (!token) {
            throw new UnauthorizedException('No authentication token found');
        }
        try {
            const decodedToken = this.jwtService.verify(token);
            request['user'] = decodedToken;
            return true;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }

    private extractToken(request: any): string | null {
        const cookieToken = request.cookies?.access_token;
        if (cookieToken) {
            return cookieToken;
        }

        // Fallback to Authorization header
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.split(' ')[1];
        }

        return null;
    }
}
