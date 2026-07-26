'use client';

import type { AnalyticsEvent } from '@/types/analytics';
import { useCallback } from 'react';

declare global {
    interface Window {
        umami?: {
            track: (
                eventName: string,
                eventData?: Record<string, string | number | boolean>,
            ) => void;
        };
    }
}

export function useUmami() {
    const trackEvent = useCallback((event: AnalyticsEvent) => {
        try {
            if (typeof window !== 'undefined' && window.umami) {
                window.umami.track(event.name, event.data);
            }
        } catch (error) {
            console.error('Error tracking Umami event', error);
        }
    }, []);

    return { trackEvent };
}
