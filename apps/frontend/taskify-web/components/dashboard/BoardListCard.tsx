'use client';

import React from 'react';
import Link from 'next/link';

interface BoardListCardProps {
    title: string;
    href: string;
    backgroundImage?: string; // CSS gradient or image url
    isStarred?: boolean;
}

export const BoardListCard = ({ title, href, backgroundImage, isStarred }: BoardListCardProps) => {
    return (
        <Link href={href} className="group relative block h-24 rounded bg-cover bg-center overflow-hidden transition-all hover:brightness-90 hover:shadow-md"
            style={{
                background: backgroundImage || 'linear-gradient(to right, #0079bf, #5067c5)'
            }}
        >
            {/* Overlay for text readability if needed */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

            <span className="relative z-10 block p-3 font-bold text-white text-md drop-shadow-sm truncate">
                {title}
            </span>

            {/* Star Icon - visible on hover or if starred */}
            <div className={`absolute bottom-2 right-2 z-20 transition-opacity ${isStarred ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={isStarred ? "#FFD700" : "none"}
                    stroke={isStarred ? "#FFD700" : "white"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hover:scale-110 transition-transform"
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            </div>
        </Link>
    );
};

export const CreateBoardCard = ({ onClick }: { onClick?: () => void }) => {
    return (
        <button onClick={onClick} className="flex h-24 flex-col items-center justify-center gap-1 rounded bg-column hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-muted-foreground hover:text-foreground">
            <span className="text-sm font-medium">Create new board</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
        </button>
    );
}
