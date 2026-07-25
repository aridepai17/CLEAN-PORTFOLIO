import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { TrackedLink } from '../common/TrackedLink';
import ArrowLeft from '../svgs/ArrowLeft';
import ArrowUUpRight from '../svgs/ArrowUUpRight';

interface ProjectNavigationProps {
    previous: { title: string; slug: string } | null;
    next: { title: string; slug: string } | null;
}

export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
    if (!previous && !next) {
        return null;
    }

    const hasBoth = previous && next;
    const gridCols = hasBoth ? 'md:grid-cols-2' : 'grid-cols-1';

    return (
        <div className="space-y-6">
            <Separator />

            <div className={`grid gap-4 ${gridCols}`}>
                {/* Previous Project */}
                {previous && (
                    <Button
                        variant="outline"
                        asChild
                        className="group h-auto w-full justify-start p-4 text-left"
                    >
                        <TrackedLink
                            href={`/projects/${previous.slug}`}
                            track={{
                                name: 'button_click',
                                data: {
                                    buttonId: 'project_nav_previous',
                                    section: 'project_detail',
                                    action: previous.slug,
                                },
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                                <div>
                                    <div className="text-muted-foreground text-xs">
                                        Previous Project
                                    </div>
                                    <div className="font-medium">
                                        {previous.title}
                                    </div>
                                </div>
                            </div>
                        </TrackedLink>
                    </Button>
                )}

                {/* Next Project */}
                {next && (
                    <Button
                        variant="outline"
                        asChild
                        className="group h-auto w-full justify-end p-4 text-right"
                    >
                        <TrackedLink
                            href={`/projects/${next.slug}`}
                            track={{
                                name: 'button_click',
                                data: {
                                    buttonId: 'project_nav_next',
                                    section: 'project_detail',
                                    action: next.slug,
                                },
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div>
                                    <div className="text-muted-foreground text-xs">
                                        Next Project
                                    </div>
                                    <div className="font-medium">
                                        {next.title}
                                    </div>
                                </div>
                                <ArrowUUpRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </TrackedLink>
                    </Button>
                )}
            </div>
        </div>
    );
}
