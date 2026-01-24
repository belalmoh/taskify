'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CreateWorkspaceModal } from './CreateWorkspaceModal';

const WORKSPACES = [
    { id: '1', name: 'Life Coach - NU Graduation Project', shortName: 'Life Coach - NU', initial: 'L', color: 'from-blue-400 to-blue-600' },
    { id: '2', name: 'Side Hustle', shortName: 'Side Hustle', initial: 'S', color: 'from-purple-400 to-pink-600' },
];

export const DashboardSidebar = () => {
    const [isCreateWorkspaceModalOpen, setIsCreateWorkspaceModalOpen] = useState(false);
    const [expandedWorkspaces, setExpandedWorkspaces] = useState<Set<string>>(new Set()); // Default first workspace expanded
    const pathname = usePathname();

    const toggleWorkspace = (workspaceId: string) => {
        setExpandedWorkspaces(prev => {
            const newSet = new Set(prev);
            if (newSet.has(workspaceId)) {
                newSet.delete(workspaceId);
            } else {
                newSet.add(workspaceId);
            }
            return newSet;
        });
    };

    const isWorkspaceActive = (workspaceId: string) => {
        return pathname?.startsWith(`/workspace/${workspaceId}`);
    };

    return (
        <>
            <div className="w-64 shrink-0 hidden md:flex flex-col gap-6 pr-6">
                {/* All boards */}
                <Link
                    href="/user/john"
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-column transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <rect x="7" y="7" width="3" height="9" />
                        <rect x="14" y="7" width="3" height="5" />
                    </svg>
                    <span className="text-sm font-semibold text-foreground">All Boards</span>
                </Link>

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

                    <div className="flex flex-col gap-1">
                        {WORKSPACES.map((workspace) => {
                            const isExpanded = expandedWorkspaces.has(workspace.id);
                            const isActive = isWorkspaceActive(workspace.id);

                            return (
                                <div key={workspace.id}>
                                    {/* Workspace Header */}
                                    <button
                                        onClick={() => toggleWorkspace(workspace.id)}
                                        className="w-full flex items-center justify-between px-3 py-2 hover:bg-column rounded-md cursor-pointer transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`h-6 w-6 rounded bg-gradient-to-tr ${workspace.color} flex items-center justify-center text-[10px] font-bold text-white`}>
                                                {workspace.initial}
                                            </div>
                                            <span className="text-sm font-medium text-foreground">{workspace.shortName}</span>
                                        </div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                        >
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </button>

                                    {/* Workspace Submenu */}
                                    {isExpanded && (
                                        <div className="ml-8 mt-1 flex flex-col">
                                            <Link
                                                href={`/user/john/workspace/${workspace.id}/boards`}
                                                className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors ${isActive
                                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium'
                                                    : 'text-muted-foreground hover:bg-column hover:text-foreground'
                                                    }`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                    <rect x="7" y="7" width="3" height="9" />
                                                    <rect x="14" y="7" width="3" height="5" />
                                                </svg>
                                                Boards
                                            </Link>
                                            <Link
                                                href={`/user/john/workspace/${workspace.id}/members`}
                                                className="flex items-center gap-2 px-3 py-1.5 rounded text-sm text-muted-foreground hover:bg-column hover:text-foreground transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                                    <circle cx="9" cy="7" r="4" />
                                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                </svg>
                                                Members
                                            </Link>
                                            <Link
                                                href={`/user/john/workspace/${workspace.id}/settings`}
                                                className="flex items-center gap-2 px-3 py-1.5 rounded text-sm text-muted-foreground hover:bg-column hover:text-foreground transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="3" />
                                                    <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m0-6l4.2-4.2" />
                                                </svg>
                                                Settings
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
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
