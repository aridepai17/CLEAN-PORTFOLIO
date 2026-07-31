'use client';

import { sfProRounded } from '@/lib/fonts';
import { useEffect, useState } from 'react';

interface LeetCodeChartClientProps {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
}

type Difficulty = 'Easy' | 'Medium' | 'Hard';

// Static styling map to prevent Tailwind from purging classes in production builds
const DIFFICULTY_CONFIG: Record<
    Difficulty,
    {
        color: string;
        bgClass: string;
        textClass: string;
        borderClass: string;
        ringClass: string;
        activeBg: string;
        activeBorder: string;
        shadowColor: string;
        dotShadow: string;
    }
> = {
    Easy: {
        color: 'emerald',
        bgClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
        borderClass: 'border-emerald-500/50',
        ringClass: 'focus:ring-emerald-500',
        activeBg: 'bg-emerald-500/10',
        activeBorder: 'border-emerald-500',
        shadowColor: 'shadow-emerald-500/5',
        dotShadow: 'shadow-emerald-500/50',
    },
    Medium: {
        color: 'amber',
        bgClass: 'bg-amber-500',
        textClass: 'text-amber-500',
        borderClass: 'border-amber-500/50',
        ringClass: 'focus:ring-amber-500',
        activeBg: 'bg-amber-500/10',
        activeBorder: 'border-amber-500',
        shadowColor: 'shadow-amber-500/5',
        dotShadow: 'shadow-amber-500/50',
    },
    Hard: {
        color: 'rose',
        bgClass: 'bg-rose-500',
        textClass: 'text-rose-500',
        borderClass: 'border-rose-500/50',
        ringClass: 'focus:ring-rose-500',
        activeBg: 'bg-rose-500/10',
        activeBorder: 'border-rose-500',
        shadowColor: 'shadow-rose-500/5',
        dotShadow: 'shadow-rose-500/50',
    },
};

export default function LeetCodeChartClient({
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
}: LeetCodeChartClientProps) {
    const [hovered, setHovered] = useState<Difficulty | null>(null);
    const [selected, setSelected] = useState<Difficulty | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Initial Mount Animation Trigger
    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    if (totalSolved === 0) return null;

    // Desktop Hover Priority with Selected Lock Fallback
    const activeState = hovered || selected;

    const easyPct = (easySolved / totalSolved) * 100;
    const medPct = (mediumSolved / totalSolved) * 100;
    const hardPct = (hardSolved / totalSolved) * 100;

    const medOffset = -easyPct;
    const hardOffset = -(easyPct + medPct);

    const displayLabel = activeState || 'Total Solved';
    const displayCount =
        activeState === 'Easy'
            ? easySolved
            : activeState === 'Medium'
              ? mediumSolved
              : activeState === 'Hard'
                ? hardSolved
                : totalSolved;

    const displayPct =
        activeState === 'Easy'
            ? Math.round(easyPct)
            : activeState === 'Medium'
              ? Math.round(medPct)
              : activeState === 'Hard'
                ? Math.round(hardPct)
                : 100;

    // Clean Touch/Click Handler
    const handleCardInteraction = (difficulty: Difficulty) => {
        setSelected(selected === difficulty ? null : difficulty);
    };

    return (
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
            {/* Donut Chart Container */}
            <div className="relative flex h-56 w-56 shrink-0 items-center justify-center sm:h-64 sm:w-64">
                <svg
                    viewBox="0 0 100 100"
                    className="h-full w-full -rotate-90 transform overflow-visible"
                >
                    {/* Background Track */}
                    <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        className="stroke-muted"
                        strokeWidth="16"
                        pathLength="100"
                    />

                    {/* Chart Segments with Mount Animation & Layout Jump Prevention */}
                    {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(
                        (level) => {
                            const pct =
                                level === 'Easy'
                                    ? easyPct
                                    : level === 'Medium'
                                      ? medPct
                                      : hardPct;
                            const offset =
                                level === 'Easy'
                                    ? '0'
                                    : level === 'Medium'
                                      ? medOffset
                                      : hardOffset;
                            const textClass =
                                DIFFICULTY_CONFIG[level].textClass;
                            const isDimmed =
                                activeState && activeState !== level;
                            const isFocused = activeState === level;

                            return (
                                <circle
                                    key={level}
                                    cx="50"
                                    cy="50"
                                    r="38"
                                    fill="transparent"
                                    stroke="currentColor"
                                    className={`cursor-pointer ${textClass} transition-all duration-500 ease-out ${
                                        isDimmed ? 'opacity-30' : 'opacity-100'
                                    }`}
                                    strokeWidth={isFocused ? '20' : '16'}
                                    strokeDasharray={
                                        isMounted
                                            ? `${pct} ${100 - pct}`
                                            : `0 100`
                                    }
                                    strokeDashoffset={offset}
                                    pathLength="100"
                                    onMouseEnter={() => setHovered(level)}
                                    onMouseLeave={() => setHovered(null)}
                                    onClick={() => handleCardInteraction(level)}
                                />
                            );
                        },
                    )}
                </svg>

                {/* Center Text Overlay */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                    <span
                        className={`${sfProRounded.className} text-foreground text-3xl tracking-tight transition-all duration-300 sm:text-4xl`}
                    >
                        {displayCount.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground mt-0.5 text-xs font-semibold tracking-wider uppercase sm:text-sm">
                        {displayLabel}
                    </span>
                    {activeState && (
                        <span className="text-muted-foreground animate-fade-in mt-0.5 font-mono text-xs">
                            {displayPct}% of profile
                        </span>
                    )}
                </div>
            </div>

            {/* Interactive Legend Cards */}
            <div className="w-full flex-1 space-y-4">
                {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((level) => {
                    const config = DIFFICULTY_CONFIG[level];
                    const isActive = activeState === level;
                    const count =
                        level === 'Easy'
                            ? easySolved
                            : level === 'Medium'
                              ? mediumSolved
                              : hardSolved;
                    const pct =
                        level === 'Easy'
                            ? easyPct
                            : level === 'Medium'
                              ? medPct
                              : hardPct;

                    return (
                        <div
                            key={level}
                            role="button"
                            tabIndex={0}
                            aria-pressed={selected === level}
                            onMouseEnter={() => setHovered(level)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => handleCardInteraction(level)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleCardInteraction(level);
                                }
                            }}
                            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all focus:ring-2 ${config.ringClass} focus:outline-none sm:p-5 ${
                                isActive
                                    ? `scale-[1.02] ${config.activeBorder} ${config.activeBg} shadow-lg ${config.shadowColor}`
                                    : `border-border/60 bg-background/40 hover:${config.borderClass}`
                            }`}
                        >
                            <div className="flex items-center gap-3.5">
                                <div
                                    className={`h-4 w-4 rounded-full ${config.bgClass} shadow-md ${config.dotShadow}`}
                                />
                                <span
                                    className={`${sfProRounded.className} text-base`}
                                >
                                    {level}
                                </span>
                            </div>
                            <div className="text-right">
                                {/* Consistent Number Formatting */}
                                <span
                                    className={`${sfProRounded.className} text-base font-bold`}
                                >
                                    {count.toLocaleString()}
                                </span>
                                <span className="text-muted-foreground ml-2.5 text-sm font-medium">
                                    ({Math.round(pct)}%)
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
