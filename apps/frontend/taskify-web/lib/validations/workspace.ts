import { z } from 'zod';

// Schema for creating a new workspace
export const createWorkspaceSchema = z.object({
    name: z.string().min(1, 'Workspace name is required').max(100, 'Workspace name must be less than 100 characters'),
    description: z.string().optional(),
    color: z.string().regex(/^(from-|to-|via-|#)/, 'Invalid color format'),
    visibility: z.enum(['private', 'public'], {
        message: 'Visibility must be either private or public'
    }),
    ownerEmail: z.email('Invalid owner email'),
    memberEmails: z.string().optional(), // JSON string of email array
});

// Schema for updating a workspace
export const updateWorkspaceSchema = z.object({
    name: z.string().min(1, 'Workspace name is required').max(100, 'Workspace name must be less than 100 characters'),
    description: z.string().optional(),
    color: z.string().regex(/^(from-|to-|via-|#)/, 'Invalid color format'),
    visibility: z.enum(['private', 'public'], {
        message: 'Visibility must be either private or public'
    }).default('public'),
    members: z.array(z.email('Invalid member email address')).default([]),
});

// Schema for workspace response (fetching)
export const workspaceSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    color: z.string(),
    visibility: z.enum(['private', 'public'], {
        message: 'Visibility must be either private or public'
    }),
    owner: z.email(),
    members: z.array(z.email()),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

// Type exports
export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
export type Workspace = z.infer<typeof workspaceSchema>;
