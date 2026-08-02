import { buttonVariants } from '@/components/ui/button-variants';

import Reveal from '../common/Reveal';
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

    return (
        <Reveal>
            <div className="space-y-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                    {/* Previous Project */}
                    {previous ? (
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
                            className={` ${buttonVariants({ variant: 'outline' })} group hover:bg-muted/40 h-auto w-full justify-start rounded-xl p-6 text-left transition-colors`}
                        >
                            <div className="flex items-center gap-4">
                                <ArrowLeft className="text-muted-foreground size-5 transition-transform group-hover:-translate-x-1" />
                                <div>
                                    <div className="text-muted-foreground mb-1 text-xs font-semibold tracking-widest uppercase">
                                        Previous
                                    </div>
                                    <div className="font-sfProDisplayBlack text-lg tracking-tight">
                                        {previous.title}
                                    </div>
                                </div>
                            </div>
                        </TrackedLink>
                    ) : (
                        <div className="hidden md:block" />
                    )}

                    {/* Next Project */}
                    {next ? (
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
                            className={` ${buttonVariants({ variant: 'outline' })} group hover:bg-muted/40 h-auto w-full justify-end rounded-xl p-6 text-right transition-colors`}
                        >
                            <div className="flex items-center gap-4">
                                <div>
                                    <div className="text-muted-foreground mb-1 text-xs font-semibold tracking-widest uppercase">
                                        Next
                                    </div>
                                    <div className="font-sfProDisplayBlack text-lg tracking-tight">
                                        {next.title}
                                    </div>
                                </div>
                                <ArrowUUpRight className="text-muted-foreground size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>
                        </TrackedLink>
                    ) : (
                        <div className="hidden md:block" />
                    )}
                </div>
            </div>
        </Reveal>
    );
}
