import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	leftIcon?: React.ReactNode;
}

// Simple className merge utility
function cn(...classes: (string | undefined)[]) {
	return classes.filter(Boolean).join(' ');
}

export const Input = ({ leftIcon, className = '', ...props }: InputProps) => {
	return (
		<div className="relative">
			{leftIcon && (
				<div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
					{leftIcon}
				</div>
			)}
			<input
				className={cn(
					'w-full rounded-lg px-3 py-2 text-sm transition-all',
					'focus:outline-none focus:ring-2 focus:ring-offset-0',
					'disabled:cursor-not-allowed disabled:opacity-50',
					leftIcon ? 'pl-9' : '',
					className
				)}
				{...props}
			/>
		</div>
	);
};
