import { githubConfig } from '@/config/GitHub';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(
            `${githubConfig.apiUrl}/${githubConfig.username}.json`,
            {
                // Cache the result for 1 hour (3600 seconds)
                next: { revalidate: 3600 },
            },
        );

        if (!response.ok) {
            throw new Error(
                `GitHub API responded with status: ${response.status}`,
            );
        }

        const data = await response.json();

        return NextResponse.json(data, {
            headers: {
                'Cache-Control':
                    'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('Error fetching GitHub data on server:', error);
        return NextResponse.json(
            { error: 'Failed to fetch GitHub contributions' },
            { status: 500 },
        );
    }
}
