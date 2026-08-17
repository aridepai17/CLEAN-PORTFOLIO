import { getPublishedBlogPosts } from '@/lib/blog';
import { getPublishedProjectCaseStudies } from '@/lib/project';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://advaithrpai.tech';

    // 1. Core static routes across your portfolio
    const staticRoutes: MetadataRoute.Sitemap = [
        '',
        '/projects',
        '/blog',
        '/journey',
        '/resume',
        '/work-experience',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // 2. Dynamic Project Routes (MDX)
    const projects = getPublishedProjectCaseStudies();
    const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
        url: `${baseUrl}/projects/${p.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // 3. Dynamic Blog Routes (MDX)
    const blogs = getPublishedBlogPosts();
    const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => {
        // Safely parse and validate the date
        const parsedDate = b.frontmatter.date
            ? new Date(b.frontmatter.date)
            : undefined;
        const isValidDate = parsedDate && !isNaN(parsedDate.getTime());

        return {
            url: `${baseUrl}/blog/${b.slug}`,
            lastModified: isValidDate ? parsedDate : undefined,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        };
    });

    return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
