'use client';

import { Navbar } from '@/components/layout/Navbar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { usePathname } from 'next/navigation';
import { useAuthentication } from '@/contexts';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const pathname = usePathname();
    const isBoardPage = pathname?.includes('/board/');
    const { isLoading, user } = useAuthentication();

    return (
        <div className="flex h-screen flex-col bg-background">
            <Navbar user={user} />
            <main className="flex-1 flex overflow-hidden">
                {isBoardPage ? (
                    // Board pages: full-width, no sidebar
                    children
                ) : (
                    // Dashboard/Workspace pages: with sidebar
                    <div className="flex w-full max-w-7xl mx-auto md:py-8 px-4 md:px-8">
                        <DashboardSidebar isLoading={isLoading} userId={user?.id || ''} />
                        <div className="flex-1 overflow-y-auto">
                            {children}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
