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
        <article className="font-instrument mx-auto max-w-4xl">
            <header className="mb-12 space-y-8">
                <div className="border-border/50 w-full overflow-hidden rounded-lg border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={image}
                        alt={title}
                        width={1920}
                        height={1080}
                        className="h-auto w-full object-contain"
                    />
                </div>

                <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="font-mono text-xs tracking-wider uppercase"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <h1 className="font-instrument text-foreground text-5xl leading-[1.1] font-normal tracking-tight lg:text-7xl">
                        {title}
                    </h1>

                    <p className="font-instrument text-muted-foreground text-xl leading-relaxed italic lg:text-2xl">
                        {description}
                    </p>

                    <div className="text-muted-foreground flex items-center gap-2 font-mono text-sm tracking-wider uppercase">
                        <Calender className="size-4" />
                        <time dateTime={date}>{formattedDate}</time>
                    </div>
                </div>
            </header>

            <div className="prose prose-neutral dark:prose-invert prose-lg font-instrument prose-p:text-foreground/80 prose-p:leading-[1.8] prose-headings:font-instrument prose-headings:font-bold prose-h2:tracking-normal prose-h2:text-4xl prose-h2:mt-12 prose-h3:text-3xl prose-blockquote:font-instrument prose-blockquote:text-xl prose-blockquote:italic prose-li:leading-[1.8] prose-strong:font-semibold prose-strong:text-foreground max-w-none">
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
