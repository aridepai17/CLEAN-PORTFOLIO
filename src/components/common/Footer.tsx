'use client';

import { footerConfig } from '@/config/Footer';
import { socialLinks } from '@/config/Hero';
import { navbarConfig } from '@/config/Navbar';
import Link from 'next/link';
import React from 'react';

import Container from './Container';

export default function Footer() {
    return (
        <Container className="mt-32 mb-12">
            <div className="glass-panel p-8 md:p-12">
                {/* Top Section: Navigate & Connect Grid */}
                <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start">
                    {/* Navigation Column */}
                    <div className="space-y-4">
                        <h4 className="text-muted-foreground font-sans text-xs font-semibold tracking-widest uppercase">
                            Navigate
                        </h4>
                        <nav className="flex max-w-lg flex-wrap gap-x-8 gap-y-3.5">
                            {navbarConfig.navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Connect Column */}
                    <div className="space-y-4">
                        <h4 className="text-muted-foreground font-sans text-xs font-semibold tracking-widest uppercase">
                            Connect
                        </h4>
                        <div className="grid max-w-[280px] grid-cols-4 gap-2.5">
                            {socialLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-border/60 bg-muted/20 text-muted-foreground hover:text-foreground hover:border-border flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300 hover:scale-105 focus:outline-none"
                                    aria-label={link.name}
                                >
                                    <span className="flex size-4 items-center justify-center">
                                        {link.icon}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="border-border/40 my-10 border-t" />

                {/* Bottom Copyright Row */}
                <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
                    <p className="text-muted-foreground font-sans text-xs">
                        &copy; {new Date().getFullYear()}{' '}
                        {footerConfig.developer}. All rights reserved.
                    </p>
                </div>
            </div>
        </Container>
    );
}
