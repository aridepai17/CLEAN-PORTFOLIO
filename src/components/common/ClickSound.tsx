'use client';

import { useClickSound } from '@/hooks/use-click-sound';

interface ClickSoundProps {
    children: React.ReactNode;
    volume?: number;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

/**
 * Wraps any clickable element with a Web Audio API click sound.
 * Falls back to a plain button if audio isn't supported.
 */
export function ClickSound({
    children,
    volume = 0.12,
    onClick,
    className,
    disabled = false,
}: ClickSoundProps) {
    const { play, isSupported } = useClickSound({ volume });

    const handleClick = () => {
        if (disabled) return;
        if (isSupported) play();
        onClick?.();
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className={className}
            style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: disabled ? 'not-allowed' : 'pointer',
                font: 'inherit',
                color: 'inherit',
            }}
        >
            {children}
        </button>
    );
}
