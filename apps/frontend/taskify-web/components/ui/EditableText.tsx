'use client';

import React, { useState, useRef, useEffect } from 'react';

interface EditableTextProps {
    initialText: string;
    className?: string;
    inputClassName?: string;
}

export const EditableText = ({
    initialText,
    className = '',
    inputClassName = '',
}: EditableTextProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(initialText);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleStartEditing = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setText(initialText);
    };

    const handleSave = () => {
        setIsEditing(false);
        if (text.trim() !== '' && text !== initialText) {
            console.log('Saved text:', text);
            setText(text);
        } else {
            setText(initialText); // Revert if empty or unchanged
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    if (isEditing) {
        return (
            <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className={`bg-card text-foreground border-2 border-primary rounded px-2 py-1 outline-none min-w-[200px] ${inputClassName} ${className}`}
            />
        );
    }

    return (
        <div
            onClick={handleStartEditing}
            className={`cursor-pointer hover:bg-accent hover:text-accent-foreground rounded px-2 py-1 -ml-2 transition-colors duration-200 ${className}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleStartEditing();
                }
            }}
        >
            {text}
        </div>
    );
};
