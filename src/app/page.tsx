import Container from '@/components/common/Container';
import Reveal from '@/components/common/Reveal';
import About from '@/components/landing/About';
import Blog from '@/components/landing/Blog';
import CTA from '@/components/landing/CTA';
import Experience from '@/components/landing/Experience';
import GitHub from '@/components/landing/GitHub';
import Hero from '@/components/landing/Hero';
import Journey from '@/components/landing/Journey';
import Work from '@/components/landing/Projects';
import { getPublishedBlogPosts } from '@/lib/blog';
import React from 'react';

export default function page() {
    const posts = getPublishedBlogPosts();

    return (
        <Container className="min-h-screen py-16">
            <Hero />
            <Reveal>
                <Experience />
            </Reveal>
            <Reveal>
                <Work />
            </Reveal>
            <Reveal>
                <About />
            </Reveal>
            <Reveal>
                <GitHub />
            </Reveal>
            <Reveal>
                <Blog posts={posts} />
            </Reveal>
            <Reveal>
                <CTA />
            </Reveal>
            <Reveal>
                <Journey />
            </Reveal>
        </Container>
    );
}
