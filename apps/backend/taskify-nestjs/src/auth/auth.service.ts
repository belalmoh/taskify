import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto, CreateUserDto, LoginUserDto, UserResponseDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async register(body: CreateUserDto): Promise<AuthResponseDto> {
        try {
            // Hash password before saving
            const hashedPassword = await bcrypt.hash(body.password, 10);
            const user = this.userRepository.create({
                ...body,
                password: hashedPassword
            });
            const savedUser = await this.userRepository.save(user);

            const payload = { id: savedUser.id, email: savedUser.email, name: savedUser.name };
            const token = this.jwtService.sign(payload);

            // Return user without password, createdAt, updatedAt
            const { password, createdAt, updatedAt, ...userResponse } = savedUser;
            return { user: userResponse, token };

        } catch (error) {
            if (error.code === '23505') { // PostgreSQL unique violation
                throw new ConflictException('User with this email already exists');
            }
            throw new BadRequestException('Failed to register user');
        }
    }

    async login(body: LoginUserDto): Promise<AuthResponseDto> {
        const user = await this.userRepository.findOne({ where: { email: body.email } });
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = { id: user.id, email: user.email, name: user.name };
        const token = this.jwtService.sign(payload);

        // Return user without password, createdAt, updatedAt
        const { password, createdAt, updatedAt, ...userResponse } = user;
        return { user: userResponse, token };
    }

    async refreshToken(token: string): Promise<AuthResponseDto> {
        try {
            const decodedToken = this.jwtService.verify(token);
            const user = await this.userRepository.findOne({ where: { id: decodedToken.id } });
            if (!user) {
                throw new NotFoundException('User not found');
            }
            const payload = { id: user.id, email: user.email, name: user.name };
            const newToken = this.jwtService.sign(payload);

            // Return user without password, createdAt, updatedAt
            const { password, createdAt, updatedAt, ...userResponse } = user;
            return { user: userResponse, token: newToken };
        } catch (error) {
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Invalid or expired token');
            }
            throw error;
        }
    }
}
