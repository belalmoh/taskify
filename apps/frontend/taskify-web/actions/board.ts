'use server';

import { createBoardSchema } from '@/lib/validations/board';
import { authenticatedFetch } from '@/lib/utils/fetch';

export type CreateBoardFormState = {
    success?: boolean;
    message?: string;
    errors?: {
        title?: string[];
        description?: string[];
        background?: string[];
        visibility?: string[];
        workspaceId?: string[];
    };
}

export const createBoardAction = async (prevState: CreateBoardFormState | null, formData: FormData) => {
    const rawData = {
        title: formData.get('title')?.toString() || '',
        description: formData.get('description')?.toString() || '',
        background: formData.get('background')?.toString() || '',
        visibility: formData.get('visibility')?.toString() || 'public',
        workspaceId: formData.get('workspaceId')?.toString() || '',
    }

    const validationFields = createBoardSchema.safeParse(rawData);

    if (!validationFields.success) {
        return {
            success: false,
            message: 'Invalid form values',
            errors: validationFields.error.flatten().fieldErrors,
        }
    }

    try {
        const payload = {
            title: rawData.title,
            description: rawData.description,
            background: rawData.background,
            visibility: rawData.visibility,
            workspaceId: rawData.workspaceId
        };

        const response = await authenticatedFetch('/api/workspaces', {
            method: 'POST',
            body: payload,
        });

        if (!response.ok) {
            const { error } = await response.json().catch(error => error);
            return {
                success: false,
                message: error.message || 'Create board failed. Please try again.',
                error,
            };
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error('Create board error:', error);
        return {
            success: false,
            message: 'An unexpected error occurred. Please try again.',
            errors: {},
        };
    }
}
