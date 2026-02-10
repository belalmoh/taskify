'use server';

import { authenticatedFetch } from '@/lib/utils/fetch';

export const getWorkspaces = async () => {
    try {
        const response = await authenticatedFetch('/api/workspaces', {
            method: 'GET',
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