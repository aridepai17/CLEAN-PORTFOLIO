import { cn } from '@/lib/utils';

export default function Loading() {
    return (
        <div
            className={cn(
                'bg-background/80 fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm',
            )}
        >
            <div
                className={cn(
                    'border-border/50 bg-background flex max-w-md flex-col items-center gap-3 rounded-xl border p-8 text-center shadow-2xl',
                )}
            >
                <div
                    className={cn(
                        'border-border/50 border-t-primary h-10 w-10 animate-spin rounded-full border-4',
                    )}
                />
                <p className="text-muted-foreground text-sm">Loading project</p>
            </div>
        </div>
    );
}
