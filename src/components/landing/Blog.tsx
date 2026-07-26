'use client';

import { BlogPostPreview } from '@/types/blog';
import React from 'react';

import { BlogCard } from '../blog/BlogCard';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { TrackedLink } from '../common/TrackedLink';
import { buttonVariants } from '../ui/button-variants';

interface BlogProps {
    posts: BlogPostPreview[];
}

export default function Blog({ posts }: BlogProps) {
    return (
        <Container className="mt-20">
            <SectionHeading subHeading="Featured" heading="Blogs" />
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {posts.slice(0, 2).map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>
            <div className="mt-8 flex justify-center">
                <TrackedLink
                    href="/blog"
                    track={{
                        name: 'button_click',
                        data: { buttonId: 'show_all_blogs', section: 'blog' },
                    }}
                    className={buttonVariants({ variant: 'outline' })}
                >
                    Show all blogs
                </TrackedLink>
            </div>
        </Container>
    );
}
