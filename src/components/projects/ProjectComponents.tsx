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
            <h4 className="mb-3 text-lg font-semibold">Technology Stack</h4>
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
                    <h5 className="text-muted-foreground text-sm font-semibold">
                        Timeline
                    </h5>
                    <p className="text-sm">{timeline}</p>
                </div>
            )}
            {role && (
                <div>
                    <h5 className="text-muted-foreground text-sm font-semibold">
                        Role
                    </h5>
                    <p className="text-sm">{role}</p>
                </div>
            )}
            {team && (
                <div>
                    <h5 className="text-muted-foreground text-sm font-semibold">
                        Team
                    </h5>
                    <p className="text-sm">{team}</p>
                </div>
            )}
            {status && (
                <div>
                    <h5 className="text-muted-foreground text-sm font-semibold">
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
        <div className="my-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
            <h4 className="mb-3 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                Key Challenges
            </h4>
            <ul className="space-y-2">
                {challenges.map((challenge, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-yellow-700 dark:text-yellow-300"
                    >
                        <span className="mt-1 block size-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400" />
                        {challenge}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Learnings = ({ learnings }: { learnings: string[] }) => {
    return (
        <div className="my-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
            <h4 className="mb-3 text-lg font-semibold text-green-800 dark:text-green-200">
                Key Learnings
            </h4>
            <ul className="space-y-2">
                {learnings.map((learning, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300"
                    >
                        <span className="mt-1 block size-1.5 rounded-full bg-green-500 dark:bg-green-400" />
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
        src: string;
        alt: string;
        [key: string]: unknown;
    }) => (
        <Image
            alt={alt}
            className="rounded-lg"
            height={400}
            src={src}
            width={800}
            {...props}
        />
    ),
    h1: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <h1 className="mb-6 text-4xl font-bold" {...props}>
            {children}
        </h1>
    ),
    h2: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <h2 className="mt-8 mb-4 text-3xl font-semibold" {...props}>
            {children}
        </h2>
    ),
    h3: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <h3 className="mt-6 mb-3 text-2xl font-medium" {...props}>
            {children}
        </h3>
    ),
    p: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <p className="text-muted-foreground mb-4 leading-7" {...props}>
            {children}
        </p>
    ),
    ul: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <ul className="mb-4 ml-6 list-disc space-y-2" {...props}>
            {children}
        </ul>
    ),
    ol: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <ol className="mb-4 ml-6 list-decimal space-y-2" {...props}>
            {children}
        </ol>
    ),
    li: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <li className="text-muted-foreground leading-7" {...props}>
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
            if (typeof node === 'string') {
                return node;
            }
            if (typeof node === 'number') {
                return String(node);
            }
            if (
                React.isValidElement(node) &&
                node.props &&
                typeof node.props === 'object'
            ) {
                return getTextContent(
                    (node.props as { children?: React.ReactNode }).children,
                );
            }
            if (Array.isArray(node)) {
                return node.map(getTextContent).join('');
            }
            return '';
        };

        const codeText = getTextContent(children);

        return (
            <div className="group glass-panel relative mb-6 overflow-hidden p-7">
                <pre
                    className="overflow-x-auto overflow-y-hidden bg-transparent p-5 text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0"
                    {...props}
                >
                    {children}
                </pre>
                <CodeCopyButton code={codeText} />
            </div>
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
            <code className="rounded px-2 py-1 font-mono text-sm" {...props}>
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
        <blockquote
            className="border-primary text-muted-foreground mb-4 border-l-4 pl-4 italic"
            {...props}
        >
            {children}
        </blockquote>
    ),

    Technology,
    TechStack,
    ProjectMeta,
    Challenges,
    Learnings,
    FormulaCard,
};
