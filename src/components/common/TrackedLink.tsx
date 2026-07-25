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
                if (track) {
                    trackEvent(track);
                }
                onClick?.(event);
            }}
        />
    );
}
