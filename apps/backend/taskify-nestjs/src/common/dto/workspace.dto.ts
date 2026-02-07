import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class WorkspaceDto {
    id: number;
    name: string;
    description: string;
    color: string;
    visibility: string;
    ownerEmail: string;
    memberEmails: string[];
    createdAt: Date;
    updatedAt: Date;
}

export class CreateWorkspaceDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description: string;

    @IsNotEmpty({ message: 'Color is required' })
    @IsString({ message: 'Color must be a string' })
    color: string;

    @IsNotEmpty({ message: 'Visibility is required' })
    @IsString({ message: 'Visibility must be a string' })
    visibility: string;

    @IsNotEmpty({ message: 'Owner is required' })
    @IsString({ message: 'Owner must be a string' })
    ownerEmail: string;

    @IsNotEmpty({ message: 'Members is required' })
    @IsString({ message: 'Members must be a string' })
    memberEmails: string[];
}

export class UpdateWorkspaceDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description: string;

    @IsNotEmpty({ message: 'Color is required' })
    @IsString({ message: 'Color must be a string' })
    color: string;

    @IsNotEmpty({ message: 'Visibility is required' })
    @IsString({ message: 'Visibility must be a string' })
    visibility: string;

    @IsNotEmpty({ message: 'Members is required' })
    @IsString({ message: 'Members must be a string' })
    memberEmails: string[];
}
