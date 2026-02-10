'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { getInitial } from '@/lib/utils/helpers';

interface CreateBoardModalProps {
    isOpen: boolean;
    onClose: () => void;
    workspaces: any[];
}

const BACKGROUNDS = [
    { type: 'image', value: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', id: 1 },
    { type: 'image', value: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', id: 2 },
    { type: 'image', value: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', id: 3 },
    { type: 'image', value: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', id: 4 },
    { type: 'gradient', value: 'linear-gradient(to right, #0079bf, #5067c5)', id: 5 },
    { type: 'gradient', value: 'linear-gradient(to right, #d299c2, #fef9d7)', id: 6 },
    { type: 'gradient', value: 'linear-gradient(to right, #eb3349, #f45c43)', id: 7 },
    { type: 'gradient', value: 'linear-gradient(to right, #56ab2f, #a8e063)', id: 8 },
    { type: 'gradient', value: 'linear-gradient(to right, #834d9b, #d04ed6)', id: 9 },
];

const MORE_PHOTOS = [
    { value: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', id: 1 },
    { value: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', id: 2 },
    { value: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', id: 3 },
    { value: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', id: 4 },
    { value: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', id: 101 },
    { value: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', id: 102 },
];

const MORE_COLORS = [
    { value: 'linear-gradient(to right, #0079bf, #5067c5)', id: 5 },
    { value: 'linear-gradient(to right, #d299c2, #fef9d7)', id: 6 },
    { value: 'linear-gradient(to right, #eb3349, #f45c43)', id: 7 },
    { value: 'linear-gradient(to right, #56ab2f, #a8e063)', id: 8 },
    { value: 'linear-gradient(to right, #834d9b, #d04ed6)', id: 9 },
    { value: 'linear-gradient(to right, #ff9966, #ff5e62)', id: 10 },
];

export const CreateBoardModal = ({ isOpen, onClose, workspaces }: CreateBoardModalProps) => {
    const [title, setTitle] = useState('');
    const [selectedBackground, setSelectedBackground] = useState(BACKGROUNDS[0]);
    const [showAllBackgrounds, setShowAllBackgrounds] = useState(false);
    const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);
    const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsWorkspaceDropdownOpen(false);
            }
        };

        if (isWorkspaceDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isWorkspaceDropdownOpen]);

    const handleCreate = () => {
        console.log('Create board:', { title, background: selectedBackground, workspace: selectedWorkspace });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create board" className="max-w-2xl">
            <div className="flex flex-col gap-6">
                {/* Preview Box */}
                <div className="flex justify-center">
                    <div
                        className="w-[200px] h-[120px] rounded-md shadow-sm relative flex flex-col items-center justify-center p-4 transition-all duration-300"
                        style={{
                            background: selectedBackground.type === 'image' ? `url(${selectedBackground.value}) center/cover` : selectedBackground.value
                        }}
                    >
                        {/* Mock Board Look */}
                        <div className="flex gap-2 w-full h-full pt-3 px-1 opacity-90">
                            <div className="flex-1 bg-white/20 rounded-t-sm h-full backdrop-blur-[1px]"></div>
                            <div className="flex-1 bg-white/20 rounded-t-sm h-full backdrop-blur-[1px]"></div>
                            <div className="flex-1 bg-white/20 rounded-t-sm h-full backdrop-blur-[1px]"></div>
                        </div>
                    </div>
                </div>

                {/* Background Picker */}
                <div>
                    <label className="text-xs font-bold text-muted-foreground mb-2 block">Background</label>

                    {!showAllBackgrounds ? (
                        <>
                            <div className="grid grid-cols-4 gap-2 mb-2">
                                {BACKGROUNDS.slice(0, 4).map((bg) => (
                                    <button
                                        key={bg.id}
                                        className={`w-full aspect-video rounded-sm bg-cover bg-center relative hover:opacity-90 transition-all ${selectedBackground.id === bg.id ? 'ring-2 ring-primary ring-offset-1 ring-offset-card' : ''}`}
                                        style={{ backgroundImage: `url(${bg.value})` }}
                                        onClick={() => setSelectedBackground(bg)}
                                    >
                                        {selectedBackground.id === bg.id && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 w-full h-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="grid grid-cols-6 gap-2">
                                {BACKGROUNDS.slice(4).map((bg) => (
                                    <button
                                        key={bg.id}
                                        className={`w-full aspect-video rounded-sm hover:opacity-90 transition-all ${selectedBackground.id === bg.id ? 'ring-2 ring-primary ring-offset-1 ring-offset-card' : ''}`}
                                        style={{ background: bg.value }}
                                        onClick={() => setSelectedBackground(bg)}
                                    >
                                        {selectedBackground.id === bg.id && (
                                            <div className="flex items-center justify-center h-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            </div>
                                        )}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setShowAllBackgrounds(true)}
                                    className="bg-muted hover:bg-muted/80 flex items-center justify-center rounded-sm transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-4">
                            {/* Photos Section */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-foreground">Photos</h3>
                                    <button
                                        onClick={() => setShowAllBackgrounds(false)}
                                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        ← Back
                                    </button>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {MORE_PHOTOS.map((bg) => (
                                        <button
                                            key={bg.id}
                                            className={`w-full aspect-video rounded-sm bg-cover bg-center relative hover:opacity-90 transition-all ${selectedBackground.id === bg.id ? 'ring-2 ring-primary ring-offset-1 ring-offset-card' : ''}`}
                                            style={{ backgroundImage: `url(${bg.value})` }}
                                            onClick={() => setSelectedBackground({ type: 'image', ...bg })}
                                        >
                                            {selectedBackground.id === bg.id && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 w-full h-full">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Colors Section */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-bold text-foreground">Colors</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {MORE_COLORS.map((bg) => (
                                        <button
                                            key={bg.id}
                                            className={`w-full aspect-video rounded-sm hover:opacity-90 transition-all ${selectedBackground.id === bg.id ? 'ring-2 ring-primary ring-offset-1 ring-offset-card' : ''}`}
                                            style={{ background: bg.value }}
                                            onClick={() => setSelectedBackground({ type: 'gradient', ...bg })}
                                        >
                                            {selectedBackground.id === bg.id && (
                                                <div className="flex items-center justify-center h-full">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Board Title */}
                <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block">Board title <span className="text-red-500">*</span></label>
                    <Input
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`bg-background border-input transition-colors h-9 ${!title ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
                    />
                    {!title && <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">👋 Board title is required</p>}
                </div>

                {/* Workspace - Custom Dropdown */}
                <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1.5 block">Workspace</label>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
                            className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground hover:bg-accent transition-colors flex items-center justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <div className={`h-6 w-6 rounded bg-gradient-to-tr ${selectedWorkspace.color} flex items-center justify-center text-xs font-bold text-white`}>
                                    {getInitial(selectedWorkspace.name)}
                                </div>
                                <span className="truncate">{selectedWorkspace.name}</span>
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
                                className={`text-muted-foreground transition-transform ${isWorkspaceDropdownOpen ? 'rotate-180' : ''}`}
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>

                        {isWorkspaceDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg overflow-hidden">
                                {workspaces.map((workspace) => (
                                    <button
                                        key={workspace.id}
                                        type="button"
                                        onClick={() => {
                                            setSelectedWorkspace(workspace);
                                            setIsWorkspaceDropdownOpen(false);
                                        }}
                                        className={`w-full px-3 py-2.5 text-left flex items-center gap-2 transition-colors ${selectedWorkspace.id === workspace.id
                                            ? 'bg-primary/10 text-primary border-l-2 border-primary'
                                            : 'hover:bg-accent text-foreground'
                                            }`}
                                    >
                                        <div className={`h-6 w-6 rounded bg-gradient-to-tr ${workspace.color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                                            {getInitial(workspace.name)}
                                        </div>
                                        <span className="text-sm truncate">{workspace.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Create Button */}
                <div className="flex justify-end gap-2 pt-2">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        disabled={!title}
                        onClick={handleCreate}
                    >
                        Create
                    </Button>
                </div>
            </div>
        </Modal>
    );
};


