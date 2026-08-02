import { Badge } from '@/components/ui/badge';
import { BlogFrontmatter } from '@/types/blog';
import rehypeHighlight from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
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
            <header className="mb-8 space-y-6">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <h1 className="font-instrument text-4xl leading-tight font-normal tracking-tight lg:text-5xl">
                        {title}
                    </h1>

                    <p className="text-muted-foreground legacy-serif-style text-xl italic">
                        {description}
                    </p>

                    <div className="text-muted-foreground flex items-center gap-2 font-sans text-sm">
                        <Calender className="size-5" />
                        <time dateTime={date}>{formattedDate}</time>
                    </div>
                </div>
            </header>

            <div className="prose prose-neutral dark:prose-invert prose-headings:font-instrument prose-p:leading-relaxed max-w-none">
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
