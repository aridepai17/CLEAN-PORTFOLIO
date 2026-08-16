'use client';

import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import Skill from '../common/Skill';
import { TrackedLink } from '../common/TrackedLink';
import CV from '../svgs/CV';
import Chat from '../svgs/Chat';
import { buttonVariants } from '../ui/button-variants';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const buttonIcons = {
    CV: CV,
    Chat: Chat,
};

export default function Hero() {
    const { name, title, avatar, skills, description, buttons } = heroConfig;

    const renderDescription = () => {
        const parts = parseTemplate(description.template, skills);

        return parts.map((part) => {
            if (part.type === 'skill' && 'skill' in part && part.skill) {
                const SkillComponent =
                    skillComponents[
                        part.skill.component as keyof typeof skillComponents
                    ];
                return (
                    <Skill
                        key={part.key}
                        name={part.skill.name}
                        href={part.skill.href}
                    >
                        {SkillComponent && <SkillComponent />}
                    </Skill>
                );
            } else if (part.type === 'bold' && 'text' in part) {
                return (
                    <b
                        key={part.key}
                        className="text-foreground font-sans font-semibold whitespace-pre-wrap"
                    >
                        {part.text}
                    </b>
                );
            } else if (part.type === 'text' && 'text' in part) {
                return (
                    <span key={part.key} className="whitespace-pre-wrap">
                        {part.text}
                    </span>
                );
            }
            return null;
        });
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-1000 ease-out">
            <Container className="mx-auto max-w-5xl">
                {/* Profile Header Row */}
                <div className="flex items-center gap-6 md:gap-8">
                    <Image
                        src={avatar}
                        alt="hero"
                        width={128}
                        height={128}
                        className="border-border/50 size-24 shrink-0 rounded-full border object-cover shadow-sm md:size-32"
                    />

                    <div className="flex flex-col justify-center">
                        <h1 className="font-display text-foreground text-5xl leading-tight font-normal tracking-tight md:text-6xl lg:text-7xl">
                            {name}
                        </h1>
                        <p className="text-muted-foreground mt-2 font-sans text-lg md:text-xl">
                            {title}
                        </p>
                    </div>
                </div>

                {/* Bio Description Area */}
                <div className="mt-10 md:mt-12">
                    <div className="text-muted-foreground flex max-w-3xl flex-wrap items-center gap-x-1.5 gap-y-2 font-sans text-lg leading-relaxed md:text-xl">
                        {renderDescription()}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-10 flex gap-4">
                    {buttons.map((button, index) => {
                        const IconComponent =
                            buttonIcons[
                                button.icon as keyof typeof buttonIcons
                            ];
                        return (
                            <TrackedLink
                                key={index}
                                href={button.href}
                                track={{
                                    name: 'button_click',
                                    data: {
                                        buttonId: button.text,
                                        section: 'hero',
                                    },
                                }}
                                className={buttonVariants({
                                    variant: button.variant as
                                        'outline' | 'default',
                                })}
                            >
                                {IconComponent && (
                                    <IconComponent className="mr-2 size-4" />
                                )}
                                {button.text}
                            </TrackedLink>
                        );
                    })}
                </div>

                {/* Social Links */}
                <div className="mt-10 flex items-center gap-4">
                    {socialLinks.map((link) => (
                        <Tooltip key={link.name} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <TrackedLink
                                    href={link.href}
                                    key={link.name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
                                    track={{
                                        name: 'external_link_click',
                                        data: {
                                            url: link.href,
                                            text: link.name,
                                            location: 'hero_social',
                                        },
                                    }}
                                >
                                    <span className="flex size-6 items-center justify-center">
                                        {link.icon}
                                    </span>
                                    <span className="sr-only">{link.name}</span>
                                </TrackedLink>
                            </TooltipTrigger>
                            <TooltipContent className="font-sans text-xs font-medium">
                                <p>{link.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </Container>
        </div>
    );
}
