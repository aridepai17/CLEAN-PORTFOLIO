'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

let lenisInstance: Lenis | null = null;

export function getLenis() {
    return lenisInstance;
}

export default function LenisProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const initialized = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            if (initialized.current) {
                return;
            }
            initialized.current = true;

            lenisInstance = new Lenis({
                autoRaf: true,
                smoothWheel: true,
                lerp: 0.1,
                duration: 1.2,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                wrapper: window,
                content: document.documentElement,
            });

            (window as unknown as Record<string, unknown>).__LENIS__ =
                lenisInstance;
            console.log(
                '[Lenis] initialized',
                lenisInstance.className,
                lenisInstance.limit,
            );
        } catch (error) {
            console.error('[Lenis] init failed', error);
        }

        return () => {
            try {
                lenisInstance?.destroy();
            } finally {
                lenisInstance = null;
                initialized.current = false;
            }
        };
    }, []);

    return <>{children}</>;
}
