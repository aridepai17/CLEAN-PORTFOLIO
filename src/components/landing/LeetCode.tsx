import { leetCodeConfig } from '@/config/LeetCode';
import { getLeetCodeStats } from '@/lib/leetcode';
import localFont from 'next/font/local';
import Link from 'next/link';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Button } from '../ui/button';
import LeetCodeChartClient from './LeetCodeChartClient';

// Load the custom font from public/fonts
const sfProRounded = localFont({
    src: '../../../public/fonts/SF-Pro-Rounded-Black.otf',
    display: 'swap',
});

export default async function LeetCode() {
    const stats = await getLeetCodeStats();

    return (
        <Container className="mt-20">
            <SectionHeading
                subHeading={leetCodeConfig.subtitle}
                heading={leetCodeConfig.title}
            />

            {!stats ? (
                <div className="text-muted-foreground relative mt-8 rounded-xl border bg-white/80 p-8 text-center backdrop-blur-sm dark:border-white/20 dark:bg-black/60">
                    <p className="mb-2 font-medium">
                        Unable to load LeetCode stats
                    </p>
                    <p className="mb-4 text-sm">
                        Check out my profile directly for the latest activity
                    </p>
                    <Button variant="outline" asChild>
                        <Link
                            href={`https://leetcode.com/${leetCodeConfig.username}`}
                            target="_blank"
                        >
                            View on LeetCode
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="relative mt-8 rounded-xl border bg-white/80 p-6 backdrop-blur-sm dark:border-white/20 dark:bg-black/60">
                    {/* Top Meta Header */}
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-white/10">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                                Platform Overview
                            </p>
                            <p
                                className={`${sfProRounded.className} text-foreground text-xl tracking-tight`}
                            >
                                Active Problem Solver
                            </p>
                        </div>
                        {stats.ranking !== null && (
                            <div className="text-right">
                                <p
                                    className={`${sfProRounded.className} text-foreground text-xl tracking-tight`}
                                >
                                    #{stats.ranking.toLocaleString()}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    Global Rank
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
                    <div className="mt-8 flex justify-end border-t border-zinc-200 pt-4 dark:border-white/10">
                        <Button variant="outline" size="sm" asChild>
                            <Link
                                href={`https://leetcode.com/${leetCodeConfig.username}`}
                                target="_blank"
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
