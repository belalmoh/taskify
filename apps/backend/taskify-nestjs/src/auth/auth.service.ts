import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    async register(body: any) {
        return "To be implemented";
    }

    async login(body: any) {
        return "To be implemented";
    }

    async me(request: any) {
        return "To be implemented";
    }
}
