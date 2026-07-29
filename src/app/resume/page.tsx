import Container from '@/components/common/Container';
import Reveal from '@/components/common/Reveal';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { resumeConfig } from '@/config/Resume';
import { Download, ExternalLink } from 'lucide-react';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    ...getMetadata('/resume'),
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function ResumePage() {
    return (
        <Container className="py-10 md:py-16">
            <Reveal>
                <div className="space-y-8">
                    {/* Header & Action Bar Layout */}
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div className="space-y-3 text-center sm:text-left">
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                Resume
                            </h1>
                            <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
                                A detailed overview of my experience in software
                                engineering and AI
                            </p>
                        </div>

                        {/* Explicit CTAs for ATS and quick access */}
                        <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
                            <Button
                                asChild
                                variant="outline"
                                className="w-full gap-2 sm:w-auto"
                            >
                                <a
                                    href={resumeConfig.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Open in Drive
                                </a>
                            </Button>
                            <Button asChild className="w-full gap-2 sm:w-auto">
                                <a
                                    href={resumeConfig.url.replace(
                                        '/preview',
                                        '/view',
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Download className="h-4 w-4" />
                                    Download PDF
                                </a>
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Unified Mobile & Desktop iFrame Wrapper */}
                    <div className="mx-auto max-w-5xl">
                        {/* Mobile Hint */}
                        <div className="text-muted-foreground mb-3 text-center text-xs sm:hidden">
                            Pinch to zoom, or use the buttons above for a better
                            view.
                        </div>

                        <div className="bg-muted/30 overflow-hidden rounded-xl border shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                            <iframe
                                src={resumeConfig.url}
                                className="h-[75vh] min-h-[550px] w-full border-none sm:h-[850px] lg:h-[1000px]"
                                title="Advaith R Pai Resume"
                                loading="lazy"
                                allow="autoplay" // Prevents some strict browser blocking rules with Drive embeds
                            />
                        </div>
                    </div>
                </div>
            </Reveal>
        </Container>
    );
}
