import { type Experience } from '@/config/Experience';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Skill from '../common/Skill';
import GitHubIcon from '../svgs/GitHubIcon';
import LinkedInIcon from '../svgs/LinkedInIcon';
import Website from '../svgs/Website';
import XIcon from '../svgs/XIcon';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ExperienceCardProps {
    experience: Experience;
}

const parseBoldSegments = (text: string) => {
    const parts = text.split(/(\*[^*]+\*)/);
    return parts.map((part, index) => {
        if (part.startsWith('*') && part.endsWith('*')) {
            return {
                text: part.slice(1, -1),
                bold: true,
                key: index,
            };
        }
        return {
            text: part,
            bold: false,
            key: index,
        };
    });
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
    return (
        <div className="glass-panel flex flex-col gap-8 p-6 md:p-8">
            {/* Company Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* Left Side */}
                <div className="flex items-start gap-4 md:items-center">
                    <Image
                        src={experience.image}
                        alt={experience.company}
                        width={100}
                        height={100}
                        className="border-border/50 bg-muted size-14 shrink-0 rounded-xl border object-cover shadow-sm"
                    />
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <h3
                                className={cn(
                                    'font-display text-foreground text-2xl font-normal tracking-tight',
                                    experience.isBlur
                                        ? 'blur-[5px]'
                                        : 'blur-none',
                                )}
                            >
                                {experience.company}
                            </h3>

                            <div className="flex items-center gap-2">
                                {experience.website && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={experience.website}
                                                target="_blank"
                                                className="text-muted-foreground hover:text-foreground flex size-5 items-center justify-center transition-colors focus:outline-none"
                                            >
                                                <Website className="size-4" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent className="font-sans text-xs font-medium">
                                            Visit Website
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                                {experience.x && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={experience.x}
                                                target="_blank"
                                                className="text-muted-foreground hover:text-foreground flex size-5 items-center justify-center transition-colors focus:outline-none"
                                            >
                                                <XIcon className="size-3.5" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent className="font-sans text-xs font-medium">
                                            Follow on X
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                                {experience.linkedin && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={experience.linkedin}
                                                target="_blank"
                                                className="text-muted-foreground hover:text-foreground flex size-5 items-center justify-center transition-colors focus:outline-none"
                                            >
                                                <LinkedInIcon className="size-4" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent className="font-sans text-xs font-medium">
                                            Connect on LinkedIn
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                                {experience.github && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={experience.github}
                                                target="_blank"
                                                className="text-muted-foreground hover:text-foreground flex size-5 items-center justify-center transition-colors focus:outline-none"
                                            >
                                                <GitHubIcon className="size-4" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent className="font-sans text-xs font-medium">
                                            View GitHub
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                            </div>

                            {experience.isCurrent && (
                                <div className="flex items-center gap-1.5 rounded-md border border-green-300/50 bg-green-500/10 px-2 py-0.5 font-sans text-[11px] font-semibold tracking-wide text-green-600 uppercase dark:text-green-400">
                                    <div className="size-1.5 animate-pulse rounded-full bg-green-500"></div>
                                    Working
                                </div>
                            )}
                        </div>
                        <p className="text-foreground/90 font-sans font-medium">
                            {experience.position}
                        </p>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col md:items-end">
                    <p className="text-foreground/80 font-sans text-sm font-medium">
                        {experience.startDate} -{' '}
                        {experience.isCurrent ? 'Present' : experience.endDate}
                    </p>
                    <p className="text-muted-foreground mt-1 font-sans text-xs font-semibold tracking-wider uppercase">
                        {experience.location}
                    </p>
                </div>
            </div>

            {/* Technologies */}
            {experience.technologies && experience.technologies.length > 0 && (
                <div className="pt-2">
                    <h4 className="text-muted-foreground mb-3 font-sans text-xs font-semibold tracking-wider uppercase">
                        Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {experience.technologies.map(
                            (technology, techIndex: number) => (
                                <Skill
                                    key={techIndex}
                                    name={technology.name}
                                    href={technology.href}
                                >
                                    {technology.icon}
                                </Skill>
                            ),
                        )}
                    </div>
                </div>
            )}

            {/* Description */}
            <ul className="flex flex-col space-y-3 pt-2">
                {experience.description.map(
                    (description: string, descIndex: number) => {
                        const segments = parseBoldSegments(description);
                        return (
                            <li
                                key={descIndex}
                                className="text-muted-foreground flex items-start gap-3 text-sm leading-relaxed md:text-base"
                            >
                                <span className="bg-primary/50 mt-2 block size-1.5 shrink-0 rounded-full" />
                                <span>
                                    {segments.map((segment) =>
                                        segment.bold ? (
                                            <strong
                                                key={segment.key}
                                                className="text-foreground font-semibold"
                                            >
                                                {segment.text}
                                            </strong>
                                        ) : (
                                            <span key={segment.key}>
                                                {segment.text}
                                            </span>
                                        ),
                                    )}
                                </span>
                            </li>
                        );
                    },
                )}
            </ul>
        </div>
    );
}
