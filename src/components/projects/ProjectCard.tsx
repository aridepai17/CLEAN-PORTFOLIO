'use client';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useUmami } from '@/hooks/use-umami';
import { cn } from '@/lib/utils';
import type { AnalyticsEventData } from '@/types/analytics';
import { type Project } from '@/types/project';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React, { useState } from 'react';

import ArrowRight from '../svgs/ArrowRight';
import Github from '../svgs/GitHubIcon';
import PlayCircle from '../svgs/PlayCircle';
import Website from '../svgs/Website';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const { trackEvent } = useUmami();

    const projectId =
        project.projectDetailsPageSlug.split('/').filter(Boolean).pop() ??
        project.title;

    const trackProject = (
        action: AnalyticsEventData['project_click']['action'],
    ) =>
        trackEvent({
            name: 'project_click',
            data: {
                projectId,
                projectTitle: project.title,
                action,
                location: 'project_card',
            },
        });

    return (
        <Card className="group h-full w-full overflow-hidden border-gray-100 p-0 shadow-none transition-all dark:border-gray-800">
            <CardHeader className="p-0">
                <div className="group bg-muted relative aspect-video overflow-hidden">
                    <Image
                        className={cn(
                            'h-full w-full object-cover transition-all duration-700 ease-in-out',
                            isImageLoaded
                                ? 'blur-0 scale-100 grayscale-0'
                                : 'scale-105 blur-xl grayscale',
                        )}
                        src={project.image}
                        alt={project.title}
                        width={1920}
                        height={1080}
                        onLoad={() => setIsImageLoaded(true)}
                    />
                    {project.video && (
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:backdrop-blur-xs">
                                    <button
                                        type="button"
                                        aria-label={`Play preview video for ${project.title}`}
                                        className="flex size-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 group-hover:cursor-pointer hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
                                        onClick={() =>
                                            trackProject('play_video')
                                        }
                                    >
                                        <PlayCircle />
                                    </button>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="w-full max-w-4xl border-0 p-0">
                                <div className="aspect-video w-full">
                                    <video
                                        className="h-full w-full rounded-lg object-cover"
                                        src={project.video}
                                        autoPlay
                                        loop
                                        controls
                                    />
                                </div>
                                <DialogTitle className="sr-only">
                                    {project.title}
                                </DialogTitle>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </CardHeader>

            <CardContent className="px-6 pt-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <Link
                            href={project.projectDetailsPageSlug}
                            onClick={() => trackProject('view_details')}
                            className="focus-visible:ring-primary rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
                        >
                            <h3 className="group-hover:text-primary text-xl leading-tight font-semibold transition-colors hover:cursor-pointer">
                                {project.title}
                            </h3>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        className="text-secondary hover:text-primary focus-visible:ring-primary flex size-6 items-center justify-center rounded-sm transition-colors focus:outline-none focus-visible:ring-2"
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() =>
                                            trackProject('visit_website')
                                        }
                                    >
                                        <Website />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>View Website</p>
                                </TooltipContent>
                            </Tooltip>
                            {project.github && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            className="text-secondary hover:text-primary focus-visible:ring-primary flex size-6 items-center justify-center rounded-sm transition-colors focus:outline-none focus-visible:ring-2"
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() =>
                                                trackProject('visit_github')
                                            }
                                        >
                                            <Github />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>View GitHub</p>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                    </div>

                    <p className="text-secondary line-clamp-3 text-sm">
                        {project.description}
                    </p>

                    <div>
                        <h4 className="text-secondary mb-2 text-sm font-medium">
                            Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((technology, index) => (
                                <Tooltip key={index}>
                                    <TooltipTrigger asChild>
                                        <div className="size-6 transition-all duration-300 hover:scale-120 hover:cursor-pointer">
                                            {technology.icon}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{technology.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>

            {project.details && (
                <CardFooter className="flex justify-between p-6 pt-0">
                    <div
                        className={cn(
                            'flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs',
                            project.isWorking
                                ? 'border-green-300/50 bg-green-500/10 text-green-600 dark:text-green-400'
                                : 'border-red-300/50 bg-red-500/10 text-red-600 dark:text-red-400',
                        )}
                    >
                        <div
                            className={cn(
                                'size-2 animate-pulse rounded-full',
                                project.isWorking
                                    ? 'bg-green-500'
                                    : 'bg-red-500',
                            )}
                        />
                        {project.isWorking
                            ? 'All Systems Operational'
                            : 'Building'}
                    </div>
                    <Link
                        href={project.projectDetailsPageSlug}
                        className="text-secondary hover:text-primary focus-visible:ring-primary flex items-center gap-2 rounded-sm text-sm underline-offset-4 transition-colors hover:underline focus:outline-none focus-visible:ring-2"
                        onClick={() => trackProject('view_details')}
                    >
                        View Details <ArrowRight className="size-4" />
                    </Link>
                </CardFooter>
            )}
        </Card>
    );
}
