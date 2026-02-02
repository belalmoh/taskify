import { Controller, Post, Body, HttpCode, HttpStatus, Res, Get, UseGuards, Request } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, RefreshUserDto } from '../common/dto/user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        const { accessToken, refreshToken, ...user } = await this.authService.register(body);
        response.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: Number(this.configService.get('COOKIE_ACCESS_TOKEN_EXPIRY')) || 604800000 // 7 days
        });
        response.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: Number(this.configService.get('COOKIE_REFRESH_TOKEN_EXPIRY')) || 2592000000 // 30 days
        });
        return user;
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: LoginUserDto, @Res({ passthrough: true }) response: Response) {
        const { accessToken, refreshToken, ...user } = await this.authService.login(body);
        response.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: Number(this.configService.get('COOKIE_ACCESS_TOKEN_EXPIRY')) || 604800000 // 7 days
        });
        response.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: Number(this.configService.get('COOKIE_REFRESH_TOKEN_EXPIRY')) || 2592000000 // 30 days
        });
        return user;
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refresh(@Body() { refreshToken }: RefreshUserDto, @Res({ passthrough: true }) response: Response) {
        const { accessToken: newToken, refreshToken: newRefreshToken, ...user } = await this.authService.refreshToken(refreshToken);
        response.cookie('access_token', newToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: Number(this.configService.get('COOKIE_ACCESS_TOKEN_EXPIRY')) || 604800000 // 7 days
        });
        response.cookie('refresh_token', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: Number(this.configService.get('COOKIE_REFRESH_TOKEN_EXPIRY')) || 2592000000 // 30 days
        });
        return user;
    }

    @Get('me')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async me(@Request() req) {
        console.log(req);
        return req.user;
    }
}
