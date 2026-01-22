'use client';

import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { EditableText } from '../ui/EditableText';

interface CardDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    card: {
        title: string;
        description?: string;
        listName: string;
    };
}

export const CardDetailModal = ({ isOpen, onClose, card }: CardDetailModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="bg-card max-w-6xl h-[85vh] flex flex-col p-0 overflow-hidden">
            {/* Header / Cover Section */}
            <div className="h-32 bg-primary w-full relative shrink-0">
                <div className="absolute top-0 right-0 p-3 flex items-center gap-2">
                    <button className="p-1.5 rounded bg-black/20 text-white hover:bg-black/30 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                    </button>
                    <button onClick={onClose} className="p-1.5 rounded bg-black/20 text-white hover:bg-black/30 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/90 font-bold text-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><rect x="7" y="7" width="3" height="9" /><a href="" /><rect x="14" y="7" width="3" height="5" /></svg>
                    {card.title}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Column: Details & Content */}
                <div className="flex-1 overflow-y-auto p-8 border-r border-border bg-card">
                    {/* Header Row */}
                    <div className="flex items-start gap-4 mb-6">
                        <div className="mt-1">
                            <div className="h-6 w-6 rounded-full border-2 border-muted-foreground/30" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground mb-1">{card.title}</h1>
                            <div className="flex flex-wrap gap-2 mt-3">
                                <ActionPill icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>} label="Add" />
                                <ActionPill icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>} label="Labels" />
                                <ActionPill icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>} label="Dates" />
                                <ActionPill icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>} label="Checklist" />
                                <ActionPill icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>} label="Members" />
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="mb-8 pl-10">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                                <h3 className="text-md font-semibold text-foreground">Description</h3>
                            </div>
                            <Button variant="secondary" size="sm" className="h-7 text-xs">Edit</Button>
                        </div>
                        <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
                            <p>A list of the things we think we want to do, maybe not quite ready for work, but high likelihood of being worked on.</p>
                            <p>This is the staging area where specs should get fleshed out.</p>
                            <p>No limit on the list size, but we should reconsider if it gets long.</p>
                        </div>
                    </div>

                    {/* Attachments Section */}
                    <div className="mb-6 pl-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                                <h3 className="text-md font-semibold text-foreground">Attachments</h3>
                            </div>
                            <Button variant="secondary" size="sm" className="h-7 text-xs">Add</Button>
                        </div>
                        <div className="flex items-start gap-4 group cursor-pointer hover:bg-accent/50 p-2 rounded -ml-2 transition-colors">
                            <div className="h-20 w-32 bg-primary/20 rounded-md flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-primary">IMAGE</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-foreground">Backlog.png</h4>
                                <div className="text-xs text-muted-foreground mt-1">Added Jan 3, 2019 • <span className="underline">Cover</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Activity */}
                <div className="w-[400px] flex flex-col bg-card border-l border-border/10 dark:bg-black/20">
                    <div className="p-4 border-b border-border flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                            <h3 className="text-sm font-semibold text-foreground">Comments and activity</h3>
                        </div>
                        <Button variant="secondary" size="sm" className="h-7 text-xs">Show details</Button>
                    </div>

                    <div className="p-4 flex-1 overflow-y-auto">
                        <div className=" bg-accent/30 rounded-md p-3">
                            <textarea
                                placeholder="Write a comment..."
                                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground resize-none h-12"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const ActionPill = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/50 hover:bg-accent rounded text-xs font-medium text-foreground transition-colors border border-border/50">
        <span className="text-muted-foreground">{icon}</span>
        {label}
    </button>
);
