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
        <Container className="mt-32">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="space-y-2">
                        <h2 className="font-display text-foreground text-4xl font-normal tracking-tight lg:text-5xl">
                            {githubConfig.title}
                        </h2>
                        <p className="text-muted-foreground font-sans text-lg">
                            <span className="text-foreground font-semibold">
                                Advaith&apos;s
                            </span>
                            &apos;s {githubConfig.subtitle}
                        </p>
                    </div>

                    {!isLoading && !hasError && totalContributions > 0 && (
                        <div className="border-primary/20 bg-primary/5 text-primary inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 font-sans text-sm font-medium shadow-sm">
                            <div className="relative flex size-2">
                                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                                <span className="bg-primary relative inline-flex size-2 rounded-full"></span>
                            </div>
                            Past year:{' '}
                            <span className="font-bold">
                                {totalContributions.toLocaleString()}
                            </span>{' '}
                            contributions
                        </div>
                    )}
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="glass-panel mt-8 flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"></div>
                            <p className="text-muted-foreground font-sans text-sm">
                                {githubConfig.loadingState.description}
                            </p>
                        </div>
                    </div>
                ) : hasError || contributions.length === 0 ? (
                    <div className="glass-panel text-muted-foreground relative mt-8 p-12 text-center">
                        <div className="bg-muted mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                            <GithubIcon className="h-8 w-8" />
                        </div>
                        <h3 className="font-display text-foreground mb-2 text-2xl font-normal">
                            {githubConfig.errorState.title}
                        </h3>
                        <p className="mb-6 font-sans text-sm">
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
                            className={buttonVariants({ variant: 'default' })}
                        >
                            <GithubIcon className="mr-2 h-4 w-4" />
                            {githubConfig.errorState.buttonText}
                        </TrackedLink>
                    </div>
                ) : (
                    <div className="glass-panel relative mt-8 p-6 md:p-8">
                        {/* The new client component takes over rendering and theme detection */}
                        <GitHubCalendarClient contributions={contributions} />
                    </div>
                )}
            </div>
        </Container>
    );
}
