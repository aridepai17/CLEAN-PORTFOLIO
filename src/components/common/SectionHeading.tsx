import { cn } from '@/lib/utils';
import React from 'react';

// Extending HTMLAttributes allows you to pass id, className, and other standard props
interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
    subHeading: string;
    heading: string;
}

export default function SectionHeading({
    subHeading,
    heading,
    className,
    id,
    ...props
}: SectionHeadingProps) {
    return (
        <div
            id={id}
            // scroll-mt-24 adds 6rem (96px) of invisible padding above the element when navigating to its ID
            className={cn('scroll-mt-24', className)}
            {...props}
        >
            <p className="text-secondary text-sm">{subHeading}</p>
            <h2 className="text-2xl font-bold">{heading}</h2>
        </div>
    );
}
