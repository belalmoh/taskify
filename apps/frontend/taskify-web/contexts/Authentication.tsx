'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface AuthenticationContextType {
    user: {
        id: string;
        name: string;
        email: string;
    } | null;
    isAuthenticated: boolean;
    login: (user: {
        id: string;
        name: string;
        email: string;
    }) => void;
    logout: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

export function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<{
        id: string;
        name: string;
        email: string;
    } | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (user: {
        id: string;
        name: string;
        email: string;
    }) => {
        setUser(user);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };


    return (
        <AuthenticationContext.Provider value={{ user, isAuthenticated, login, logout }}>
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
