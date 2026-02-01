import { Controller, Post, Body, HttpCode, HttpStatus, Res, Get, UseGuards, Request } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, RefreshUserDto } from '../common/dto/user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        const { token, ...user } = await this.authService.register(body);
        response.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        return user;
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: LoginUserDto, @Res({ passthrough: true }) response: Response) {
        const { token, ...user } = await this.authService.login(body);
        response.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        return user;
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Body() { token }: RefreshUserDto, @Res({ passthrough: true }) response: Response) {
        const { token: newToken, ...user } = await this.authService.refreshToken(token);
        response.cookie('refresh_token', newToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        return user;
    }

    @Get('me')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async me(@Request() req) {
        return req.user;
    }
}
