import { getGithubContributions } from '@/lib/github';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const contributions = await getGithubContributions();

        if (!contributions) {
            return NextResponse.json(
                { error: 'Failed to fetch or parse GitHub contributions' },
                { status: 502 },
            );
        }

        return NextResponse.json({ contributions });
    } catch (error) {
        console.error('Failed to securely fetch native GitHub data:', error);
        return NextResponse.json(
            { error: 'Internal server error processing GitHub timeline' },
            { status: 500 },
        );
    }
}
