'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>('light');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// 1. Check local storage
		const savedTheme = localStorage.getItem('theme') as Theme | null;

		if (savedTheme) {
			setTheme(savedTheme);
			updateDOM(savedTheme);
		} else {
			// 2. Fallback to system preference
			const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			setTheme(systemPreference);
			updateDOM(systemPreference);
		}
		setMounted(true);
	}, []);

	const updateDOM = (newTheme: Theme) => {
		const root = window.document.documentElement;
		root.setAttribute('data-theme', newTheme);
	};

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		updateDOM(newTheme);
	};


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
