'use client';

import React, { useState, useEffect, useActionState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useFormStatus } from 'react-dom';
import { createWorkspaceAction } from '@/actions/workspace';
import { toast } from 'sonner';
import { useAuthentication } from '@/contexts';

interface CreateWorkspaceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WORKSPACE_TYPES = [
    { value: 'small-business', label: 'Small Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'education', label: 'Education' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'operations', label: 'Operations' },
    { value: 'sales', label: 'Sales' },
    { value: 'other', label: 'Other' },
];

const CreateButton = ({ disabled }: { disabled: boolean }) => {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            variant="primary"
            disabled={pending || disabled}
            fullWidth
            className="justify-center mt-8"
        >
            {pending ? 'Creating...' : 'Continue'}
        </Button>
    );
};

export const CreateWorkspaceModal = ({ isOpen, onClose }: CreateWorkspaceModalProps) => {
    const [workspaceName, setWorkspaceName] = useState('');
    const [workspaceType, setWorkspaceType] = useState('');
    const [workspaceDescription, setWorkspaceDescription] = useState('');
    const [state, formAction] = useActionState(createWorkspaceAction, null);
    const { user } = useAuthentication();

    useEffect(() => {
        if (state?.success) {
            // Show success toast
            toast.success('Workspace created!', {
                description: `${workspaceName} has been successfully created.`,
            });

            // Reset form
            setWorkspaceName('');
            setWorkspaceType('');
            setWorkspaceDescription('');

            // Close modal
            onClose();
        } else if (state?.message && !state?.success) {
            // Show error toast
            console.log({ state });
            toast.error('Failed to create workspace', {
                description: state.message,
            });
        }
    }, [state, onClose, workspaceName]);

    const handleSubmit = async (formData: FormData) => {
        // Add user email to form data
        if (user?.email) {
            formData.set('owner', JSON.stringify(user));
        }
        // Add default values
        formData.set('color', 'from-blue-400 to-blue-600'); // Default color
        formData.set('visibility', 'public'); // Default visibility
        formData.set('members', JSON.stringify([user])); // Empty members array, by default it adds the creator as a member too

        formAction(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl">
            <div className="flex">
                {/* Left side - Form */}
                <div className="flex-1 p-8 bg-card">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">Let's build a Workspace</h2>
                    <p className="text-sm text-muted-foreground mb-8">
                        Boost your productivity by making it easier for everyone to access boards in one location.
                    </p>

                    <form action={handleSubmit} className="space-y-6">
                        {/* Workspace Name */}
                        <div>
                            <label className="text-xs font-bold text-foreground mb-2 block">
                                Workspace name
                            </label>
                            <Input
                                name='name'
                                autoFocus
                                value={workspaceName}
                                onChange={(e) => setWorkspaceName(e.target.value)}
                                placeholder="Taco's Co."
                                className="bg-background border-input h-10"
                            />
                            {state?.errors?.name && (
                                <p className="text-xs text-red-500 mt-1.5">{state.errors.name[0]}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1.5">
                                This is the name of your company, team or organization.
                            </p>
                        </div>

                        {/* Workspace Type */}
                        <div>
                            <label className="text-xs font-bold text-foreground mb-2 block">
                                Workspace type
                            </label>
                            <div className="relative">
                                <select
                                    name='type'
                                    value={workspaceType}
                                    onChange={(e) => setWorkspaceType(e.target.value)}
                                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input appearance-none cursor-pointer"
                                >
                                    <option value="">Choose...</option>
                                    {WORKSPACE_TYPES.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Workspace Description */}
                        <div>
                            <label className="text-xs font-bold text-foreground mb-2 block">
                                Workspace description <span className="text-muted-foreground font-normal">Optional</span>
                            </label>
                            <textarea
                                name='description'
                                value={workspaceDescription}
                                onChange={(e) => setWorkspaceDescription(e.target.value)}
                                placeholder="Our team organizes everything here."
                                rows={4}
                                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input resize-none"
                            />
                            {state?.errors?.description && (
                                <p className="text-xs text-red-500 mt-1.5">{state.errors.description[0]}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1.5">
                                Get your members on board with a few words about your Workspace.
                            </p>
                        </div>

                        {/* Continue Button */}
                        <CreateButton disabled={!workspaceName || !workspaceType} />
                    </form>
                </div>

                {/* Right side - Illustration */}
                <div className="hidden md:flex md:w-[45%] bg-gradient-to-br from-cyan-400 via-teal-400 to-green-400 items-center justify-center p-8 relative overflow-hidden">
                    {/* Decorative stars */}
                    <div className="absolute top-20 right-20 text-white/30">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </div>
                    <div className="absolute bottom-32 left-16 text-white/20">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </div>
                    <div className="absolute top-40 left-24 text-white/25">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </div>

                    {/* Board illustration */}
                    <div className="relative z-10 bg-white rounded-lg shadow-2xl p-4 w-64 transform rotate-3">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                            <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="space-y-2">
                                <div className="bg-gray-100 rounded p-2 h-16"></div>
                                <div className="bg-green-100 rounded p-2 h-12 flex items-center justify-center">
                                    <div className="w-4 h-1 bg-green-400 rounded"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="bg-gray-100 rounded p-2 h-20"></div>
                                <div className="bg-orange-100 rounded p-2 h-10 flex items-center justify-center">
                                    <div className="w-3 h-1 bg-orange-400 rounded"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="bg-gray-100 rounded p-2 h-24"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
