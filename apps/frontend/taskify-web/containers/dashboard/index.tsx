'use client';

import { Dashboard } from "@/components/dashboard/Dashboard";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useAppData, useAuthentication } from "@/contexts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardContainer({ initialWorkspaces }: { initialWorkspaces: any[] }) {
    const { isAuthenticated, isLoading, user } = useAuthentication();
    const router = useRouter();

    const { workspaces, setWorkspaces, boards, setBoards } = useAppData({
        workspaces: initialWorkspaces,
        boards: []
    });

    useEffect(() => {
        // Wait for auth check to complete before redirecting
        if (!isLoading && !isAuthenticated) {
            router.push('/');
        } else {
            setWorkspaces(initialWorkspaces);
            setBoards([]);
        }

        return () => {
            setWorkspaces([]);
            setBoards([]);
        }
    }, [isAuthenticated, isLoading, router, initialWorkspaces]);

    return (
        <div className="flex w-full max-w-7xl mx-auto md:py-8 px-4 md:px-8 h-full">
            <DashboardSidebar userId={user?.id || ''} workspaces={workspaces} />
            <div className="flex-1 overflow-y-auto">
                <Dashboard userId={user?.id || ''} workspaces={workspaces} boards={boards} />
            </div>
        </div>
    );
}
