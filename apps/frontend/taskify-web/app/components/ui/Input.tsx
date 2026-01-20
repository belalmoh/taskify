import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
}

export const Input = ({ leftIcon, className = '', ...props }: InputProps) => {
  return (
    <div className={`relative ${className}`}>
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {leftIcon}
        </div>
      )}
      <input
        className={`w-full rounded-[3px] border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all
          placeholder:text-gray-400 
          focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
          disabled:cursor-not-allowed disabled:opacity-50
          ${leftIcon ? 'pl-9' : ''}
        `}
        {...props}
      />
    </div>
  );
};
