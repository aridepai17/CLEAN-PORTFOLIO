import { about } from './About';
import { heroConfig } from './Hero';

export interface PageMeta {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    twitterCard?: 'summary' | 'summary_large_image';
}

export const siteConfig = {
    name: heroConfig.name,
    title: 'Advaith R Pai | Software Engineer',
    description:
        'Software Engineer building AI-powered, full-stack applications with modern web technologies.',
    url:
        process.env.NEXT_PUBLIC_URL ??
        'https://advaithrpai-portfolio.vercel.app',
    ogImage: '/meta/opengraph-image.png',
    author: {
        name: about.name,
        twitter: '@rpaiv17',
        github: 'aridepai17',
        linkedin: 'advaith-r-pai',
        email: 'advaithdepai26@gmail.com',
    },
    keywords: [
        'Advaith R Pai',
        'Software Engineer',
        'Full Stack Developer',
        'Artificial Intelligence',
        'Machine Learning',
        'Portfolio',
        'Next.js',
        'React',
        'TypeScript',
        'Python',
        'JavaScript',
        'Node.js',
        'MongoDB',
        'Tailwind CSS',
    ],
};

export const pageMetadata: Record<string, PageMeta> = {
    '/': {
        title: `${heroConfig.name} - ${heroConfig.title}`,
        description:
            'Software Engineer building AI-powered, full-stack applications with modern web technologies. Explore my projects, experience, and technical work.',
        keywords: [
            'Advaith R Pai',
            'Software Engineer',
            'Portfolio',
            'Full Stack Developer',
            'Artificial Intelligence',
            'Projects',
        ],
        ogImage: '/meta/hero.png',
        twitterCard: 'summary_large_image',
    },

    '/contact': {
        title: 'Contact | Advaith R Pai',
        description:
            'Get in touch for software engineering opportunities, collaborations, internships, or project discussions.',
        keywords: ['contact', 'hire', 'collaboration', 'software engineer'],
        ogImage: '/assets/logo.jpg',
        twitterCard: 'summary',
    },

    '/work-experience': {
        title: 'Work Experience | Advaith R Pai',
        description:
            'Professional experience, internships, research, and technical contributions.',
        keywords: [
            'work experience',
            'internship',
            'DRDO',
            'software engineer',
        ],
        ogImage: '/meta/work.png',
        twitterCard: 'summary_large_image',
    },

    '/projects': {
        title: 'Projects | Advaith R Pai',
        description:
            'Explore AI-powered, full-stack, and data-driven applications built with Next.js, React, TypeScript, Python, and modern cloud technologies.',
        keywords: [
            'projects',
            'AI',
            'full stack',
            'Next.js',
            'React',
            'portfolio',
        ],
        ogImage: '/meta/projects.png',
        twitterCard: 'summary_large_image',
    },

    '/blog': {
        title: 'Blog | Advaith R Pai',
        description:
            'Technical articles, development notes, tutorials, and engineering insights.',
        keywords: ['blog', 'software engineering', 'AI', 'web development'],
        ogImage: '/meta/blogs.png',
        twitterCard: 'summary_large_image',
    },

    '/resume': {
        title: 'Resume | Advaith R Pai',
        description: `View and download ${heroConfig.name}'s resume and professional CV.`,
        keywords: ['resume', 'CV', 'software engineer', 'skills'],
        ogImage: '/meta/resume.png',
        twitterCard: 'summary',
    },
};

export function getPageMetadata(pathname: string): PageMeta {
    return pageMetadata[pathname] || pageMetadata['/'];
}

export function generateMetadata(pathname: string) {
    const pageMeta = getPageMetadata(pathname);

    return {
        metadataBase: new URL(siteConfig.url),
        title: pageMeta.title,
        description: pageMeta.description,
        keywords: pageMeta.keywords?.join(', '),

        authors: [{ name: siteConfig.author.name }],
        creator: siteConfig.author.name,

        openGraph: {
            type: 'website',
            url: `${siteConfig.url}${pathname}`,
            title: pageMeta.title,
            description: pageMeta.description,
            siteName: heroConfig.name,
            images: [
                {
                    url: pageMeta.ogImage || siteConfig.ogImage,
                    width: 1200,
                    height: 630,
                    alt: pageMeta.title,
                },
            ],
        },

        twitter: {
            card: pageMeta.twitterCard || 'summary_large_image',
            title: pageMeta.title,
            description: pageMeta.description,
            creator: siteConfig.author.twitter,
            images: [pageMeta.ogImage || siteConfig.ogImage],
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        alternates: {
            canonical: `${siteConfig.url}${pathname}`,
        },
    };
}
