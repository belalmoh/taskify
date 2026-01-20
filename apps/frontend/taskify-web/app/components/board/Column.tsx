import React from 'react';
import { Button } from '../ui/Button';

interface ColumnProps {
	title: string;
	count?: number;
	children: React.ReactNode;
	headerColor?: string; // Optional dot color
}

export const Column = ({ title, count, children, headerColor = "bg-gray-400" }: ColumnProps) => {
	return (
		<div className="flex max-h-full w-72 flex-col shrink-0 rounded-[12px] bg-column shadow-sm border border-border/50">
			{/* Header */}
			<div className="flex items-center justify-between p-3 pb-2 cursor-grab active:cursor-grabbing">
				<div className="flex items-center gap-2">
					{/* Color Dot if needed */}
					<div className={`h-2.5 w-2.5 rounded-full ${headerColor}`} />
					<h2 className="text-sm font-semibold text-foreground">{title}</h2>
					{count !== undefined && (
						<span className="rounded-full bg-gray-200 px-2 py-0.5 text-[11px] font-bold text-gray-600">
							{count}
						</span>
					)}
				</div>
				<div className="flex items-center">
					<button className="flex h-7 w-7 items-center justify-center rounded text-gray-500 hover:bg-gray-200">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
					</button>
				</div>
			</div>

			{/* Cards Container */}
			<div className="flex-1 overflow-y-auto overflow-x-hidden px-2 pb-2 scrollbar-thin scrollbar-thumb-gray-300">
				<div className="flex flex-col gap-2">
					{children}
				</div>
			</div>

			{/* Footer / Add Card */}
			<div className="p-2 pt-0">
				<Button
					variant="ghost"
					fullWidth
					className="justify-start text-gray-500 hover:text-foreground hover:bg-gray-200/50"
					leftIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>}
				>
					Add card
				</Button>
			</div>
		</div>
	);
};
