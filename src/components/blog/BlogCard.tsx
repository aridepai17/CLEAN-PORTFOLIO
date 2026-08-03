import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { BlogPostPreview } from '@/types/blog';
import Image from 'next/image';

import { TrackedLink } from '../common/TrackedLink';
import ArrowRight from '../svgs/ArrowRight';
import Calender from '../svgs/Calender';

interface BlogCardProps {
    post: BlogPostPreview;
}

export function BlogCard({ post }: BlogCardProps) {
    const { slug, frontmatter } = post;
    const { title, description, image, tags, date } = frontmatter;

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <Card className="group border-border/50 bg-card hover:border-border h-full w-full overflow-hidden rounded-xl border p-0 shadow-sm transition-all duration-300 hover:shadow-md">
            <CardHeader className="p-0">
                <div className="relative aspect-video overflow-hidden">
                    <TrackedLink
                        href={`/blog/${slug}`}
                        /* 💡 THE FIX: Make the link relative and block so the image can fill it */
                        className="relative block h-full w-full"
                        track={{
                            name: 'button_click',
                            data: {
                                buttonId: 'blog_card_image',
                                section: 'blog_card',
                                action: slug,
                            },
                        }}
                    >
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </TrackedLink>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <TrackedLink
                        href={`/blog/${slug}`}
                        track={{
                            name: 'button_click',
                            data: {
                                buttonId: 'blog_card_title',
                                section: 'blog_card',
                                action: slug,
                            },
                        }}
                    >
                        <h3 className="font-instrument text-foreground group-hover:text-primary line-clamp-2 text-3xl leading-[1.1] font-normal tracking-tight transition-colors">
                            {title}
                        </h3>
                    </TrackedLink>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <div className="flex w-full flex-col space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 3).map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="font-mono text-[10px] tracking-wider uppercase"
                            >
                                {tag}
                            </Badge>
                        ))}
                        {tags.length > 3 && (
                            <Badge
                                variant="outline"
                                className="font-mono text-[10px] tracking-wider uppercase"
                            >
                                +{tags.length - 3}
                            </Badge>
                        )}
                    </div>

                    <div className="border-border/50 flex items-center justify-between gap-2 border-t pt-4">
                        <time
                            className="text-muted-foreground flex items-center gap-2 font-mono text-xs tracking-wider uppercase"
                            dateTime={date}
                        >
                            <Calender className="size-3.5" /> {formattedDate}
                        </time>

                        <TrackedLink
                            href={`/blog/${slug}`}
                            className="font-hanken-grotesk text-foreground group/link hover:text-primary flex items-center justify-end gap-1.5 text-sm font-semibold transition-colors"
                            track={{
                                name: 'button_click',
                                data: {
                                    buttonId: 'blog_card_read_more',
                                    section: 'blog_card',
                                    action: slug,
                                },
                            }}
                        >
                            Read
                            <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-1" />
                        </TrackedLink>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
