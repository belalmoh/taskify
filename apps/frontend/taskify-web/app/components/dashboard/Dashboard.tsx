'use client';

import { Navbar } from "@/components/layout/Navbar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { BoardListCard, CreateBoardCard } from "@/components/dashboard/BoardListCard";

export const Dashboard = () => {
    return (
        <div className="flex h-screen flex-col bg-background">
            <Navbar />

            <main className="flex-1 flex overflow-hidden">
                <div className="flex w-full max-w-7xl mx-auto md:py-8 px-4 md:px-8">
                    <DashboardSidebar />

                    <div className="flex-1 overflow-y-auto">
                        {/* Starred Boards */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                <h2 className="text-lg font-bold text-foreground">Starred boards</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                <BoardListCard title="Socialize board" href="/board/1" backgroundImage="linear-gradient(to right, #cc2b5e, #753a88)" isStarred />
                            </div>
                        </div>

                        {/* Recently Viewed */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                <h2 className="text-lg font-bold text-foreground">Recently viewed</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                <BoardListCard title="Socialize board" href="/board/1" backgroundImage="linear-gradient(to right, #cc2b5e, #753a88)" />
                                <BoardListCard title="Distributed Team Brainstorming" href="/board/brainstorming" backgroundImage="linear-gradient(to right, #42275a, #734b6d)" />
                                <BoardListCard title="Main board" href="/board/main" backgroundImage="linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)" />
                                <BoardListCard title="Welcome to Taskify!" href="/board/welcome" backgroundImage="linear-gradient(to right, #56ab2f, #a8e063)" />
                            </div>
                        </div>

                        {/* Your Workspaces */}
                        <div className="mb-12">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Your Workspaces</h3>

                            {/* Workspace 1: Life Coach */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded bg-gradient-to-tr from-blue-400 to-blue-600 flex items-center justify-center text-sm font-bold text-white">L</div>
                                        <h3 className="font-bold text-foreground">Life Coach - NU Graduation Project</h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1.5 bg-column hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm font-medium transition-colors hidden sm:block">Boards</button>
                                        <button className="px-3 py-1.5 bg-column hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm font-medium transition-colors hidden sm:block">Members (5)</button>
                                        <button className="px-3 py-1.5 bg-column hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm font-medium transition-colors hidden sm:block">Settings</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    <BoardListCard title="Main board" href="/board/main" backgroundImage="linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)" />
                                    <BoardListCard title="Welcome to Taskify!" href="/board/welcome" backgroundImage="linear-gradient(to right, #56ab2f, #a8e063)" />
                                    <CreateBoardCard />
                                </div>
                            </div>

                            {/* Workspace 2: Side Hustle */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded bg-gradient-to-tr from-purple-400 to-pink-600 flex items-center justify-center text-sm font-bold text-white">S</div>
                                        <h3 className="font-bold text-foreground">Side Hustle</h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1.5 bg-column hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm font-medium transition-colors hidden sm:block">Boards</button>
                                        <button className="px-3 py-1.5 bg-column hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm font-medium transition-colors hidden sm:block">Members</button>
                                        <button className="px-3 py-1.5 bg-column hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm font-medium transition-colors hidden sm:block">Settings</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    <BoardListCard title="Socialize board" href="/board/1" backgroundImage="linear-gradient(to right, #cc2b5e, #753a88)" isStarred />
                                    <CreateBoardCard />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
