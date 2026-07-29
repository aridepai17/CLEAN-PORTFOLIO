import { githubConfig } from '@/config/GitHub';

export type ContributionItem = {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
};

interface GraphQLContributionDay {
    contributionCount: number;
    date: string;
    contributionLevel: string;
}

interface GraphQLContributionWeek {
    contributionDays: GraphQLContributionDay[];
}

export async function getGithubContributions(): Promise<
    ContributionItem[] | null
> {
    const token = process.env.GITHUB_ACCESS_TOKEN;
    if (!token) {
        console.error(
            'GITHUB_ACCESS_TOKEN is missing in environment variables',
        );
        return null;
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
            console.error(
                `GitHub GraphQL API responded with status: ${response.status}`,
            );
            return null;
        }

        const json = await response.json();
        const weeks =
            json.data?.user?.contributionsCollection?.contributionCalendar
                ?.weeks;
        if (!weeks || !Array.isArray(weeks)) {
            console.error('Malformed calendar payload received from GitHub');
            return null;
        }

        const contributionLevelMap = {
            NONE: 0,
            FIRST_QUARTILE: 1,
            SECOND_QUARTILE: 2,
            THIRD_QUARTILE: 3,
            FOURTH_QUARTILE: 4,
        } as const;

        const processedContributions: ContributionItem[] = [];

        // Loop execution cleanly bound to explicit payload interfaces
        weeks.forEach((week: GraphQLContributionWeek) => {
            if (week?.contributionDays) {
                week.contributionDays.forEach((day: GraphQLContributionDay) => {
                    processedContributions.push({
                        date: String(day.date),
                        count: Number(day.contributionCount || 0),
                        level: (contributionLevelMap[
                            day.contributionLevel as keyof typeof contributionLevelMap
                        ] || 0) as ContributionItem['level'],
                    });
                });
            }
        });

        return processedContributions;
    } catch (error) {
        console.error(
            'Exception occurred during GitHub GraphQL pipeline:',
            error,
        );
        return null;
    }
}
