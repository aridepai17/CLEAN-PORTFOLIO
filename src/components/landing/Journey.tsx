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
        <Container className="mt-10">
            <SectionHeading id="journey" subHeading="My" heading="Journey" />
            <div className="mt-8 flex flex-col gap-4">
                {journeyItems.map((item) => (
                    <TrackedLink
                        className="group focus-visible:ring-primary block rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] dark:focus-visible:ring-offset-black"
                        href={item.href}
                        key={item.name}
                        track={{
                            name: 'button_click',
                            data: {
                                buttonId: item.name,
                                section: 'journey',
                                action: item.href,
                            },
                        }}
                    >
                        <Card className="group-hover:bg-muted/50 flex flex-row items-center justify-between gap-4 px-4 py-2 transition-colors duration-300">
                            <div className="flex items-center gap-4">
                                <div className="bg-muted flex items-center justify-center rounded-md p-2">
                                    {(() => {
                                        const Icon =
                                            item.icon as React.ComponentType<{
                                                className?: string;
                                            }>;
                                        return <Icon className="size-4" />;
                                    })()}
                                </div>
                                <div className="flex w-full flex-col">
                                    <h3 className="group-hover:text-primary text-base font-semibold transition-colors duration-300">
                                        {item.name}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            <ArrowRight className="group-hover:text-primary size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </Card>
                    </TrackedLink>
                ))}
            </div>
        </Container>
    );
}
