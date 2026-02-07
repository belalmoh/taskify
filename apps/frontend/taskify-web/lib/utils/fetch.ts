import { cookies } from 'next/headers';

type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
};

/**
 * Authenticated fetch utility for Server Actions
 * Automatically forwards authentication cookies to the backend
 */
export async function authenticatedFetch(endpoint: string, options: FetchOptions = {}) {
    const { method = 'GET', body, headers = {} } = options;

    // Get cookies from the incoming request
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    const url = `${process.env.BACKEND_URL}${endpoint}`;

    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
            // Forward the authentication cookie
            ...(accessToken && { 'Cookie': `access_token=${accessToken}` }),
        },
        ...(body && { body: JSON.stringify(body) }),
    });

    return response;
}
