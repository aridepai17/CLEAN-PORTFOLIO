'use client';

import { githubConfig } from '@/config/GitHub';
import { type ContributionItem } from '@/lib/github';
import { useEffect, useState } from 'react';

import Container from '../common/Container';
import { TrackedLink } from '../common/TrackedLink';
import GithubIcon from '../svgs/GitHubIcon';
import { buttonVariants } from '../ui/button-variants';
import GitHubCalendarClient from './GitHubCalendarClient';

// Helper function to filter contributions to past year
function filterLastYear(contributions: ContributionItem[]): ContributionItem[] {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return contributions.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= oneYearAgo;
    });
}

export default function GitHub() {
    const [contributions, setContributions] = useState<ContributionItem[]>([]);
    const [totalContributions, setTotalContributions] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await fetch('/api/github');

                // Graceful check instead of throwing a raw runtime error
                if (!response.ok) {
                    console.error(
                        `GitHub API route returned status: ${response.status}`,
                    );
                    setHasError(true);
                    setIsLoading(false);
                    return;
                }

                // The API route now uses lib/github.ts, returning a pre-flattened and mapped array
                const data: { contributions?: ContributionItem[] } =
                    await response.json();

                if (data?.contributions && Array.isArray(data.contributions)) {
                    if (data.contributions.length > 0) {
                        // Filter to show only the past year to match the calendar
                        const filteredContributions = filterLastYear(
                            data.contributions,
                        );

                        // Calculate total from the same filtered range as the calendar
                        const total = filteredContributions.reduce(
                            (sum, item) => sum + item.count,
                            0,
                        );
                        setTotalContributions(total);
                        setContributions(filteredContributions);
                    } else {
                        setHasError(true);
                    }
                } else {
                    setHasError(true);
                }
            } catch (err) {
                console.error('Failed to fetch GitHub contributions:', err);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <Container className="mt-20">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-foreground text-2xl font-bold">
                            {githubConfig.title}
                        </h2>
                        <p className="text-muted-foreground text-sm">
                            <b>{githubConfig.username}</b>&apos;s{' '}
                            {githubConfig.subtitle}
                        </p>
                        {!isLoading && !hasError && totalContributions > 0 && (
                            <p className="text-primary mt-1 text-sm font-medium">
                                Past year:{' '}
                                <span className="font-black">
                                    {totalContributions.toLocaleString()}
                                </span>{' '}
                                contributions
                            </p>
                        )}
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"></div>
                            <p className="text-muted-foreground text-sm">
                                {githubConfig.loadingState.description}
                            </p>
                        </div>
                    </div>
                ) : hasError || contributions.length === 0 ? (
                    <div className="text-muted-foreground relative mt-8 rounded-xl border bg-white/80 p-8 text-center backdrop-blur-sm dark:border-white/20 dark:bg-black/60">
                        <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                            <GithubIcon className="h-8 w-8" />
                        </div>
                        <p className="mb-2 font-medium">
                            {githubConfig.errorState.title}
                        </p>
                        <p className="mb-4 text-sm">
                            {githubConfig.errorState.description}
                        </p>
                        <TrackedLink
                            href={`https://github.com/${githubConfig.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            track={{
                                name: 'external_link_click',
                                data: {
                                    url: `https://github.com/${githubConfig.username}`,
                                    text: githubConfig.errorState.buttonText,
                                    location: 'github_section',
                                },
                            }}
                            className={buttonVariants({ variant: 'outline' })}
                        >
                            <GithubIcon className="h-4 w-4" />
                            {githubConfig.errorState.buttonText}
                        </TrackedLink>
                    </div>
                ) : (
                    <div className="relative mt-8 overflow-hidden rounded-xl border bg-white/80 p-6 backdrop-blur-sm dark:border-white/20 dark:bg-black/60">
                        {/* The new client component takes over rendering and theme detection */}
                        <GitHubCalendarClient contributions={contributions} />
                    </div>
                )}
            </div>
        </Container>
    );
}
