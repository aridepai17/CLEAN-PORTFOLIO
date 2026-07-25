import React from 'react';

export default function Container({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={[
                'animate-fade-in-blur container mx-auto max-w-3xl px-4',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
            {...props}
        >
            {children}
        </div>
    );
}
