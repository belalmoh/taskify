'use client';

import { BoardListCard, CreateBoardCard } from '@/components/dashboard/BoardListCard';
import { useState, use } from 'react';
import { CreateBoardModal } from '@/components/dashboard/CreateBoardModal';

interface WorkspacePageProps {
    params: Promise<{ id: string }>;
}

const WORKSPACE_DATA: Record<string, { name: string; initial: string; color: string }> = {
    '1': { name: 'Life Coach - NU Graduation Project', initial: 'L', color: 'from-blue-400 to-blue-600' },
    '2': { name: 'Side Hustle', initial: 'S', color: 'from-purple-400 to-pink-600' },
};

const BOARDS_BY_WORKSPACE: Record<string, Array<{ id: string; title: string; background: string; starred?: boolean }>> = {
    '1': [
        { id: '1', title: 'Socialize board', background: 'linear-gradient(to right, #667eea, #764ba2)', starred: true },
        { id: '2', title: 'Project Planning', background: 'linear-gradient(to right, #f093fb, #f5576c)' },
        { id: '3', title: 'Marketing Strategy', background: 'linear-gradient(to right, #4facfe, #00f2fe)' },
    ],
    '2': [
        { id: '4', title: 'Socialize board', background: 'linear-gradient(to right, #667eea, #764ba2)', starred: true },
        { id: '5', title: 'Product Roadmap', background: 'linear-gradient(to right, #43e97b, #38f9d7)' },
    ],
};

export default function WorkspacePage({ params }: WorkspacePageProps) {
    const { id } = use(params);
    const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
    const workspace = WORKSPACE_DATA[id];
    const boards = BOARDS_BY_WORKSPACE[id] || [];
    const starredBoards = boards.filter(board => board.starred);
    const yourBoards = boards.filter(board => !board.starred);

    // if (!workspace) {
    //     return (
    //         <div className="min-h-screen bg-background">
    //             <Navbar />
    //             <div className="container mx-auto px-6 py-8">
    //                 <p className="text-muted-foreground">Workspace not found</p>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <>
            <div className="flex-1">
                {/* Workspace Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className={`h-12 w-12 rounded bg-gradient-to-tr ${workspace.color} flex items-center justify-center text-xl font-bold text-white`}>
                        {workspace.initial}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">{workspace.name}</h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            <span>Private</span>
                        </div>
                    </div>
                </div>

                {/* Starred Boards */}
                {starredBoards.length > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <h2 className="text-base font-semibold text-foreground">Starred boards</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {starredBoards.map((board) => (
                                <BoardListCard
                                    key={board.id}
                                    href={`/user/john/board/${board.id}`}
                                    title={board.title}
                                    backgroundImage={board.background}
                                    isStarred={board.starred}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Your Boards */}
                <div>
                    <h2 className="text-base font-semibold text-foreground mb-4">Your boards</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {yourBoards.map((board) => (
                            <BoardListCard
                                key={board.id}
                                href={`/user/john/board/${board.id}`}
                                title={board.title}
                                backgroundImage={board.background}
                                isStarred={board.starred}
                            />
                        ))}
                        <CreateBoardCard onClick={() => setIsCreateBoardModalOpen(true)} />
                    </div>
                </div>
            </div>
            <CreateBoardModal
                isOpen={isCreateBoardModalOpen}
                onClose={() => setIsCreateBoardModalOpen(false)}
            />
        </>

    );
}
