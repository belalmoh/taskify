'use server';

import { authenticatedFetch } from '@/lib/utils/fetch';

export const validateUser = async () => {
    try {
        const response = await authenticatedFetch(`/api/auth/me`, {
            method: 'GET',
        });

        if (!response.ok) {
            const { error } = await response.json().catch(error => error);
            return {
                success: false,
                message: error.message,
                error,
            };
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error('Validate user error:', error);
        return {
            success: false,
            message: 'An unexpected error occurred. Please try again.',
            errors: {},
        };
    }
}