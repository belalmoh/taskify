'use client';

import { useEffect, useState } from 'react';
import { BoardListCard, CreateBoardCard } from "@/components/dashboard/BoardListCard";
import { CreateBoardModal } from "@/components/dashboard/CreateBoardModal";
import Link from 'next/link';
import { getInitial } from '@/lib/utils/helpers';

interface DashboardPropTypes {
    userId: string;
    workspaces?: Workspace[];
    boards?: Board[];
}

interface Board {
    id: string;
    title: string;
    background: string;
    isStarred: boolean;
}

interface Workspace {
    id: string;
    name: string;
    initial: string;
    color: string;
    boards: Board[];
}

export const Dashboard = ({ userId, workspaces = [], boards = [] }: DashboardPropTypes) => {
    const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);

    // Flatten all boards to find starred ones
    const allBoards = workspaces.flatMap(ws => (ws.boards || []).map((b: any) => ({ ...b, workspaceId: ws.id })));
    const starredBoards = allBoards.filter(b => b.isStarred);
    const recentlyViewedBoards = allBoards.slice(0, 4); // Dummy recently viewed for now

    return (
        <>
            {/* Starred Boards */}
            {starredBoards.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        <h2 className="text-lg font-bold text-foreground">Starred boards</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {starredBoards.map(board => (
                            <BoardListCard
                                key={board.id}
                                title={board.title}
                                href={`/user/${userId}/board/${board.id}`}
                                backgroundImage={board.background}
                                isStarred
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Recently Viewed */}
            {recentlyViewedBoards.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        <h2 className="text-lg font-bold text-foreground">Recently viewed</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {recentlyViewedBoards.map(board => (
                            <BoardListCard
                                key={board.id}
                                title={board.title}
                                href={`/user/${userId}/board/${board.id}`}
                                backgroundImage={board.background}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Your Workspaces */}
            <div className="mb-12">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Your Workspaces</h3>

                {workspaces.map((workspace) => {
                    const boards = workspace.boards || [];
                    const initial = getInitial(workspace.name);

                    return (
                        <div key={workspace.id} className="mb-10">
                            {/* Workspace Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`h-8 w-8 rounded bg-gradient-to-tr ${workspace.color || 'from-blue-400 to-blue-600'} flex items-center justify-center text-sm font-bold text-white uppercase`}>
                                        {initial}
                                    </div>
                                    <h3 className="font-bold text-foreground">{workspace.name}</h3>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/user/${userId}/workspace/${workspace.id}/boards`}
                                        className="px-3 py-1.5 bg-column hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm font-medium transition-colors hidden sm:block"
                                    >
                                        Boards
                                    </Link>
                                    <Link
                                        href={`/user/${userId}/workspace/${workspace.id}/members`}
                                        className="px-3 py-1.5 bg-column hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm font-medium transition-colors hidden sm:block"
                                    >
                                        Members
                                    </Link>
                                    <Link
                                        href={`/user/${userId}/workspace/${workspace.id}/settings`}
                                        className="px-3 py-1.5 bg-column hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm font-medium transition-colors hidden sm:block"
                                    >
                                        Settings
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {boards.map((board: any) => (
                                    <BoardListCard
                                        key={board.id}
                                        title={board.title}
                                        href={`/user/${userId}/board/${board.id}`}
                                        backgroundImage={board.background}
                                        isStarred={board.isStarred}
                                    />
                                ))}
                                <CreateBoardCard onClick={() => setIsCreateBoardModalOpen(true)} />
                            </div>
                        </div>
                    );
                })}
            </div>

            <CreateBoardModal isOpen={isCreateBoardModalOpen} onClose={() => setIsCreateBoardModalOpen(false)} workspaces={workspaces} />
        </>
    );
};