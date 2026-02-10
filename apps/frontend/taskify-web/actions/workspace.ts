'use server';

import { createWorkspaceSchema } from '@/lib/validations/workspace';
import { authenticatedFetch } from '@/lib/utils/fetch';

export type CreateWorkspaceFormState = {
    success?: boolean;
    message?: string;
    errors?: {
        name?: string[];
        description?: string[];
        color?: string[];
        visibility?: string[];
        owner?: string;
        members?: string[];
    };
}

export type GetWorkspacesFormState = {
    success?: boolean;
    message?: string;
    errors?: {
        name?: string[];
        description?: string[];
        color?: string[];
        visibility?: string[];
        owner?: string[];
        members?: string[];
    };
}

export const createWorkspaceAction = async (prevState: CreateWorkspaceFormState | null, formData: FormData) => {
    const rawData = {
        name: formData.get('name')?.toString() || '',
        description: formData.get('description')?.toString() || '',
        color: formData.get('color')?.toString() || '',
        visibility: formData.get('visibility')?.toString() || '',
        ownerEmail: formData.get('ownerEmail')?.toString() || '',
        memberEmails: formData.get('memberEmails')?.toString() || '[]'
    }

    const validationFields = createWorkspaceSchema.safeParse(rawData);

    if (!validationFields.success) {
        return {
            success: false,
            message: 'Invalid form values',
            errors: validationFields.error.flatten().fieldErrors,
        }
    }

    try {
        const payload = {
            name: rawData.name,
            description: rawData.description,
            color: rawData.color,
            visibility: rawData.visibility,
            ownerEmail: rawData.ownerEmail,
            memberEmails: rawData.memberEmails
        };

        const response = await authenticatedFetch('/api/workspaces', {
            method: 'POST',
            body: payload,
        });

        if (!response.ok) {
            const { error } = await response.json().catch(error => error);
            return {
                success: false,
                message: error.message || 'Create workspace failed. Please try again.',
                error,
            };
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error('Create workspace error:', error);
        return {
            success: false,
            message: 'An unexpected error occurred. Please try again.',
            errors: {},
        };
    }
}
