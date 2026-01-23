'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CreateWorkspaceModal } from './CreateWorkspaceModal';

export const DashboardSidebar = () => {
    const [isCreateWorkspaceModalOpen, setIsCreateWorkspaceModalOpen] = useState(false);

    return (
        <>
            <div className="w-64 shrink-0 hidden md:flex flex-col gap-6 pr-6">
                {/* Top Navigation */}
                <nav className="flex flex-col gap-1">
                    <Link href="/" className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-md font-medium text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><rect x="7" y="7" width="3" height="9" /><rect x="14" y="7" width="3" height="5" /></svg>
                        Boards
                    </Link>
                    <Link href="/templates" className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:bg-column rounded-md font-medium text-sm transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                        Templates
                    </Link>
                    <Link href="/" className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:bg-column rounded-md font-medium text-sm transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        Home
                    </Link>
                </nav>

                {/* Workspaces Section */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between px-3 text-sm font-semibold text-muted-foreground">
                        <span>Workspaces</span>
                        <button
                            onClick={() => setIsCreateWorkspaceModalOpen(true)}
                            className="rounded hover:bg-accent text-foreground transition-colors p-2 -m-2 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        </button>
                    </div>

                    <div className="flex flex-col">
                        {/* Workspace Item 1 */}
                        <div className="group">
                            <div className="flex items-center justify-between px-3 py-2 hover:bg-column rounded-md cursor-pointer group-hover:bg-column/80">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded bg-gradient-to-tr from-blue-400 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                                        L
                                    </div>
                                    <span className="text-sm font-medium text-foreground">Life Coach - NU</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-foreground transition-colors"><polyline points="6 9 12 15 18 9" /></svg>
                            </div>
                            {/* Submenu links could go here */}
                        </div>

                        {/* Workspace Item 2 */}
                        <div className="group">
                            <div className="flex items-center justify-between px-3 py-2 hover:bg-column rounded-md cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded bg-gradient-to-tr from-purple-400 to-pink-600 flex items-center justify-center text-[10px] font-bold text-white">
                                        S
                                    </div>
                                    <span className="text-sm font-medium text-foreground">Side Hustle</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-foreground transition-colors"><polyline points="6 9 12 15 18 9" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreateWorkspaceModal
                isOpen={isCreateWorkspaceModalOpen}
                onClose={() => setIsCreateWorkspaceModalOpen(false)}
            />
        </>
    );
};
