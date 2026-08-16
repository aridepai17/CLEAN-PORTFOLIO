import Reveal from '@/components/common/Reveal';
import GSAP from '@/components/technologies/GSAP';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCSS from '@/components/technologies/Tailwindcss';
import TypeScript from '@/components/technologies/TypeScript';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import React from 'react';

import { CodeCopyButton } from '../blog/CodeCopyButton';

const TechnologyComponents: Record<string, React.ComponentType> = {
    'Next.js': NextJs,
    nextjs: NextJs,
    TypeScript: TypeScript,
    typescript: TypeScript,
    'Tailwind CSS': TailwindCSS,
    tailwindcss: TailwindCSS,
    React: ReactIcon,
    react: ReactIcon,
    GSAP: GSAP,
    gsap: GSAP,
    MongoDB: MongoDB,
    mongodb: MongoDB,
};

const Technology = ({ name }: { name: string }) => {
    const TechComponent =
        TechnologyComponents[name] || TechnologyComponents[name.toLowerCase()];

    return (
        <div className="bg-muted/50 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium">
            {TechComponent && <TechComponent />}
            <span>{name}</span>
        </div>
    );
};

const TechStack = ({ technologies }: { technologies: string[] }) => {
    return (
        <div className="bg-muted/20 my-6 rounded-lg border p-4">
            <h4 className="font-display mb-3 text-2xl font-normal">
                Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                    <Technology key={tech} name={tech} />
                ))}
            </div>
        </div>
    );
};

const ProjectMeta = ({
    timeline,
    role,
    team,
    status,
}: {
    timeline?: string;
    role?: string;
    team?: string;
    status?: string;
}) => {
    return (
        <div className="bg-muted/20 my-6 grid gap-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4">
            {timeline && (
                <div>
                    <h5 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                        Timeline
                    </h5>
                    <p className="text-sm">{timeline}</p>
                </div>
            )}
            {role && (
                <div>
                    <h5 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                        Role
                    </h5>
                    <p className="text-sm">{role}</p>
                </div>
            )}
            {team && (
                <div>
                    <h5 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                        Team
                    </h5>
                    <p className="text-sm">{team}</p>
                </div>
            )}
            {status && (
                <div>
                    <h5 className="text-muted-foreground mb-1 text-sm font-semibold tracking-wide uppercase">
                        Status
                    </h5>
                    <Badge
                        variant={
                            status === 'completed'
                                ? 'default'
                                : status === 'in-progress'
                                  ? 'outline'
                                  : 'secondary'
                        }
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                </div>
            )}
        </div>
    );
};

const Challenges = ({ challenges }: { challenges: string[] }) => {
    return (
        <div className="my-6 rounded-lg border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800/50 dark:bg-yellow-950/20">
            <h4 className="font-display mb-4 text-2xl font-normal text-yellow-900 dark:text-yellow-200">
                Key Challenges
            </h4>
            <ul className="space-y-3">
                {challenges.map((challenge, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-3 text-sm leading-relaxed text-yellow-800 dark:text-yellow-300"
                    >
                        <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-yellow-500 dark:bg-yellow-400" />
                        {challenge}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Learnings = ({ learnings }: { learnings: string[] }) => {
    return (
        <div className="my-6 rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800/50 dark:bg-green-950/20">
            <h4 className="font-display mb-4 text-2xl font-normal text-green-900 dark:text-green-200">
                Key Learnings
            </h4>
            <ul className="space-y-3">
                {learnings.map((learning, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-3 text-sm leading-relaxed text-green-800 dark:text-green-300"
                    >
                        <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-green-500 dark:bg-green-400" />
                        {learning}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const FormulaCard = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <div className="group glass-panel hover:border-border relative my-6 overflow-hidden p-5 transition-all">
            {/* Glowing left accent border */}
            <div className="bg-primary/80 group-hover:bg-primary absolute top-0 left-0 h-full w-1 transition-colors" />

            {/* Header label */}
            <h5 className="text-muted-foreground mb-3 flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase">
                <span className="bg-primary size-2 animate-pulse rounded-full" />
                {title}
            </h5>

            {/* Formula content container */}
            <div className="text-foreground overflow-x-auto overflow-y-hidden py-1 font-mono text-sm leading-relaxed">
                {children}
            </div>
        </div>
    );
};

export const ProjectComponents = {
    img: ({
        src,
        alt,
        ...props
    }: {
        src?: string;
        alt?: string;
        [key: string]: unknown;
    }) => (
        <span className="my-4 inline-block overflow-hidden rounded-xl align-middle">
            <Image
                alt={alt || 'Blog image'}
                className="h-auto max-w-full rounded-xl object-cover"
                height={600}
                src={src as string}
                width={1200}
                {...props}
            />
            {alt && (
                <span className="text-muted-foreground mt-2 block text-center text-xs font-medium">
                    {alt}
                </span>
            )}
        </span>
    ),

    // 💡 THE FIX: Swapped to Instrument Serif (font-display)
    h1: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <h1
            className="font-display mb-6 text-4xl font-normal lg:text-5xl"
            {...props}
        >
            {children}
        </h1>
    ),

    // 💡 THE FIX: Swapped to Instrument Serif (font-display)
    h2: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <Reveal>
            <h2
                className="font-display mt-12 mb-6 text-3xl font-normal lg:text-4xl"
                {...props}
            >
                {children}
            </h2>
        </Reveal>
    ),

    // 💡 THE FIX: Swapped to Instrument Serif (font-display)
    h3: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <Reveal>
            <h3
                className="font-display mt-8 mb-4 text-2xl font-normal lg:text-3xl"
                {...props}
            >
                {children}
            </h3>
        </Reveal>
    ),

    p: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <Reveal>
            <p
                className="text-muted-foreground mb-6 leading-relaxed"
                {...props}
            >
                {children}
            </p>
        </Reveal>
    ),

    ul: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <Reveal>
            <ul className="mb-6 ml-6 space-y-2" {...props}>
                {children}
            </ul>
        </Reveal>
    ),

    ol: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <Reveal>
            <ol className="mb-6 ml-6 list-decimal space-y-2" {...props}>
                {children}
            </ol>
        </Reveal>
    ),

    li: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <li
            className="text-muted-foreground relative pl-2 leading-relaxed"
            {...props}
        >
            <span className="bg-primary/50 absolute top-2.5 -left-4 block size-1.5 rounded-full" />
            {children}
        </li>
    ),

    pre: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => {
        const getTextContent = (node: React.ReactNode): string => {
            if (typeof node === 'string') return node;
            if (typeof node === 'number') return String(node);
            if (
                React.isValidElement(node) &&
                node.props &&
                typeof node.props === 'object'
            ) {
                return getTextContent(
                    (node.props as { children?: React.ReactNode }).children,
                );
            }
            if (Array.isArray(node)) return node.map(getTextContent).join('');
            return '';
        };

        const codeText = getTextContent(children);

        return (
            <Reveal>
                <div className="group glass-panel relative mb-8 overflow-hidden p-7">
                    <pre
                        className="overflow-x-auto overflow-y-hidden bg-transparent p-5 text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0"
                        {...props}
                    >
                        {children}
                    </pre>
                    <CodeCopyButton code={codeText} />
                </div>
            </Reveal>
        );
    },

    code: ({
        children,
        className,
        ...props
    }: {
        children: React.ReactNode;
        className?: string;
        [key: string]: unknown;
    }) => {
        if (className?.includes('language-')) {
            return (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }

        return (
            <code
                className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm"
                {...props}
            >
                {children}
            </code>
        );
    },

    blockquote: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <Reveal>
            <blockquote
                className="border-primary/50 text-foreground/90 bg-muted/20 my-8 border-l-4 py-4 pr-4 pl-6 italic"
                {...props}
            >
                {children}
            </blockquote>
        </Reveal>
    ),

    Technology,
    TechStack,
    ProjectMeta,
    Challenges,
    Learnings,
    FormulaCard,
};
