'use client';

import { navbarConfig } from '@/config/Navbar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <Container className="sticky top-0 z-50 pt-4">
            <div className="glass-panel flex items-center justify-between px-4 py-3 sm:px-6 md:px-8">
                {/* Navigation */}
                <nav className="flex items-center gap-4 font-sans text-xs font-medium sm:gap-6 sm:text-sm md:gap-8">
                    {navbarConfig.navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    'rounded-sm whitespace-nowrap transition-all duration-300 ease-in-out',
                                    'hover:text-foreground hover:underline hover:decoration-2 hover:underline-offset-8',
                                    'focus-visible:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black',
                                    'active:scale-95',
                                    isActive
                                        ? 'text-foreground decoration-primary font-semibold underline decoration-2 underline-offset-8'
                                        : 'text-muted-foreground',
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Theme Toggle */}
                <ThemeToggleButton />
            </div>
        </Container>
    );
}
