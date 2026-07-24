import Calender from '@/components/svgs/Calender';
import React from 'react';

export type JourneyItem = {
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
};

export const journeyItems: JourneyItem[] = [
    {
        name: 'My Journey',
        description:
            'A timeline of my education, experience, projects, and key milestones.',
        icon: Calender,
        href: '/journey',
    },
];

const journeyConfig = {
    journeyItems,
};

export default journeyConfig;
