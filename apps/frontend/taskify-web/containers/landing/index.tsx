'use client';

import { useState } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { useAuthentication } from '@/contexts';
import { useRouter } from 'next/navigation';

interface LandingContainerProps {
    initialUser?: {
        id: string;
        name: string;
        email: string;
    } | null;
}

export function LandingContainer({ initialUser }: LandingContainerProps) {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
    const { isAuthenticated, user } = useAuthentication();
    const router = useRouter();

    // Use server-provided user data or client-side auth state
    const currentUser = user || initialUser;
    const isUserAuthenticated = isAuthenticated || !!initialUser;

    const openAuthModal = (mode: 'login' | 'signup') => {
        setAuthMode(mode);
        setIsAuthModalOpen(true);
    };

    const handleTryNow = () => {
        if (isUserAuthenticated && currentUser) {
            router.push(`/user/${currentUser.name}`);
        } else {
            openAuthModal('signup');
        }
    };

    const stages = [
        {
            id: 'done',
            name: 'Done',
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-500/20',
            borderColor: 'border-green-500/50',
            tasks: [
                { id: '1', title: 'Task 1', avatars: ['👤', '👥'] },
                { id: '2', title: 'Task 2', avatars: ['👤'] },
            ],
        },
        {
            id: 'in-progress',
            name: 'In Progress',
            color: 'from-blue-500 to-cyan-600',
            bgColor: 'bg-blue-500/20',
            borderColor: 'border-blue-500/50',
            tasks: [
                { id: '3', title: 'Task 2', avatars: ['👤', '👥'] },
                { id: '4', title: 'Task 3', avatars: ['👤', '👥'] },
            ],
        },
        {
            id: 'review',
            name: 'Review',
            color: 'from-orange-500 to-amber-600',
            bgColor: 'bg-orange-500/20',
            borderColor: 'border-orange-500/50',
            tasks: [
                { id: '5', title: 'Task 3', avatars: ['👤'] },
                { id: '6', title: 'Task 4', avatars: ['👤', '👥', '👤'] },
            ],
        },
        {
            id: 'to-do',
            name: 'To Do',
            color: 'from-purple-500 to-pink-600',
            bgColor: 'bg-purple-500/20',
            borderColor: 'border-purple-500/50',
            tasks: [{ id: '7', title: 'Task 1', avatars: ['👤', '👥'] }],
        },
    ];

    const floatingIcons = [
        { icon: '✓', color: 'text-green-400', position: 'top-20 left-10', delay: '0s' },
        { icon: '📊', color: 'text-blue-400', position: 'top-32 right-20', delay: '1s' },
        { icon: '🎯', color: 'text-orange-400', position: 'bottom-40 left-20', delay: '2s' },
        { icon: '💬', color: 'text-purple-400', position: 'top-40 right-32', delay: '0.5s' },
        { icon: '📝', color: 'text-cyan-400', position: 'bottom-32 right-16', delay: '1.5s' },
        { icon: '⚡', color: 'text-yellow-400', position: 'bottom-20 left-32', delay: '2.5s' },
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
            {/* Animated gradient overlay */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background:
                        'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(74, 222, 128, 0.2), transparent 50%), radial-gradient(circle at 40% 20%, rgba(251, 146, 60, 0.2), transparent 50%)',
                    animation: 'gradientShift 15s ease infinite',
                    backgroundSize: '200% 200%',
                }}
            />

            {/* Floating icons */}
            {floatingIcons.map((item, index) => (
                <div
                    key={index}
                    className={`absolute ${item.position} ${item.color} text-4xl opacity-20`}
                    style={{
                        animation: `floatSlow 6s ease-in-out infinite`,
                        animationDelay: item.delay,
                    }}
                >
                    {item.icon}
                </div>
            ))}

            {/* Navigation */}
            <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">T</span>
                    </div>
                    <span className="text-white font-bold text-xl">Taskify</span>
                </div>
                <div className="flex items-center gap-4">
                    {isUserAuthenticated && currentUser ? (
                        <button
                            onClick={() => router.push(`/user/${currentUser.name}`)}
                            className="px-6 py-2 bg-linear-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all cursor-pointer"
                        >
                            Dashboard
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => openAuthModal('login')}
                                className="px-4 py-2 text-white hover:text-gray-300 transition-colors cursor-pointer"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => openAuthModal('signup')}
                                className="px-6 py-2 bg-linear-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all cursor-pointer"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
                <div className="text-center mb-16 space-y-6">
                    <h1
                        className="text-6xl md:text-7xl font-bold text-white leading-tight"
                        style={{ animation: 'slideInUp 0.8s ease-out' }}
                    >
                        Visualize Your Workflow.
                        <br />
                        <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                            Empower Your Team.
                        </span>
                    </h1>
                    <p
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                        style={{ animation: 'slideInUp 0.8s ease-out 0.2s backwards' }}
                    >
                        Task management app is a modern workflow visualization, task management, and empowers
                        your team.
                    </p>
                    <div
                        className="flex items-center justify-center gap-4 pt-4"
                        style={{ animation: 'slideInUp 0.8s ease-out 0.4s backwards' }}
                    >
                        <button
                            onClick={handleTryNow}
                            className="px-8 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105 cursor-pointer"
                        >
                            Try it now
                        </button>
                    </div>
                </div>

                {/* Workflow Board */}
                <div
                    className="relative"
                    style={{ animation: 'slideInUp 1s ease-out 0.6s backwards' }}
                >
                    {/* Board Container */}
                    <div className="glass-dark rounded-2xl p-6 shadow-2xl">
                        {/* Board Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-white font-semibold ml-4">Board</span>
                                <div className="flex gap-2 ml-4">
                                    <button className="px-3 py-1 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">
                                        Stages
                                    </button>
                                    <button className="px-3 py-1 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer">
                                        Stages
                                    </button>
                                </div>
                            </div>
                            <div className="w-6 h-6 text-gray-400">⋯</div>
                        </div>

                        {/* Kanban Stages */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {stages.map((stage, stageIndex) => (
                                <div
                                    key={stage.id}
                                    className="space-y-3"
                                    style={{
                                        animation: `slideInUp 0.6s ease-out ${0.8 + stageIndex * 0.1}s backwards`,
                                    }}
                                >
                                    {/* Stage Header */}
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-3 h-3 rounded-full bg-linear-to-r ${stage.color}`}
                                        ></div>
                                        <span className="text-white font-medium text-sm">{stage.name}</span>
                                        <span className="text-gray-400 text-xs ml-auto">→</span>
                                    </div>

                                    {/* Tasks */}
                                    <div className="space-y-2">
                                        {stage.tasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className={`${stage.bgColor} ${stage.borderColor} border rounded-lg p-3 cursor-pointer transition-all hover:scale-105 hover:shadow-lg`}
                                                onMouseEnter={() => setHoveredCard(task.id)}
                                                onMouseLeave={() => setHoveredCard(null)}
                                                style={{
                                                    transform:
                                                        hoveredCard === task.id ? 'scale(1.05)' : 'scale(1)',
                                                }}
                                            >
                                                <div className="text-white text-sm mb-2">{task.title}</div>
                                                <div className="flex items-center gap-1">
                                                    <div className="flex -space-x-2">
                                                        {task.avatars.map((avatar, i) => (
                                                            <div
                                                                key={i}
                                                                className="w-6 h-6 rounded-full bg-linear-to-br from-purple-400 to-pink-600 flex items-center justify-center text-xs border-2 border-slate-800"
                                                            >
                                                                {avatar}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="ml-auto">
                                                        <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full bg-linear-to-r ${stage.color}`}
                                                                style={{ width: '60%' }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6 flex items-center gap-4">
                            <span className="text-gray-400 text-sm">Progress</span>
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-linear-to-r from-green-500 via-blue-500 to-purple-500"
                                    style={{ width: '65%' }}
                                ></div>
                            </div>
                            <span className="text-white text-sm font-semibold">65%</span>
                        </div>

                        {/* Team Avatars */}
                        <div className="mt-4 flex items-center justify-end gap-2">
                            <div className="flex -space-x-2">
                                {['👤', '👥', '👤', '👥'].map((avatar, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center border-2 border-slate-800"
                                    >
                                        {avatar}
                                    </div>
                                ))}
                            </div>
                            <button className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white text-lg transition-colors cursor-pointer">
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dashboard Preview Section */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
                    style={{ animation: 'slideInUp 1s ease-out 1.2s backwards' }}
                >
                    {/* Main Dashboard */}
                    <div className="glass-dark rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-white font-semibold">Main Dashboard</span>
                            <span className="text-gray-400">⋯</span>
                        </div>
                        <div className="space-y-3">
                            {['Sell tasks', 'Progress report', 'Review alert'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-gray-300 text-sm flex-1">{item}</span>
                                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${i === 0
                                                ? 'bg-cyan-500'
                                                : i === 1
                                                    ? 'bg-orange-500'
                                                    : 'bg-blue-500'
                                                }`}
                                            style={{ width: `${60 + i * 15}%` }}
                                        ></div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-purple-400 to-pink-600 flex items-center justify-center text-xs">
                                        👤
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Collaboration Tools */}
                    <div className="glass-dark rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-white font-semibold">Collaboration Tools</span>
                            <span className="text-gray-400">⋯</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                                    👤
                                </div>
                                <div className="flex-1">
                                    <div className="text-white text-sm">Ava Mayer</div>
                                    <div className="text-gray-400 text-xs">12 minutes ago</div>
                                </div>
                                <span className="text-gray-400">→</span>
                            </div>
                            <div className="flex -space-x-2 justify-center">
                                {['👤', '👥', '👤', '👥'].map((avatar, i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-pink-600 flex items-center justify-center border-2 border-slate-800"
                                    >
                                        {avatar}
                                    </div>
                                ))}
                                <button className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white border-2 border-slate-800 transition-colors cursor-pointer">
                                    +
                                </button>
                            </div>
                            <button className="w-full py-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all cursor-pointer">
                                Add task
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                title={authMode === 'signup' ? 'Create Account' : 'Log In'}
                description={
                    authMode === 'signup'
                        ? 'Enter your details to get started.'
                        : 'Enter your credentials to access your account.'
                }
                illustrationTitle={authMode === 'signup' ? 'Start your journey' : 'Welcome back'}
                illustrationDesc={
                    authMode === 'signup'
                        ? 'Join thousands of teams managing their workflow with Taskify.'
                        : 'Continue where you left off and stay on top of your tasks.'
                }
            >
                {authMode === 'signup' ? (
                    <SignupForm onSwitchToLogin={() => setAuthMode('login')} />
                ) : (
                    <LoginForm onSwitchToSignup={() => setAuthMode('signup')} />
                )}
            </AuthModal>
        </div>
    );
}
