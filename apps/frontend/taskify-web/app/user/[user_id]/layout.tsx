'use client';

import { Navbar } from '@/components/layout/Navbar';
import { useAuthentication } from '@/contexts';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const { isLoading, user } = useAuthentication();

    return (
        <div className="flex h-screen flex-col bg-background">
            <Navbar user={user} />
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
}
