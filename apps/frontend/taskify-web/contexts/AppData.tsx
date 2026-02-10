'use client';

import React, { createContext, useContext, useState } from 'react';

interface AppDataContextType {
    workspaces: any[] | null;
    setWorkspaces: (workspaces: any[]) => void;

    boards: any[] | null;
    setBoards: (boards: any[]) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
    const [workspaces, setWorkspaces] = useState<any[] | null>(null);
    const [boards, setBoards] = useState<any[] | null>(null);

    return (
        <AppDataContext.Provider value={{ workspaces, setWorkspaces, boards, setBoards }}>
            {children}
        </AppDataContext.Provider>
    );
}

export const useAppData = (initialData?: { workspaces?: any[], boards?: any[] }) => {
    const context = useContext(AppDataContext);
    if (context === undefined) {
        throw new Error('useAppData must be used within a AppDataProvider');
    }

    // Use initialData fallback only if context is strictly null
    const workspaces = (context.workspaces === null && initialData?.workspaces)
        ? initialData.workspaces
        : (context.workspaces || []);

    const boards = (context.boards === null && initialData?.boards)
        ? initialData.boards
        : (context.boards || []);

    return {
        ...context,
        workspaces,
        boards
    };
};
