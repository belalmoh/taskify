'use client';

import { useState, useEffect, useActionState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useFormStatus } from 'react-dom';
import { loginAction } from '@/actions/auth';
import { useAuthentication } from '@/contexts';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface LoginFormProps {
    onSwitchToSignup: () => void;
}

const LoginButton = ({ invalid }: { invalid: boolean }) => {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={pending || invalid}
            className="w-full bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-purple-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
            {pending ? 'Logging in...' : 'Log In'}
        </Button>
    );
}

export const LoginForm = ({ onSwitchToSignup }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, formAction] = useActionState(loginAction, null);

    const { login, isAuthenticated } = useAuthentication();
    const router = useRouter();

    useEffect(() => {
        if (state?.success && !isAuthenticated) {
            login({
                id: state.data?.user.id,
                name: state.data?.user.name,
                email: state.data?.user.email,
            });

            // Show success toast
            toast.success('Welcome to Taskify!', {
                description: 'You have successfully logged in.',
            });

            // Redirect to user's dashboard after a short delay
            setTimeout(() => {
                router.push(`/user/${state.data.user.name}`);
            }, 1000);
        } else if (state?.success === false && state?.message) {
            // Show error toast for failed signup
            toast.error('Login Failed', {
                description: state.message,
            });
        }
    }, [state, login, isAuthenticated, router]);

    return (
        <div className="space-y-6">
            <form className="space-y-4" action={formAction}>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-slate-800/50 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 transition-all"
                    />
                    {state?.errors?.email && (
                        <p className="text-xs text-red-400 ml-1">{state.errors.email[0]}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Input
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-slate-800/50 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 transition-all"
                    />
                    {state?.errors?.password && (
                        <p className="text-xs text-red-400 ml-1">{state.errors.password[0]}</p>
                    )}
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-sm font-medium text-gray-300">Password</label>
                        <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors cursor-pointer">
                            Forgot password?
                        </button>
                    </div>
                </div>

                <LoginButton invalid={!email || !password} />
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-900 px-2 text-gray-500">Or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    className="border-white/10 bg-slate-800/30 hover:bg-slate-800/50 text-white gap-2 cursor-pointer"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Google
                </Button>
                <Button
                    variant="outline"
                    className="border-white/10 bg-slate-800/30 hover:bg-slate-800/50 text-white gap-2 cursor-pointer"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        />
                    </svg>
                    GitHub
                </Button>
            </div>

            <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <button
                    onClick={onSwitchToSignup}
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors cursor-pointer"
                >
                    Sign Up
                </button>
            </p>
        </div>
    );
};
