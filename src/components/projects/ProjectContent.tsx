import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProjectCaseStudyFrontmatter } from '@/types/project';
import rehypeHighlight from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import rehypeSlug from 'rehype-slug';

import { TrackedLink } from '../common/TrackedLink';
import GitHubIcon from '../svgs/GitHubIcon';
import Website from '../svgs/Website';
import { ProjectComponents } from './ProjectComponents';

interface ProjectContentProps {
    frontmatter: ProjectCaseStudyFrontmatter;
    content: string;
}

export function ProjectContent({ frontmatter, content }: ProjectContentProps) {
    const {
        title,
        description,
        image,
        technologies,
        github,
        live,
        timeline,
        role,
        team,
        status,
        challenges,
        learnings,
    } = frontmatter;

    const statusVariant =
        status === 'completed'
            ? 'default'
            : status === 'in-progress'
              ? 'secondary'
              : 'outline';

    return (
        <article className="font-sfProDisplayBlack mx-auto max-w-3xl">
            <header className="mb-12 space-y-8">
                <div className="space-y-4 text-center md:text-left">
                    {/* Status and All Tech Badges (No truncation) */}
                    <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                        <Badge
                            variant={statusVariant}
                            className="text-xs font-bold tracking-widest uppercase"
                        >
                            {status}
                        </Badge>
                        {technologies.map((tech) => (
                            <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs font-bold"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>

                    <h1 className="font-sfProDisplayBlack text-4xl leading-tight tracking-tight lg:text-5xl">
                        {title}
                    </h1>

                    <p className="text-muted-foreground text-xl leading-relaxed md:text-2xl">
                        {description}
                    </p>
                </div>

                <div className="border-border/50 relative aspect-video overflow-hidden rounded-xl border shadow-2xl">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Separated Metadata & Isolated Action Buttons */}
                <div className="border-border/40 flex flex-col gap-6 border-y py-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-8 md:gap-12">
                        <div className="border-primary/20 flex flex-col gap-1 border-l-2 pl-4">
                            <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                                Timeline
                            </span>
                            <span className="text-sm font-medium">
                                {timeline}
                            </span>
                        </div>
                        <div className="border-primary/20 flex flex-col gap-1 border-l-2 pl-4">
                            <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                                Role
                            </span>
                            <span className="text-sm font-medium">{role}</span>
                        </div>
                        {team && (
                            <div className="border-primary/20 flex flex-col gap-1 border-l-2 pl-4">
                                <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                                    Team
                                </span>
                                <span className="text-sm font-medium">
                                    {team}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex shrink-0 items-center gap-3 pl-4 sm:justify-end sm:pl-0">
                        {live && (
                            <Button size="sm" asChild>
                                <TrackedLink
                                    href={live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    track={{
                                        name: 'external_link_click',
                                        data: {
                                            url: live,
                                            text: 'Live Demo',
                                            location: 'project_detail',
                                        },
                                    }}
                                >
                                    <Website className="mr-2 size-4" /> Live
                                </TrackedLink>
                            </Button>
                        )}
                        {github && (
                            <Button size="sm" variant="outline" asChild>
                                <TrackedLink
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    track={{
                                        name: 'external_link_click',
                                        data: {
                                            url: github,
                                            text: 'Source Code',
                                            location: 'project_detail',
                                        },
                                    }}
                                >
                                    <GitHubIcon className="mr-2 size-4" />{' '}
                                    Source
                                </TrackedLink>
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {(challenges?.length || learnings?.length) && (
                <div className="mb-12 grid gap-6 md:grid-cols-2">
                    {challenges && challenges.length > 0 && (
                        <div className="glass-panel p-6">
                            <h3 className="font-sfProDisplayBlack mb-4 flex items-center gap-2 text-lg">
                                The Challenge
                            </h3>
                            <ul className="space-y-3">
                                {challenges.map((challenge, index) => (
                                    <li
                                        key={index}
                                        className="text-muted-foreground flex items-start gap-3 text-sm leading-relaxed"
                                    >
                                        <span className="bg-primary/50 mt-1.5 flex size-1.5 shrink-0 rounded-full" />
                                        {challenge}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {learnings && learnings.length > 0 && (
                        <div className="glass-panel p-6">
                            <h3 className="font-sfProDisplayBlack mb-4 flex items-center gap-2 text-lg">
                                Key Learnings
                            </h3>
                            <ul className="space-y-3">
                                {learnings.map((learning, index) => (
                                    <li
                                        key={index}
                                        className="text-muted-foreground flex items-start gap-3 text-sm leading-relaxed"
                                    >
                                        <span className="bg-primary/50 mt-1.5 flex size-1.5 shrink-0 rounded-full" />
                                        {learning}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <div className="prose prose-neutral dark:prose-invert max-w-none text-lg leading-relaxed">
                <MDXRemote
                    source={content}
                    components={ProjectComponents}
                    options={{
                        mdxOptions: {
                            rehypePlugins: [
                                rehypeSlug,
                                [
                                    rehypeHighlight,
                                    {
                                        themes: {
                                            dark: 'github-dark',
                                            light: 'github-light',
                                        },
                                    },
                                ],
                            ],
                        },
                    }}
                />
            </div>
        </article>
    );
}
