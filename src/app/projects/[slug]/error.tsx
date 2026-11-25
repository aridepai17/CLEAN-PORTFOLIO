'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        if (!logged) {
            console.error('[Project Case Study Error]', error);
            setLogged(true);
        }
    }, [error, logged]);

    return (
        <div
            className={cn(
                'bg-background/80 fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm',
            )}
        >
            <div
                className={cn(
                    'border-border/50 bg-background max-w-md rounded-xl border p-8 text-center shadow-2xl',
                )}
            >
                <h2 className="font-display mb-4 text-2xl font-normal">
                    Project not available
                </h2>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {error.message}
                </p>
                <Button onClick={reset} className="w-full">
                    Try again
                </Button>
            </div>
        </div>
    );
}
