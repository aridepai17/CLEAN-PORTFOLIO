import { getPublishedBlogPosts } from '@/lib/blog';
import { getPublishedProjectCaseStudies } from '@/lib/project';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://advaithrpai.tech';

    // 1. Core static routes across your portfolio
    const staticRoutes = [
        '',
        '/projects',
        '/blog',
        '/journey',
        '/resume',
        '/work-experience',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // 2. Dynamic Project Routes (MDX)
    const projects = getPublishedProjectCaseStudies();
    const projectRoutes = projects.map((p) => ({
        url: `${baseUrl}/projects/${p.slug}`,
        lastModified: new Date(), // Or new Date(p.frontmatter.date) if your project frontmatter has it
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // 3. Dynamic Blog Routes (MDX)
    const blogs = getPublishedBlogPosts();
    const blogRoutes = blogs.map((b) => ({
        url: `${baseUrl}/blog/${b.slug}`,
        lastModified: new Date(b.frontmatter.date), // Pulling the specific post date from blog frontmatter
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
