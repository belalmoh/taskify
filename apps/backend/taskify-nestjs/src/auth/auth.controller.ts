import { Controller, Post, Body, Get, Request, HttpCode, HttpStatus, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto, LoginUserDto, UserResponseDto, RefreshUserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: CreateUserDto) {
        return this.authService.register(body);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: LoginUserDto) {
        return this.authService.login(body);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Body() { token }: RefreshUserDto) {
        return this.authService.refreshToken(token);
    }
}
