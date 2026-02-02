import { cookies } from 'next/headers';
import { LandingContainer } from '@/containers/landing';

async function getCurrentUser() {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get('access_token');

		if (!token) {
			return null;
		}

		// Validate token with backend
		const response = await fetch(`${process.env.BACKEND_URL}/api/auth/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token.value}`,
			},
		});

		if (response.ok) {
			const { data } = await response.json();
			return {
				id: data.id,
				name: data.name,
				email: data.email,
			};
		}

		return null;
	} catch (error) {
		console.error('Error fetching user:', error);
		return null;
	}
}

export default async function LandingPage() {
	// Server-side cookie check and user validation
	const user = await getCurrentUser();

	return <LandingContainer initialUser={user} />;
}
