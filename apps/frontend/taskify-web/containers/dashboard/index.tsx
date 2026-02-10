'use client';

import { Dashboard } from "@/components/dashboard/Dashboard";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardSidebarSkeleton } from "@/components/dashboard/DashboardSidebarSkeleton";
import { useAuthentication } from "@/contexts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardContainer({ initialWorkspaces }: { initialWorkspaces: any[] }) {
    const { isAuthenticated, isLoading, user } = useAuthentication();
    const router = useRouter();

    useEffect(() => {
        // Wait for auth check to complete before redirecting
        if (!isLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, router]);

    return (
        <div className="flex w-full max-w-7xl mx-auto md:py-8 px-4 md:px-8 h-full">
            {isLoading ? (
                <DashboardSidebarSkeleton />
            ) : (
                <DashboardSidebar userId={user?.id || ''} workspaces={initialWorkspaces} />
            )}
            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <DashboardSkeleton />
                ) : (
                    <Dashboard userId={user?.id || ''} workspaces={initialWorkspaces} />
                )}
            </div>
        </div>
    );
}
