import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('JwtAuthGuard', () => {
    it('should be defined', () => {
        expect(new JwtAuthGuard(new JwtService())).toBeDefined();
    });
});
