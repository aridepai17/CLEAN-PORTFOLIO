import { cn } from '@/lib/utils';

export default function Loading() {
    return (
        <div
            className={cn(
                'bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm',
            )}
        >
            <div className="flex flex-col items-center gap-3">
                <div
                    className={cn(
                        'border-border/50 border-t-primary h-10 w-10 animate-spin rounded-full border-4',
                    )}
                />
                <p className="text-muted-foreground text-sm">Loading</p>
            </div>
        </div>
    );
}
