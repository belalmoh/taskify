import { z } from 'zod';

// Enum for board visibility to match backend
export const BoardVisibilitySchema = z.enum(['private', 'workspace', 'public'], {
    message: 'Visibility must be private, workspace, or public'
});

// Schema for creating a new board
export const createBoardSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
    description: z.string().optional(),
    background: z.string().min(1, 'Background is required'),
    visibility: BoardVisibilitySchema.default('public'),
    workspaceId: z.preprocess((val) => Number(val), z.number().min(1, 'Workspace is required')),
});

// Schema for updating a board
export const updateBoardSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters').optional(),
    description: z.string().optional(),
    background: z.string().optional(),
    visibility: BoardVisibilitySchema.optional(),
    isFavorite: z.boolean().optional(),
});

// Schema for board response (fetching)
export const boardSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().nullable().optional(),
    background: z.string(),
    isFavorite: z.boolean(),
    visibility: BoardVisibilitySchema,
    workspaceId: z.number(),
    ownerId: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

// Type exports
export type CreateBoardInput = z.infer<typeof createBoardSchema>;
export type UpdateBoardInput = z.infer<typeof updateBoardSchema>;
export type Board = z.infer<typeof boardSchema>;
