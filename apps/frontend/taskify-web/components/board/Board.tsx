import React from 'react';

interface BoardProps {
  children: React.ReactNode;
}

export const Board = ({ children }: BoardProps) => {
  return (
    <div className="flex h-full w-full overflow-x-auto overflow-y-hidden px-4 pb-4 pt-4">
      <div className="flex h-full items-start gap-4 pb-2">
        {children}
        {/* Add Column Button / Placeholder */}
        <div className="w-72 shrink-0">
             <button className="flex w-full items-center gap-2 rounded-[12px] bg-[#ffffff3d] p-3 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-[#ffffff52] border border-dashed border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add another list
             </button>
        </div>
      </div>
    </div>
  );
};
