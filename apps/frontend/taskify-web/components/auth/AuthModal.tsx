'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    children: React.ReactNode;
    illustrationTitle?: string;
    illustrationDesc?: string;
}

export const AuthModal = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    illustrationTitle = 'Taskify',
    illustrationDesc = 'Organize anything, together.',
}: AuthModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-4xl p-0 overflow-hidden bg-transparent shadow-none"
        >
            <div className="flex flex-col md:flex-row min-h-[500px] glass-dark rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Left Side - Illustration/Value Prop */}
                <div className="md:w-1/2 bg-linear-to-br from-purple-600/20 to-pink-600/20 p-12 hidden md:flex flex-col justify-center items-center relative overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-30">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-[80px] animate-pulse"></div>
                        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full blur-[80px] animate-pulse delay-700"></div>
                    </div>

                    <div className="relative z-10 text-center space-y-6">
                        <div className="w-24 h-24 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 mx-auto transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                            <span className="text-white font-bold text-4xl">T</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mt-8">{illustrationTitle}</h3>
                        <p className="text-gray-300 text-sm max-w-[280px]">{illustrationDesc}</p>

                        {/* Mini Board Illustration */}
                        <div className="mt-8 space-y-3 w-full max-w-[240px]">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="glass-dark border border-white/10 p-3 rounded-lg flex items-center gap-3 transform hover:translate-x-2 transition-transform duration-300"
                                >
                                    <div
                                        className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-green-500' : i === 2 ? 'bg-blue-500' : 'bg-orange-500'}`}
                                    ></div>
                                    <div className="h-2 bg-gray-600 rounded-full flex-1"></div>
                                    <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Content */}
                <div className="md:w-1/2 p-8 md:p-12 bg-slate-900/50 flex flex-col justify-center">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                            <p className="text-gray-400 text-sm">{description}</p>
                        </div>

                        {children}
                    </div>
                </div>
            </div>
        </Modal>
    );
};
