import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { DashboardSidebarSkeleton } from "@/components/dashboard/DashboardSidebarSkeleton";

export default function Loading() {
    return (
        <div className="flex w-full max-w-7xl mx-auto md:py-8 px-4 md:px-8 h-full">
            <DashboardSidebarSkeleton />
            <div className="flex-1 overflow-y-auto">
                <DashboardSkeleton />
            </div>
        </div>
    );
}