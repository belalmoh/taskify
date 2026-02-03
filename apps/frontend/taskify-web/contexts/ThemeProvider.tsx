'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to safely get initial theme
function getInitialTheme(): Theme {
	// Only access localStorage in the browser
	if (typeof window !== 'undefined') {
		const savedTheme = localStorage.getItem('theme') as Theme | null;
		if (savedTheme) {
			return savedTheme;
		}
		// Fallback to system preference
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return 'dark';
		}
	}
	return 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		// Apply theme to DOM on mount
		updateDOM(theme);
	}, [theme]);

	const updateDOM = (newTheme: Theme) => {
		if (typeof window !== 'undefined') {
			const root = window.document.documentElement;
			root.setAttribute('data-theme', newTheme);
		}
	};

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', newTheme);
		}
		updateDOM(newTheme);
	};

	// Prevent flash of unstyled content
	if (!mounted) {
		return null;
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
