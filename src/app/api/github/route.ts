import { githubConfig } from '@/config/GitHub';
import { NextResponse } from 'next/server';

interface GraphQLContributionDay {
    contributionCount: number;
    date: string;
    contributionLevel: string;
}

interface GraphQLContributionWeek {
    contributionDays: GraphQLContributionDay[];
}

export async function GET() {
    const token = process.env.GITHUB_ACCESS_TOKEN;

    if (!token) {
        console.error('Missing GITHUB_ACCESS_TOKEN environment variable.');
        return NextResponse.json(
            { error: 'Server misconfiguration: Missing access token' },
            { status: 500 },
        );
    }

    const query = `
        query($userName: String!) {
            user(login: $userName) {
                contributionsCollection {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                                contributionLevel
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'User-Agent': 'Portfolio-App',
            },
            body: JSON.stringify({
                query,
                variables: { userName: githubConfig.username },
            }),
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            return NextResponse.json(
                {
                    error: `Official GitHub API responded with status: ${response.status}`,
                },
                { status: response.status },
            );
        }

        const json = await response.json();
        const weeks =
            json.data?.user?.contributionsCollection?.contributionCalendar
                ?.weeks;

        if (!weeks || !Array.isArray(weeks)) {
            return NextResponse.json(
                { error: 'Malformed payload received from GitHub GraphQL API' },
                { status: 502 },
            );
        }

        // Clean mapping using the strong layout interface instead of 'any'
        const contributions = weeks.map(
            (week: GraphQLContributionWeek) => week.contributionDays,
        );

        return NextResponse.json({ contributions });
    } catch (error) {
        console.error('Failed to securely fetch native GitHub data:', error);
        return NextResponse.json(
            { error: 'Internal server error processing GitHub timeline' },
            { status: 500 },
        );
    }
}
