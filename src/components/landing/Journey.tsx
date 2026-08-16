'use client';

import { journeyItems } from '@/config/Journey';
import { ArrowRight } from 'lucide-react';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { TrackedLink } from '../common/TrackedLink';

export default function Journey() {
    return (
        <Container className="mt-32">
            <SectionHeading id="journey" subHeading="My" heading="Journey" />

            <div className="mt-12 flex flex-col gap-5">
                {journeyItems.map((item) => (
                    <TrackedLink
                        key={item.name}
                        className="group focus-visible:ring-primary dark:focus-visible:ring-offset-background block rounded-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.99]"
                        href={item.href}
                        track={{
                            name: 'button_click',
                            data: {
                                buttonId: item.name,
                                section: 'journey',
                                action: item.href,
                            },
                        }}
                    >
                        <div className="glass-panel group-hover:border-border/80 flex flex-row items-center justify-between gap-4 p-5 transition-all duration-300 hover:shadow-md sm:p-8">
                            <div className="flex items-center gap-5 sm:gap-8">
                                {/* Icon Container */}
                                <div className="border-border/50 bg-muted/30 group-hover:bg-muted/60 flex shrink-0 items-center justify-center rounded-2xl border p-4 transition-colors duration-300">
                                    {(() => {
                                        const Icon =
                                            item.icon as React.ComponentType<{
                                                className?: string;
                                            }>;
                                        return (
                                            <Icon className="text-foreground/80 group-hover:text-primary size-6 transition-colors duration-300" />
                                        );
                                    })()}
                                </div>

                                {/* Text Content */}
                                <div className="flex flex-col space-y-1.5">
                                    <h3 className="font-display text-foreground text-2xl font-normal tracking-tight transition-colors duration-300 sm:text-3xl">
                                        {item.name}
                                    </h3>
                                    <p className="text-muted-foreground line-clamp-2 font-sans text-sm leading-relaxed sm:line-clamp-none sm:text-base">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Arrow */}
                            <div className="shrink-0 pl-4">
                                <ArrowRight className="text-primary size-6 -translate-x-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                            </div>
                        </div>
                    </TrackedLink>
                ))}
            </div>
        </Container>
    );
}
