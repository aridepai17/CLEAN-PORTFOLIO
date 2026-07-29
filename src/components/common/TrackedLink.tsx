'use client';

import { useUmami } from '@/hooks/use-umami';
import type { AnalyticsEvent } from '@/types/analytics';
import { Link } from 'next-view-transitions';
import * as React from 'react';

type LinkProps = React.ComponentProps<typeof Link>;

export function TrackedLink({
    track,
    onClick,
    ...props
}: LinkProps & { track?: AnalyticsEvent }) {
    const { trackEvent } = useUmami();

    return (
        <Link
            {...props}
            onClick={(event) => {
                // 1. Fire the original onClick immediately so navigation isn't delayed
                onClick?.(event);

                // 2. Safely attempt to track the event in the background
                if (track) {
                    try {
                        trackEvent(track);
                    } catch (error) {
                        // Silently swallow the error (e.g., if blocked by an ad-blocker)
                        console.debug('Analytics blocked or failed:', error);
                    }
                }
            }}
        />
    );
}
