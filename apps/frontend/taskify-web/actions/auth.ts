'use server';

import { signupSchema, loginSchema } from '@/lib/validations/auth';

export type SignUpFormState = {
	success?: boolean;
	message?: string;
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
		confirmPassword?: string[];
	};
}

export type LoginFormState = {
	success?: boolean;
	message?: string;
	errors?: {
		email?: string[];
		password?: string[];
	};
}

export const loginAction = async (prevState: LoginFormState | null, formData: FormData) => {
	const rawData = {
		email: formData.get('email')?.toString() || '',
		password: formData.get('password')?.toString() || '',
	}

	const validationFields = loginSchema.safeParse(rawData);

	if (!validationFields.success) {
		return {
			success: false,
			message: 'Invalid form values',
			errors: validationFields.error.flatten().fieldErrors,
		}
	}

	try {
		const API = `${process.env.BACKEND_URL}/api/auth/login`;
		const payload = {
			email: rawData.email,
			password: rawData.password,
		};

		const response = await fetch(API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const { error } = await response.json().catch(error => error);
			return {
				success: false,
				message: error.message || 'Login failed. Please try again.',
				error,
			};
		}

		const responseData = await response.json();

		return responseData;
	} catch (error) {
		console.error('Login error:', error);
		return {
			success: false,
			message: 'An unexpected error occurred. Please try again.',
			errors: {},
		};
	}
}

export const signupAction = async (prevState: SignUpFormState | null, formData: FormData) => {
	const rawData = {
		name: formData.get('name')?.toString() || '',
		email: formData.get('email')?.toString() || '',
		password: formData.get('password')?.toString() || '',
		confirmPassword: formData.get('confirmPassword')?.toString() || '',
	}

	const validationFields = signupSchema.safeParse(rawData);

	if (!validationFields.success) {
		return {
			success: false,
			message: 'Invalid form values',
			errors: validationFields.error.flatten().fieldErrors,
		}
	}

	try {
		const API = `${process.env.BACKEND_URL}/api/auth/register`;
		const payload = {
			name: rawData.name,
			email: rawData.email,
			password: rawData.password,
		};

		const response = await fetch(API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
			credentials: 'include', // Important: Include cookies in the request
		});

		// Extract cookies from the backend response
		const setCookieHeader = response.headers.get('set-cookie');

		if (!response.ok) {
			const { error } = await response.json().catch(error => error);
			return {
				success: false,
				message: error.message || 'Registration failed. Please try again.',
				error,
			};
		}

		const responseData = await response.json();

		// Forward the cookie to the browser
		if (setCookieHeader) {
			const { cookies } = await import('next/headers');
			const cookieStore = await cookies();
			// Parse and set the cookie
			// Note: In production, you might need more sophisticated cookie parsing
			const cookieParts = setCookieHeader.split(';')[0].split('=');
			if (cookieParts.length === 2) {
				cookieStore.set('access_token', cookieParts[1], {
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					maxAge: 60 * 60 * 24 * 7, // 7 days
				});
			}
		}

		return responseData;
	} catch (error) {
		console.error('Signup error:', error);
		return {
			success: false,
			message: 'An unexpected error occurred. Please try again.',
			errors: {},
		};
	}
}