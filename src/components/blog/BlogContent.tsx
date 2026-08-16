import { Badge } from '@/components/ui/badge';
import { BlogFrontmatter } from '@/types/blog';
import rehypeHighlight from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import Calender from '../svgs/Calender';
import { BlogComponents } from './BlogComponents';

interface BlogContentProps {
    frontmatter: BlogFrontmatter;
    content: string;
}

export function BlogContent({ frontmatter, content }: BlogContentProps) {
    const { title, description, image, tags, date } = frontmatter;

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article className="mx-auto max-w-4xl font-sans">
            <header className="mb-12 space-y-8 md:mb-16 md:space-y-10">
                {/* Hero Image Container */}
                <div className="border-border/50 w-full overflow-hidden rounded-xl border shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={image}
                        alt={title}
                        width={1920}
                        height={1080}
                        className="h-auto w-full object-cover"
                    />
                </div>

                <div className="space-y-6 md:space-y-8">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="font-sans text-xs font-semibold tracking-wider uppercase"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Main Title */}
                    <h1 className="font-display text-foreground text-5xl leading-[1.1] font-normal tracking-tight lg:text-7xl">
                        {title}
                    </h1>

                    {/* Subtitle / Description */}
                    <p className="text-muted-foreground text-xl leading-relaxed md:text-2xl">
                        {description}
                    </p>

                    {/* Date Metadata */}
                    <div className="text-muted-foreground flex items-center gap-2 font-sans text-sm font-semibold tracking-wider uppercase">
                        <Calender className="size-4 shrink-0" />
                        <time dateTime={date}>{formattedDate}</time>
                    </div>
                </div>
            </header>

            {/* MDX Body - Delegating specific typography rules to BlogComponents.tsx */}
            <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
                <MDXRemote
                    source={content}
                    components={BlogComponents}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [
                                rehypeSlug,
                                [
                                    rehypeHighlight,
                                    {
                                        theme: 'github-dark',
                                        addLanguageClass: true,
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
