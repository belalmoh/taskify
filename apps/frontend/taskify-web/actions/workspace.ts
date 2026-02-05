'use server';

import { createWorkspaceSchema } from '@/lib/validations/workspace';

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
        owner: formData.get('owner')?.toString() || ''
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
        const API = `${process.env.BACKEND_URL}/api/workspaces`;
        const payload = {
            name: rawData.name,
            description: rawData.description,
            color: rawData.color,
            visibility: rawData.visibility,
            owner: rawData.owner
        };

        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            credentials: 'include',
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

export const getWorkspacesAction = async (prevState: GetWorkspacesFormState | null) => {

    try {
        const API = `${process.env.BACKEND_URL}/api/workspaces`;

        const response = await fetch(API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const { error } = await response.json().catch(error => error);
            return {
                success: false,
                message: error.message || 'Get workspaces failed. Please try again.',
                error,
            };
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error('Get workspaces error:', error);
        return {
            success: false,
            message: 'An unexpected error occurred. Please try again.',
            errors: {},
        };
    }
}