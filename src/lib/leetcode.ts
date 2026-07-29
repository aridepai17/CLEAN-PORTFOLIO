import { leetCodeConfig } from '@/config/LeetCode';

export interface LeetCodeStats {
    username: string;
    ranking: number | null;
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    easyTotal: number;
    mediumSolved: number;
    mediumTotal: number;
    hardSolved: number;
    hardTotal: number;
}

const QUERY = `
query getUserProfile($username: String!) {
    matchedUser(username: $username) {
        username
        profile {
            ranking
        }
        submitStats: submitStatsGlobal {
            acSubmissionNum {
                difficulty
                count
            }
        }
    }
    allQuestionsCount {
        difficulty
        count
    }
}
`;

export async function getLeetCodeStats(): Promise<LeetCodeStats | null> {
    try {
        const response = await fetch(leetCodeConfig.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Referer: 'https://leetcode.com',
                'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)',
            },
            body: JSON.stringify({
                query: QUERY,
                variables: { username: leetCodeConfig.username },
            }),
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) return null;

        const json = await response.json();
        const matchedUser = json?.data?.matchedUser;
        const allQuestionsCount = json?.data?.allQuestionsCount;

        if (!matchedUser || !allQuestionsCount) return null;

        const solvedByDifficulty: Record<string, number> = {};
        for (const entry of matchedUser.submitStats.acSubmissionNum) {
            solvedByDifficulty[entry.difficulty] = entry.count;
        }

        const totalByDifficulty: Record<string, number> = {};
        for (const entry of allQuestionsCount) {
            totalByDifficulty[entry.difficulty] = entry.count;
        }

        return {
            username: matchedUser.username,
            ranking: matchedUser.profile?.ranking ?? null,
            totalSolved: solvedByDifficulty['All'] ?? 0,
            totalQuestions: totalByDifficulty['All'] ?? 0,
            easySolved: solvedByDifficulty['Easy'] ?? 0,
            easyTotal: totalByDifficulty['Easy'] ?? 0,
            mediumSolved: solvedByDifficulty['Medium'] ?? 0,
            mediumTotal: totalByDifficulty['Medium'] ?? 0,
            hardSolved: solvedByDifficulty['Hard'] ?? 0,
            hardTotal: totalByDifficulty['Hard'] ?? 0,
        };
    } catch (error) {
        console.error('Failed to fetch LeetCode stats:', error);
        return null;
    }
}
