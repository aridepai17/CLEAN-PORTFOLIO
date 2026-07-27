import { navbarConfig } from '@/config/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';

export default function Navbar() {
    return (
        <Container className="sticky top-0 z-20 rounded-md py-4 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4 px-6">
                <Link href="/" className="shrink-0">
                    <Image
                        src={navbarConfig.logo.src}
                        alt={navbarConfig.logo.alt}
                        width={navbarConfig.logo.width}
                        height={navbarConfig.logo.height}
                        className="h-10 w-10 rounded-md"
                    />
                </Link>
                <nav className="flex items-center gap-4 text-sm">
                    {navbarConfig.navItems.map((item) => (
                        <Link
                            className="whitespace-nowrap transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4"
                            key={item.label}
                            href={item.href}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <ThemeToggleButton />
            </div>
        </Container>
    );
}
