import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body: any) {
        return "To be implemented";
        // return this.authService.register(body);
    }

    @Post('login')
    async login(@Body() body: any) {
        return "To be implemented";
        // return this.authService.login(body);
    }

    @Get('profile')
    async me(@Request() request) {
        return "To be implemented";
        // return this.authService.getUser(request.user.id);
    }
}
