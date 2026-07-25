'use client';

import { useCallback } from 'react';

type HapticFeedbackType = 'light' | 'medium' | 'heavy' | 'selection' | 'impact';

export const useHapticFeedback = () => {
    const triggerHaptic = useCallback((type: HapticFeedbackType = 'light') => {
        if (typeof window === 'undefined') return;

        try {
            if ('vibrate' in navigator) {
                let pattern: number | number[] = 10;
                switch (type) {
                    case 'light':
                        pattern = 10;
                        break;
                    case 'medium':
                        pattern = 20;
                        break;
                    case 'heavy':
                        pattern = 40;
                        break;
                    case 'selection':
                        pattern = [10];
                        break;
                    case 'impact':
                        pattern = [15, 10, 15];
                        break;
                }
                navigator.vibrate(pattern);
            }
        } catch (error) {
            console.debug('Haptic feedback not supported:', error);
        }
    }, []);

    const isMobile = useCallback(() => {
        if (typeof window === 'undefined') return false;
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        );
    }, []);

    return {
        triggerHaptic,
        isMobile,
        isSupported: typeof navigator !== 'undefined' && 'vibrate' in navigator,
    };
};
