'use client';

import { about, mySkills } from '@/config/About';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function About() {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <Container className="mt-32">
            <SectionHeading id="about" subHeading="About" heading="Me" />

            {/* About me */}
            <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-start">
                {/* Framed Image Treatment */}
                <div className="glass-panel w-fit shrink-0 p-2 md:mt-2">
                    <div className="bg-muted relative size-60 overflow-hidden rounded-lg md:size-72">
                        <Image
                            src="/assets/about.jpg"
                            alt="About"
                            width={288}
                            height={288}
                            onLoad={() => setIsImageLoaded(true)}
                            className={cn(
                                'h-full w-full object-cover transition-all duration-700 ease-in-out',
                                isImageLoaded
                                    ? 'blur-0 scale-100 grayscale-0'
                                    : 'scale-105 blur-xl grayscale',
                            )}
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center pt-2">
                    <h3 className="font-display text-foreground text-4xl leading-tight font-normal tracking-tight lg:text-5xl">
                        {about.name}
                    </h3>

                    <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
                        {about.description}
                    </p>

                    <div className="mt-10">
                        <h4 className="text-muted-foreground mb-4 font-sans text-xs font-semibold tracking-wider uppercase">
                            Skills & Technologies
                        </h4>
                        <div className="flex flex-wrap gap-4">
                            {mySkills.map((skill) => (
                                <Tooltip key={skill.key}>
                                    <TooltipTrigger asChild>
                                        <button
                                            type="button"
                                            className="focus-visible:ring-primary size-7 rounded-sm transition-transform duration-300 hover:scale-110 hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
                                            aria-label={skill.key ?? ''}
                                        >
                                            {skill}
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent className="font-sans text-xs font-medium">
                                        {skill.key}
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
