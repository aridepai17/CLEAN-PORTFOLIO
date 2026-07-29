import { navbarConfig } from '@/config/Navbar';
import Link from 'next/link';
import React from 'react';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';

export default function Navbar() {
    return (
        <Container className="sticky top-0 z-20 rounded-md py-4 backdrop-blur-sm">
            <div className="flex items-center justify-between px-3 sm:px-5 md:px-6">
                {/* Navigation */}
                <nav className="flex items-center gap-3 text-[13px] font-medium sm:gap-4 sm:text-sm md:gap-5 md:text-base">
                    {navbarConfig.navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="whitespace-nowrap transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Theme Toggle */}
                <ThemeToggleButton />
            </div>
        </Container>
    );
}
