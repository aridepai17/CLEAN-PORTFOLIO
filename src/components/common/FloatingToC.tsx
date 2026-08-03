'use client';

import { getLenis } from '@/components/common/LenisProvider';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { useUmami } from '@/hooks/use-umami';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Minus, Plus, Type } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Adjust these relative imports based on your exact folder structure
import { Button } from '../ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../ui/drawer';

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface FloatingToCProps {
    selector?: string;
    className?: string;
}

export function FloatingToC({
    selector = '.prose h2, .prose h3',
    className = '',
}: FloatingToCProps) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const [fontSize, setFontSize] = useState<number>(16);
    const { triggerHaptic, isMobile } = useHapticFeedback();
    const { trackEvent } = useUmami();

    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 50,
        restDelta: 0.001,
    });

    useEffect(() => {
        const savedFontSize = localStorage.getItem('blog-font-size');
        if (savedFontSize) {
            const size = parseInt(savedFontSize, 10);
            setFontSize(size);
            applyFontSize(size);
        }
    }, []);

    const applyFontSize = (size: number) => {
        if (typeof window !== 'undefined') {
            document.documentElement.style.setProperty(
                '--blog-font-size',
                `${size}px`,
            );
        }
    };

    const updateFontSize = (newSize: number) => {
        const clampedSize = Math.max(10, Math.min(32, newSize));
        setFontSize(clampedSize);
        applyFontSize(clampedSize);
        localStorage.setItem('blog-font-size', clampedSize.toString());
    };

    const handleIncrease = () => {
        if (isMobile()) triggerHaptic('light');
        trackEvent({
            name: 'button_click',
            data: { buttonId: 'font_size_increase' },
        });
        updateFontSize(fontSize + 1);
    };

    const handleDecrease = () => {
        if (isMobile()) triggerHaptic('light');
        trackEvent({
            name: 'button_click',
            data: { buttonId: 'font_size_decrease' },
        });
        updateFontSize(fontSize - 1);
    };

    const handleReset = () => {
        if (isMobile()) triggerHaptic('medium');
        trackEvent({
            name: 'button_click',
            data: { buttonId: 'font_size_reset' },
        });
        updateFontSize(16);
    };

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll(selector));
        const headingData = elements.map((el) => ({
            id: el.id,
            text: el.textContent || '',
            level: Number(el.tagName.charAt(1)),
        }));
        setHeadings(headingData);

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter(
                    (entry) => entry.isIntersecting,
                );
                if (visibleEntries.length > 0) {
                    setActiveId(visibleEntries[0].target.id);
                } else if (elements.length > 0) {
                    const firstEntry = entries.find(
                        (entry) => entry.target === elements[0],
                    );
                    if (firstEntry && firstEntry.boundingClientRect.top > 0) {
                        setActiveId('');
                    }
                }
            },
            { rootMargin: '-10% 0px -80% 0px' },
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [selector]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    useEffect(() => {
        const lenis = getLenis();
        if (!lenis) return;
        if (isOpen) lenis.stop();
        else lenis.start();
        return () => lenis.start();
    }, [isOpen]);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const lenis = getLenis();
            if (lenis) {
                lenis.start();
                lenis.scrollTo(element, { offset: -100, duration: 1.2 });
            } else {
                const y =
                    element.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
            setIsOpen(false);
        }
    };

    if (headings.length === 0) return null;

    const activeHeading = headings.find((h) => h.id === activeId);
    const displayText = activeHeading
        ? activeHeading.text
        : headings[0]?.text || 'Contents';

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="bg-background/40 fixed inset-0 z-40 backdrop-blur-[7px]"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            <div
                ref={containerRef}
                className={`fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center ${className}`}
            >
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="border-border/50 bg-background/95 mb-4 w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border p-2 shadow-2xl backdrop-blur-xl sm:w-96"
                            style={{ originX: 0.5, originY: 1 }}
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                        >
                            <div className="text-muted-foreground px-3 pt-3 pb-2 text-xs font-semibold tracking-wider uppercase">
                                Table of Contents
                            </div>
                            <nav className="[&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 flex max-h-[50vh] [scrollbar-width:thin] flex-col gap-0.5 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                                {headings.map((heading) => {
                                    const isActive = activeId === heading.id;
                                    return (
                                        <button
                                            key={heading.id}
                                            onClick={() =>
                                                scrollToHeading(heading.id)
                                            }
                                            className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                                                isActive
                                                    ? 'bg-muted/80 text-foreground'
                                                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                            } ${heading.level === 3 ? 'ml-4' : ''}`}
                                        >
                                            <span className="pr-4 leading-snug break-words whitespace-normal">
                                                {heading.text}
                                            </span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="active-dot"
                                                    className="bg-foreground size-1.5 shrink-0 rounded-full"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    layout
                    className="border-border/50 bg-background/95 relative flex h-12 max-w-[calc(100vw-2rem)] items-center overflow-hidden rounded-full border shadow-lg backdrop-blur-xl transition-colors"
                >
                    <Drawer>
                        <DrawerTrigger asChild>
                            <button
                                className="hover:bg-muted/50 flex h-full w-14 shrink-0 items-center justify-center rounded-l-full transition-colors focus:outline-none"
                                aria-label="Text settings"
                            >
                                <Type size={16} className="text-foreground" />
                            </button>
                        </DrawerTrigger>

                        <DrawerContent className="z-[60] max-h-[60vh]">
                            <DrawerHeader className="text-center">
                                <DrawerTitle>Typography</DrawerTitle>
                            </DrawerHeader>
                            <div className="px-4 pt-2 pb-10">
                                <div className="flex flex-col items-center gap-6">
                                    <div className="text-center">
                                        <div className="text-foreground mb-2 font-mono text-3xl font-bold">
                                            {fontSize}px
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            onClick={handleDecrease}
                                            disabled={fontSize <= 10}
                                            className="h-12 w-12 p-0"
                                            aria-label="Decrease font size"
                                        >
                                            <Minus size={20} />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            onClick={handleReset}
                                            className="hover:bg-accent h-12 px-4 font-mono text-sm whitespace-nowrap"
                                            aria-label="Reset font size"
                                        >
                                            Reset
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            onClick={handleIncrease}
                                            disabled={fontSize >= 32}
                                            className="h-12 w-12 p-0"
                                            aria-label="Increase font size"
                                        >
                                            <Plus size={20} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>

                    <div className="bg-border/50 h-5 w-px shrink-0" />

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="hover:bg-muted/50 relative flex h-full flex-1 items-center overflow-hidden rounded-r-full pr-14 pl-4 text-left transition-colors focus:outline-none"
                    >
                        <span className="overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap">
                            {displayText}
                        </span>

                        <div className="absolute right-1.5 flex size-9 items-center justify-center">
                            <svg
                                className="size-8 -rotate-90 overflow-visible"
                                viewBox="0 0 100 100"
                            >
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="38"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="14"
                                    className="text-muted/30"
                                />
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
                    </button>
                </motion.div>
            </div>
        </>
    );
}
