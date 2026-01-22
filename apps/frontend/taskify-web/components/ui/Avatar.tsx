import React from 'react';

interface AvatarProps {
  src?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar = ({ src, fallback, size = 'md', className = '' }: AvatarProps) => {
  const sizes = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-8 w-8 text-xs",
    lg: "h-10 w-10 text-sm"
  };

  return (
    <div className={`relative inline-flex shrink-0 overflow-hidden rounded-full border border-white dark:border-gray-100 ${sizes[size]} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={fallback}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-status-blue-bg text-status-blue-text font-bold dark:bg-status-blue-bg dark:text-status-blue-text">
          {fallback.substring(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
};
