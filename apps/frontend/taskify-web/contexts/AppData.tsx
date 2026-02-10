'use client';

import React, { createContext, useContext, useState } from 'react';

interface AppDataContextType {
    workspaces: any[];
    setWorkspaces: (workspaces: any[]) => void;

    boards: any[];
    setBoards: (boards: any[]) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
    const [workspaces, setWorkspaces] = useState<any[]>([]);
    const [boards, setBoards] = useState<any[]>([]);

    return (
        <AppDataContext.Provider value={{ workspaces, setWorkspaces, boards, setBoards }}>
            {children}
        </AppDataContext.Provider>
    );
}

export const useAppData = () => {
    const context = useContext(AppDataContext);
    if (context === undefined) {
        throw new Error('useAppData must be used within a AppDataProvider');
    }
    return context;
};
