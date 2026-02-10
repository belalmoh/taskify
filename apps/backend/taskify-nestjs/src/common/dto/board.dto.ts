import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";

export enum BoardVisibility {
    PRIVATE = 'private',
    WORKSPACE = 'workspace',
    PUBLIC = 'public',
}

export class BoardDto {
    id: number;
    title: string;
    description?: string;
    background?: string;
    isFavorite: boolean;
    visibility: BoardVisibility;
    workspaceId: number;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
}

export class CreateBoardDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsOptional()
    @IsString({ message: 'Background must be a string' })
    background?: string;

    @IsOptional()
    @IsBoolean({ message: 'isFavorite must be a boolean' })
    isFavorite?: boolean;

    @IsOptional()
    @IsEnum(BoardVisibility, { message: 'Visibility must be private, workspace, or public' })
    visibility?: BoardVisibility;

    @IsNotEmpty({ message: 'Workspace ID is required' })
    @IsNumber({}, { message: 'Workspace ID must be a number' })
    workspaceId: number;
}

export class UpdateBoardDto {
    @IsOptional()
    @IsString({ message: 'Title must be a string' })
    title?: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsOptional()
    @IsString({ message: 'Background must be a string' })
    background?: string;

    @IsOptional()
    @IsBoolean({ message: 'isFavorite must be a boolean' })
    isFavorite?: boolean;

    @IsOptional()
    @IsEnum(BoardVisibility, { message: 'Visibility must be private, workspace, or public' })
    visibility?: BoardVisibility;
}
