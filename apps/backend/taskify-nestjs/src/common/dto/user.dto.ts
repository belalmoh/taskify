import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// Requests
export class UserDto {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}

export class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
}

export class LoginUserDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    password: string;
}

export class RefreshUserDto {
    @IsNotEmpty({ message: 'Token is required' })
    @IsString({ message: 'Token must be a string' })
    token: string;
}

// Responses
export class AuthResponseDto {
    user: Omit<UserDto, 'createdAt' | 'updatedAt'>;
    token: string;
}

export class UserResponseDto {
    id: number;
    name: string;
    email: string;
}