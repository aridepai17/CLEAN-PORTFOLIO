import { BlogContent } from '@/components/blog/BlogContent';
import { BlogList } from '@/components/blog/BlogList';
import Container from '@/components/common/Container';
import { FloatingToC } from '@/components/common/FloatingToC';
import FontSizeControls from '@/components/common/FontSizeControls';
import ArrowLeft from '@/components/svgs/ArrowLeft';
import { buttonVariants } from '@/components/ui/button-variants';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/Meta';
import {
    getBlogPostBySlug,
    getBlogPostSlugs,
    getRelatedPosts,
} from '@/lib/blog';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
    const slugs = getBlogPostSlugs();

    return slugs.map((slug) => ({
        slug,
    }));
}

export const dynamicParams = false;

// Generate metadata for each blog post
export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post || !post.frontmatter.isPublished) {
        return {
            title: 'Post not found',
        };
    }

    const { title, description, image } = post.frontmatter;

    return {
        metadataBase: new URL(siteConfig.url),
        title,
        description,
        openGraph: {
            title,
            description,
            images: [image],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post || !post.frontmatter.isPublished) {
        notFound();
    }
    const relatedPosts = await getRelatedPosts(slug, 3);

    return (
        <>
            <FloatingToC />
            <Container className="py-16">
                <div className="space-y-12">
                    <div>
                        <Link
                            href="/blog"
                            className={`${buttonVariants({ variant: 'ghost' })} group`}
                        >
                            <ArrowLeft className="size-4" />
                            <span>Back to Blog</span>
                        </Link>
                    </div>

                    <div className="prose prose-lg md:prose-xl dark:prose-invert font-instrument prose-headings:font-instrument max-w-none">
                        <BlogContent
                            frontmatter={post.frontmatter}
                            content={post.content}
                        />
                    </div>

                    {/* Related Posts Section */}
                    {relatedPosts.length > 0 && (
                        <div className="space-y-6">
                            <Separator />
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold">
                                    Related Posts
                                </h2>
                                <BlogList posts={relatedPosts} />
                            </div>
                        </div>
                    )}

                    <div className="text-center">
                        <Link
                            href="/blog"
                            className={buttonVariants({ size: 'lg' })}
                        >
                            View All Blogs
                        </Link>
                    </div>
                </div>
            </Container>
            <FontSizeControls />
        </>
    );
}
