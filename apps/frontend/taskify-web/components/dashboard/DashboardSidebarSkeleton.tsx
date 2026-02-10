'use client';

export const DashboardSidebarSkeleton = () => {
    return (
        <>
            <style jsx>{`
				@keyframes shimmer {
					100% {
						transform: translateX(100%);
					}
				}
			`}</style>

            <div className="w-64 shrink-0 hidden md:flex flex-col gap-6 pr-6">
                {/* All boards skeleton */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-md">
                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>

                {/* Workspaces Section */}
                <div className="flex flex-col gap-2">
                    {/* Section header */}
                    <div className="flex items-center justify-between px-3">
                        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="w-3.5 h-3.5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>

                    {/* Workspace items */}
                    <div className="flex flex-col gap-1">
                        {[1, 2].map((i) => (
                            <div key={i} className="relative overflow-hidden">
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"></div>

                                {/* Workspace header */}
                                <div className="w-full flex items-center justify-between px-3 py-2 rounded-md">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </div>
                                    <div className="w-3.5 h-3.5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
