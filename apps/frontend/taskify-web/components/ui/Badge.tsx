import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'green' | 'blue' | 'red' | 'yellow' | 'purple' | 'gray';
    className?: string;
}

export const Badge = ({ children, variant = 'gray', className = '' }: BadgeProps) => {
    const variants = {
        green: "bg-status-green-bg text-status-green-text",
        blue: "bg-status-blue-bg text-status-blue-text",
        red: "bg-status-red-bg text-status-red-text",
        yellow: "bg-status-yellow-bg text-status-yellow-text",
        purple: "bg-status-purple-bg text-status-purple-text",
        gray: "bg-column text-foreground"
    };

    return (
        <span className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold uppercase tracking-wide transition-colors ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};
