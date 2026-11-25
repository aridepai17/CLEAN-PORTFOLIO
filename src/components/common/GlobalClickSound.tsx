'use client';

import { useClickSound } from '@/hooks/use-click-sound';
import { useEffect } from 'react';

/**
 * Mount once (e.g. in layout.tsx) to play a click sound on every click
 * anywhere on the page, without wrapping individual elements.
 *
 * Ignores clicks on text inputs, right clicks, and modifier+click combos.
 */
export function GlobalClickSound({
    volume = 30,
    enabled = true,
}: {
    volume?: number;
    enabled?: boolean;
} = {}) {
    const { play } = useClickSound({ volume });

    useEffect(() => {
        if (!enabled) return;

        const handleClick = (event: MouseEvent) => {
            // Ignore right clicks and modifier+click (e.g. cmd+click opens new tab)
            if (event.button !== 0 || event.metaKey || event.ctrlKey) return;

            const target = event.target as HTMLElement | null;

            // Don't click when interacting with form controls
            if (
                target &&
                (target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA' ||
                    target.tagName === 'SELECT')
            ) {
                return;
            }

            void play();
        };

        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, [enabled, play]);

    return null;
}
