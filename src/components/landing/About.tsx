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
        <Container className="mt-20">
            <SectionHeading id="about" subHeading="About" heading="Me" />

            {/* About me */}
            <div className="mt-8 flex flex-col gap-4 md:flex-row">
                <Image
                    src="/assets/about.jpg"
                    alt="About"
                    width={240}
                    height={240}
                    onLoad={() => setIsImageLoaded(true)}
                    className={cn(
                        'border-secondary size-60 rounded-md border-2 bg-blue-300 object-cover transition-all duration-700 ease-in-out dark:bg-yellow-300',
                        isImageLoaded
                            ? 'blur-0 scale-100 grayscale-0'
                            : 'scale-105 blur-xl grayscale',
                    )}
                />
                <div className="mt-4">
                    <h3 className="text-2xl font-bold">{about.name}</h3>
                    <p className="text-secondary mt-4">{about.description}</p>
                    <p className="text-secondary mt-8 font-bold">Skills</p>
                    <div className="flex flex-wrap gap-2">
                        {mySkills.map((skill) => (
                            <Tooltip key={skill.key}>
                                <TooltipTrigger asChild>
                                    {/* 3. Added keyboard focus rings to the raw button */}
                                    <button
                                        type="button"
                                        className="focus-visible:ring-primary mt-4 size-6 rounded-sm hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
                                    >
                                        {skill}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>{skill.key}</TooltipContent>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
}
