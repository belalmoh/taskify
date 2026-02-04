'use client';

import { Dashboard } from "@/components/dashboard/Dashboard";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { useAuthentication } from "@/contexts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
    const { isAuthenticated, isLoading, user } = useAuthentication();
    const router = useRouter();

    useEffect(() => {
        // Wait for auth check to complete before redirecting
        if (!isLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, isLoading, router]);

    // Show skeleton loader while checking authentication
    if (isLoading) {
        return <DashboardSkeleton />;
    }

    return <Dashboard userId={user?.id || ''} />;
}
