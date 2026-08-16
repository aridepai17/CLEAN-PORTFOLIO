import { leetCodeConfig } from '@/config/LeetCode';
import { getLeetCodeStats } from '@/lib/leetcode';
import Link from 'next/link';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Button } from '../ui/button';
import LeetCodeChartClient from './LeetCodeChartClient';

export default async function LeetCode() {
    const stats = await getLeetCodeStats();

    return (
        <Container className="mt-32">
            <SectionHeading
                subHeading={leetCodeConfig.subtitle}
                heading={leetCodeConfig.title}
            />

            {!stats ? (
                <div className="glass-panel text-muted-foreground relative mt-12 p-12 text-center">
                    <p className="font-display text-foreground mb-2 text-2xl font-normal">
                        Unable to load LeetCode stats
                    </p>
                    <p className="mb-6 font-sans text-sm">
                        Check out my profile directly for the latest activity
                    </p>
                    <Button variant="default" asChild>
                        <Link
                            href={`https://leetcode.com/${leetCodeConfig.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on LeetCode
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="glass-panel relative mt-12 p-6 md:p-8">
                    {/* Top Meta Header */}
                    <div className="border-border/50 mb-8 flex flex-wrap items-end justify-between gap-4 border-b pb-6">
                        <div>
                            <p className="text-muted-foreground mb-2 font-sans text-xs font-semibold tracking-wider uppercase">
                                Platform Overview
                            </p>
                            <p className="font-display text-foreground text-3xl font-normal tracking-tight lg:text-4xl">
                                Active Problem Solver
                            </p>
                        </div>
                        {stats.ranking !== null && (
                            <div className="text-right">
                                <p className="text-muted-foreground mb-2 font-sans text-xs font-semibold tracking-wider uppercase">
                                    Global Rank
                                </p>
                                <p className="font-display text-primary text-3xl font-normal tracking-tight lg:text-4xl">
                                    #{stats.ranking.toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Donut Chart and Interactive Legend */}
                    <LeetCodeChartClient
                        totalSolved={stats.totalSolved}
                        easySolved={stats.easySolved}
                        mediumSolved={stats.mediumSolved}
                        hardSolved={stats.hardSolved}
                    />

                    {/* Footer Link Out */}
                    <div className="border-border/50 mt-10 flex justify-end border-t pt-6">
                        <Button variant="outline" size="sm" asChild>
                            <Link
                                href={`https://leetcode.com/${leetCodeConfig.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View full profile
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </Container>
    );
}
