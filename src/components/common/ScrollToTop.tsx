'use client';

import { getLenis } from '@/components/common/LenisProvider';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        const handleScrollReset = () => {
            const lenis = getLenis();

            if (lenis) {
                lenis.start();
                lenis.scrollTo(0, { immediate: true });
            } else {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }
        };

        const frameId = requestAnimationFrame(handleScrollReset);

        return () => cancelAnimationFrame(frameId);
    }, [pathname]);

    return null;
}
