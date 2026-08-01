'use client';

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface FloatingToCProps {
    selector?: string;
}

export function FloatingToC({
    selector = '.prose h2, .prose h3',
}: FloatingToCProps) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    // High-performance scroll tracking using Framer Motion
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 50,
        restDelta: 0.001,
    });

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll(selector));
        const headingData = elements.map((el) => ({
            id: el.id,
            text: el.textContent || '',
            level: Number(el.tagName.charAt(1)),
        }));
        setHeadings(headingData);

        // Intersection Observer to highlight the active section
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter(
                    (entry) => entry.isIntersecting,
                );
                if (visibleEntries.length > 0) {
                    setActiveId(visibleEntries[0].target.id);
                }
            },
            { rootMargin: '-10% 0px -80% 0px' },
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [selector]);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const y =
                element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    if (headings.length === 0) return null;

    // Determine what text to show in the pill
    const activeHeading = headings.find((h) => h.id === activeId);
    const displayText = activeHeading
        ? activeHeading.text
        : headings[0]?.text || 'Contents';

    return (
        <div className="font-sfProDisplayBlack fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center">
            {/* The Expanded Table of Contents */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        /* Optional: You can change w-72 to w-80 here if you want the box slightly wider */
                        className="border-border/50 bg-background/95 mb-4 w-72 overflow-hidden rounded-2xl border p-2 shadow-2xl backdrop-blur-xl"
                        style={{ originX: 0.5, originY: 1 }}
                    >
                        <div className="text-muted-foreground px-3 pt-3 pb-2 text-xs font-semibold tracking-wider uppercase">
                            Table of Contents
                        </div>
                        <nav className="flex max-h-[50vh] flex-col gap-0.5 overflow-y-auto">
                            {headings.map((heading) => {
                                const isActive = activeId === heading.id;
                                return (
                                    <button
                                        key={heading.id}
                                        onClick={() =>
                                            scrollToHeading(heading.id)
                                        }
                                        /* Changed items-center to items-start for better multi-line alignment */
                                        className={`group flex items-start justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                            isActive
                                                ? 'bg-muted text-foreground'
                                                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                        } ${heading.level === 3 ? 'ml-4' : ''}`}
                                    >
                                        {/* Replaced 'truncate' with wrapping classes */}
                                        <span className="pr-4 leading-snug break-words whitespace-normal">
                                            {heading.text}
                                        </span>
                                        {/* Active Dot Indicator inside menu */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-dot"
                                                /* Added mt-1.5 to align the dot with the first line of wrapped text */
                                                className="bg-foreground mt-1.5 size-1.5 shrink-0 rounded-full"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Collapsed Active Pill */}
            <motion.button
                layout // Drives structural GPU sizing fluidly
                onClick={() => setIsOpen(!isOpen)}
                // Dynamic layout with expanded padding zone (pr-16) to house the scaled loader frame comfortably
                className="group border-border/50 bg-background/95 hover:bg-muted/50 relative flex h-12 items-center gap-3 rounded-full border pr-16 pl-4 shadow-lg backdrop-blur-xl transition-colors"
            >
                {/* Left Dot */}
                <div className="bg-foreground size-1.5 shrink-0 rounded-full" />

                {/* Active Section Text - Zero wrapping allows flawless inline dynamic stretching */}
                <span className="text-sm font-medium whitespace-nowrap">
                    {displayText}
                </span>

                {/* Right Progress Ring Container - Fully adjusted structure to scale perfectly without overlapping */}
                <div className="absolute right-2 flex size-10 items-center justify-center">
                    <svg
                        className="size-8 -rotate-90 overflow-visible"
                        viewBox="0 0 100 100"
                    >
                        {/* Track */}
                        <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="14"
                            className="text-muted/30"
                        />
                        {/* Progress */}
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="14"
                            className="text-foreground"
                            strokeLinecap="round"
                            style={{ pathLength: smoothProgress }}
                        />
                    </svg>
                </div>
            </motion.button>
        </div>
    );
}
