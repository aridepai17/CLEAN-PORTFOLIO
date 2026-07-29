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
        <Container className="sticky top-0 z-20 rounded-md py-4 backdrop-blur-sm">
            <div className="flex items-center justify-between px-3 sm:px-5 md:px-6">
                {/* Navigation */}
                <nav className="flex items-center gap-3 text-[13px] font-medium sm:gap-4 sm:text-sm md:gap-5 md:text-base">
                    {navbarConfig.navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    'rounded-sm whitespace-nowrap transition-all duration-300 ease-in-out',
                                    'hover:text-foreground hover:underline hover:decoration-2 hover:underline-offset-4',
                                    'focus-visible:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4',
                                    'active:scale-95',
                                    isActive
                                        ? 'text-foreground underline decoration-2 underline-offset-4'
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
