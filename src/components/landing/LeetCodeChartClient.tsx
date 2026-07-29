'use client';

import { sfProRounded } from '@/lib/fonts';
import { useState } from 'react';

interface LeetCodeChartClientProps {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
}

export default function LeetCodeChartClient({
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
}: LeetCodeChartClientProps) {
    const [hovered, setHovered] = useState<'Easy' | 'Medium' | 'Hard' | null>(
        null,
    );

    if (totalSolved === 0) return null;

    // Calculate exact percentages
    const easyPct = (easySolved / totalSolved) * 100;
    const medPct = (mediumSolved / totalSolved) * 100;
    const hardPct = (hardSolved / totalSolved) * 100;

    // Offsets for stacking the SVG strokes sequentially
    const medOffset = -easyPct;
    const hardOffset = -(easyPct + medPct);

    // Dynamic states for the center anchor text on hover/click/focus
    const displayLabel = hovered || 'Total Solved';
    const displayCount =
        hovered === 'Easy'
            ? easySolved
            : hovered === 'Medium'
              ? mediumSolved
              : hovered === 'Hard'
                ? hardSolved
                : totalSolved;

    const displayPct =
        hovered === 'Easy'
            ? Math.round(easyPct)
            : hovered === 'Medium'
              ? Math.round(medPct)
              : hovered === 'Hard'
                ? Math.round(hardPct)
                : 100;

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
                    {/* Easy Segment */}
                    <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="currentColor"
                        className={`cursor-pointer text-emerald-500 transition-all duration-300 ${
                            hovered && hovered !== 'Easy'
                                ? 'opacity-30'
                                : 'opacity-100'
                        }`}
                        strokeWidth={hovered === 'Easy' ? '20' : '16'}
                        strokeDasharray={`${easyPct} ${100 - easyPct}`}
                        strokeDashoffset="0"
                        pathLength="100"
                        onMouseEnter={() => setHovered('Easy')}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() =>
                            setHovered(hovered === 'Easy' ? null : 'Easy')
                        }
                    />
                    {/* Medium Segment */}
                    <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="currentColor"
                        className={`cursor-pointer text-amber-500 transition-all duration-300 ${
                            hovered && hovered !== 'Medium'
                                ? 'opacity-30'
                                : 'opacity-100'
                        }`}
                        strokeWidth={hovered === 'Medium' ? '20' : '16'}
                        strokeDasharray={`${medPct} ${100 - medPct}`}
                        strokeDashoffset={medOffset}
                        pathLength="100"
                        onMouseEnter={() => setHovered('Medium')}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() =>
                            setHovered(hovered === 'Medium' ? null : 'Medium')
                        }
                    />
                    {/* Hard Segment */}
                    <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="currentColor"
                        className={`cursor-pointer text-rose-500 transition-all duration-300 ${
                            hovered && hovered !== 'Hard'
                                ? 'opacity-30'
                                : 'opacity-100'
                        }`}
                        strokeWidth={hovered === 'Hard' ? '20' : '16'}
                        strokeDasharray={`${hardPct} ${100 - hardPct}`}
                        strokeDashoffset={hardOffset}
                        pathLength="100"
                        onMouseEnter={() => setHovered('Hard')}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() =>
                            setHovered(hovered === 'Hard' ? null : 'Hard')
                        }
                    />
                </svg>

                {/* Center Text Overlay */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                    <span
                        className={`${sfProRounded.className} text-foreground text-3xl tracking-tight sm:text-4xl`}
                    >
                        {displayCount.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground mt-0.5 text-xs font-semibold tracking-wider uppercase sm:text-sm">
                        {displayLabel}
                    </span>
                    {hovered && (
                        <span className="text-muted-foreground mt-0.5 font-mono text-xs">
                            {displayPct}% of profile
                        </span>
                    )}
                </div>
            </div>

            {/* Interactive Legend Cards with Accessibility & Hybrid Touch Support */}
            <div className="w-full flex-1 space-y-4">
                {/* Easy Card */}
                <div
                    role="button"
                    tabIndex={0}
                    aria-pressed={hovered === 'Easy'}
                    onMouseEnter={() => setHovered('Easy')}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() =>
                        setHovered(hovered === 'Easy' ? null : 'Easy')
                    }
                    onFocus={() => setHovered('Easy')}
                    onBlur={() => setHovered(null)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setHovered(hovered === 'Easy' ? null : 'Easy');
                        }
                    }}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none sm:p-5 ${
                        hovered === 'Easy'
                            ? 'scale-[1.02] border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/5'
                            : 'border-border/60 bg-background/40 hover:border-emerald-500/50'
                    }`}
                >
                    <div className="flex items-center gap-3.5">
                        <div className="h-4 w-4 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50" />
                        <span className={`${sfProRounded.className} text-base`}>
                            Easy
                        </span>
                    </div>
                    <div className="text-right">
                        <span
                            className={`${sfProRounded.className} text-base font-bold`}
                        >
                            {easySolved}
                        </span>
                        <span className="text-muted-foreground ml-2.5 text-sm font-medium">
                            ({Math.round(easyPct)}%)
                        </span>
                    </div>
                </div>

                {/* Medium Card */}
                <div
                    role="button"
                    tabIndex={0}
                    aria-pressed={hovered === 'Medium'}
                    onMouseEnter={() => setHovered('Medium')}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() =>
                        setHovered(hovered === 'Medium' ? null : 'Medium')
                    }
                    onFocus={() => setHovered('Medium')}
                    onBlur={() => setHovered(null)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setHovered(hovered === 'Medium' ? null : 'Medium');
                        }
                    }}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all focus:ring-2 focus:ring-amber-500 focus:outline-none sm:p-5 ${
                        hovered === 'Medium'
                            ? 'scale-[1.02] border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/5'
                            : 'border-border/60 bg-background/40 hover:border-amber-500/50'
                    }`}
                >
                    <div className="flex items-center gap-3.5">
                        <div className="h-4 w-4 rounded-full bg-amber-500 shadow-md shadow-amber-500/50" />
                        <span className={`${sfProRounded.className} text-base`}>
                            Medium
                        </span>
                    </div>
                    <div className="text-right">
                        <span
                            className={`${sfProRounded.className} text-base font-bold`}
                        >
                            {mediumSolved}
                        </span>
                        <span className="text-muted-foreground ml-2.5 text-sm font-medium">
                            ({Math.round(medPct)}%)
                        </span>
                    </div>
                </div>

                {/* Hard Card */}
                <div
                    role="button"
                    tabIndex={0}
                    aria-pressed={hovered === 'Hard'}
                    onMouseEnter={() => setHovered('Hard')}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() =>
                        setHovered(hovered === 'Hard' ? null : 'Hard')
                    }
                    onFocus={() => setHovered('Hard')}
                    onBlur={() => setHovered(null)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setHovered(hovered === 'Hard' ? null : 'Hard');
                        }
                    }}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all focus:ring-2 focus:ring-rose-500 focus:outline-none sm:p-5 ${
                        hovered === 'Hard'
                            ? 'scale-[1.02] border-rose-500 bg-rose-500/10 shadow-lg shadow-rose-500/5'
                            : 'border-border/60 bg-background/40 hover:border-rose-500/50'
                    }`}
                >
                    <div className="flex items-center gap-3.5">
                        <div className="h-4 w-4 rounded-full bg-rose-500 shadow-md shadow-rose-500/50" />
                        <span className={`${sfProRounded.className} text-base`}>
                            Hard
                        </span>
                    </div>
                    <div className="text-right">
                        <span
                            className={`${sfProRounded.className} text-base font-bold`}
                        >
                            {hardSolved}
                        </span>
                        <span className="text-muted-foreground ml-2.5 text-sm font-medium">
                            ({Math.round(hardPct)}%)
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
