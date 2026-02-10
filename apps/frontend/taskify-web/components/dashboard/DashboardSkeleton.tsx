'use client';

// Skeleton card component with animated title placeholder
const SkeletonBoardCard = () => {
    return (
        <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded-lg p-3 flex flex-col justify-between relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"></div>

            {/* Title placeholder */}
            <div className="h-4 w-3/4 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>

            {/* Bottom placeholder for potential icons/badges */}
            <div className="flex gap-2">
                <div className="h-3 w-12 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>
        </div>
    );
};

export const DashboardSkeleton = () => {
    return (
        <>
            <style jsx>{`
				@keyframes shimmer {
					100% {
						transform: translateX(100%);
					}
				}
			`}</style>

            <div>
                {/* Starred Boards */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <SkeletonBoardCard />
                    </div>
                </div>

                {/* Recently Viewed */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-6 w-36 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <SkeletonBoardCard key={i} />
                        ))}
                    </div>
                </div>

                {/* Your Workspaces */}
                <div className="mb-12">
                    <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>

                    {/* Workspace 1 */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                <div className="h-6 w-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded hidden sm:block animate-pulse"></div>
                                <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded hidden sm:block animate-pulse"></div>
                                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded hidden sm:block animate-pulse"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {[1, 2, 3].map((i) => (
                                <SkeletonBoardCard key={i} />
                            ))}
                        </div>
                    </div>

                    {/* Workspace 2 */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded hidden sm:block animate-pulse"></div>
                                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded hidden sm:block animate-pulse"></div>
                                <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded hidden sm:block animate-pulse"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {[1, 2].map((i) => (
                                <SkeletonBoardCard key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
