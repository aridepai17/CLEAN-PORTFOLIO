import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/', // Keeps bots out of your backend routes
                '/_next/image', // Prevents duplicate indexing of Next.js dynamic images
                '/private/', // Optional: Any hidden folders you don't want indexed
            ],
        },
        sitemap: 'https://advaithrpai.tech/sitemap.xml',
        host: 'https://advaithrpai.tech', // Reinforces your canonical domain
    };
}
