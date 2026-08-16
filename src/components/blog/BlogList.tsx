import { BlogPostPreview } from '@/types/blog';

import { BlogCard } from './BlogCard';

interface BlogListProps {
    posts: BlogPostPreview[];
    className?: string;
}

export function BlogList({ posts, className = '' }: BlogListProps) {
    if (posts.length === 0) {
        return (
            <div className="glass-panel flex min-h-[40vh] flex-col items-center justify-center p-8 text-center md:p-12">
                <div className="space-y-3">
                    <h2 className="font-display text-foreground text-3xl font-normal tracking-tight md:text-4xl">
                        No blog posts found
                    </h2>
                    <p className="text-muted-foreground font-sans text-base md:text-lg">
                        Check back later for new content!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}
        >
            {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
            ))}
        </div>
    );
}
