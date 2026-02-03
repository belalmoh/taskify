'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { userStorage } from '@/lib/utils/userStorage';

interface AuthenticationContextType {
    user: {
        id: string;
        name: string;
        email: string;
    } | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: {
        id: string;
        name: string;
        email: string;
    }) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

export function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<{
        id: string;
        name: string;
        email: string;
    } | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const login = (user: {
        id: string;
        name: string;
        email: string;
    }) => {
        setUser(user);
        setIsAuthenticated(true);
        userStorage.setUser(user);
    };

    const logout = async () => {
        setUser(null);
        setIsAuthenticated(false);
        // Remove the cookie
        Cookies.remove('access_token');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include', // Include cookies
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

        } catch (error) {
            throw error;
        } finally {
            userStorage.clearUser();
        }
    };

    const checkAuth = async () => {
        setIsLoading(true);

        // Check if access_token cookie exists
        const token = Cookies.get('access_token');
        const user = userStorage.getUser();

        if (user) {
            setUser(user);
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
        }

        if (!token) {
            setIsAuthenticated(false);
            setUser(null);
            setIsLoading(false);
            return;
        }

        // Token exists, validate it with backend
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`, {
                method: 'GET',
                credentials: 'include', // Important: sends cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                next: {
                    revalidate: 3600
                }
            });

            if (response.ok) {
                const userData = await response.json();
                setUser({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                });
                setIsAuthenticated(true);
            } else {
                // Token is invalid or expired
                await logout();
            }
        } catch (error) {
            await logout();
        } finally {
            setIsLoading(false);
        }
    };

    // Check authentication on mount
    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthenticationContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, checkAuth }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export const useAuthentication = () => {
    const context = useContext(AuthenticationContext);
    if (context === undefined) {
        throw new Error('useAuthentication must be used within a AuthenticationProvider');
    }
    return context;
};
