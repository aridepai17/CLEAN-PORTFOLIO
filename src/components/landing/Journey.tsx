'use client';

import { journeyItems } from '@/config/Journey';
import { ArrowRight } from 'lucide-react';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { TrackedLink } from '../common/TrackedLink';
import { Card } from '../ui/card';

export default function Journey() {
    return (
        <Container className="py-12 md:py-16">
            <SectionHeading id="journey" subHeading="My" heading="Journey" />

            <div className="mt-8 flex flex-col gap-4">
                {journeyItems.map((item) => (
                    <TrackedLink
                        key={item.name}
                        className="group focus-visible:ring-primary dark:focus-visible:ring-offset-background block rounded-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
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
                        <Card className="border-border/50 bg-background/50 group-hover:border-border group-hover:bg-muted/40 flex flex-row items-center justify-between gap-4 p-5 transition-all duration-300 group-hover:shadow-sm sm:p-6 sm:pr-8">
                            <div className="flex items-center gap-4 sm:gap-6">
                                <div className="bg-muted/60 group-hover:bg-background flex shrink-0 items-center justify-center rounded-xl p-3.5 transition-colors duration-300">
                                    {(() => {
                                        const Icon =
                                            item.icon as React.ComponentType<{
                                                className?: string;
                                            }>;
                                        return (
                                            <Icon className="text-foreground/80 group-hover:text-foreground size-5 transition-colors duration-300" />
                                        );
                                    })()}
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <h3 className="text-foreground text-base font-semibold tracking-tight transition-colors duration-300 sm:text-lg">
                                        {item.name}
                                    </h3>
                                    <p className="text-muted-foreground/90 line-clamp-2 text-sm leading-relaxed sm:line-clamp-none">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            <div className="shrink-0 pl-2">
                                <ArrowRight className="text-primary size-5 -translate-x-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                            </div>
                        </Card>
                    </TrackedLink>
                ))}
            </div>
        </Container>
    );
}
