'use client';

import { githubConfig } from '@/config/GitHub';
import { ContributionItem } from '@/lib/github';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

const ActivityCalendar = dynamic(
    () => import('react-activity-calendar').then((mod) => mod.ActivityCalendar),
    { ssr: false },
);

export default function GitHubCalendarClient({
    contributions,
}: {
    contributions: ContributionItem[];
}) {
    const { resolvedTheme } = useTheme();

    return (
        <ActivityCalendar
            data={contributions}
            blockSize={12}
            blockMargin={4}
            fontSize={githubConfig.fontSize}
            colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
            maxLevel={githubConfig.maxLevel}
            theme={githubConfig.theme}
        />
    );
}
