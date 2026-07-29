import Container from '@/components/common/Container';
import Reveal from '@/components/common/Reveal';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { getAllTags, getPublishedBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { BlogPageClient } from './BlogPageClient';

export const generateMetadata = (): Metadata => {
    const metadata = getMetadata('/blog');
    return {
        ...metadata,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            }['googleBot'],
        },
    };
};

function BlogPageLoading() {
    return (
        <Container className="py-16">
            <Reveal>
                <div className="space-y-8">
                    <div className="space-y-4 text-center">
                        <Skeleton className="mx-auto h-12 w-32" />
                        <Skeleton className="mx-auto h-6 w-96" />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <Skeleton className="h-6 w-32" />
                        <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-8 w-20" />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Skeleton className="h-8 w-48" />
                        <div className="space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Reveal>
        </Container>
    );
}

export default function BlogPage() {
    const allPosts = getPublishedBlogPosts();
    const allTags = getAllTags();

    return (
        <Suspense fallback={<BlogPageLoading />}>
            <BlogPageClient initialPosts={allPosts} initialTags={allTags} />
        </Suspense>
    );
}
