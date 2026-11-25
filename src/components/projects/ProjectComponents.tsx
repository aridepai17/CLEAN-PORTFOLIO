import Reveal from '@/components/common/Reveal';
import CSS from '@/components/technologies/CSS';
import Clerk from '@/components/technologies/Clerk';
import Convex from '@/components/technologies/Convex';
import Docker from '@/components/technologies/Docker';
import ExpressJs from '@/components/technologies/ExpressJs';
import FinnhubApi from '@/components/technologies/FinnhubApi';
import GSAP from '@/components/technologies/GSAP';
import GoogleGemini from '@/components/technologies/GoogleGemini';
import Groq from '@/components/technologies/Groq';
import Html from '@/components/technologies/Html';
import Inngest from '@/components/technologies/Inngest';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import OpenAI from '@/components/technologies/OpenAI';
import PdfJs from '@/components/technologies/PdfJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import PuterJs from '@/components/technologies/PuterJs';
import Razorpay from '@/components/technologies/Razorpay';
import ReactIcon from '@/components/technologies/ReactIcon';
import ReactRouter from '@/components/technologies/ReactRouter';
import Recharts from '@/components/technologies/Recharts';
import Strapi from '@/components/technologies/Strapi';
import TailwindCSS from '@/components/technologies/Tailwindcss';
import TradingView from '@/components/technologies/TradingView';
import TypeScript from '@/components/technologies/TypeScript';
import Vite from '@/components/technologies/Vite';
import Zod from '@/components/technologies/Zod';
import Zustand from '@/components/technologies/Zustand';
import { Badge } from '@/components/ui/badge';
import React from 'react';

import { CodeCopyButton } from '../blog/CodeCopyButton';
import { DiagramSection } from './DiagramSection';

const TechnologyComponents: Record<string, React.ComponentType> = {
    'Next.js': NextJs,
    nextjs: NextJs,
    'Next.js 15': NextJs,
    'next.js 15': NextJs,
    TypeScript: TypeScript,
    typescript: TypeScript,
    'Tailwind CSS': TailwindCSS,
    tailwindcss: TailwindCSS,
    'Tailwind CSS 4': TailwindCSS,
    'tailwind css 4': TailwindCSS,
    React: ReactIcon,
    react: ReactIcon,
    'React 19': ReactIcon,
    'react 19': ReactIcon,
    GSAP: GSAP,
    gsap: GSAP,
    MongoDB: MongoDB,
    mongodb: MongoDB,
    'MongoDB Atlas': MongoDB,
    'mongodb atlas': MongoDB,
    Zustand: Zustand,
    zustand: Zustand,
    Vite: Vite,
    vite: Vite,
    'Vite 7': Vite,
    'vite 7': Vite,
    'React Router': ReactRouter,
    'react router': ReactRouter,
    PuterJs: PuterJs,
    puterjs: PuterJs,
    OpenAI: OpenAI,
    openai: OpenAI,
    'PDF.js': PdfJs,
    'pdf.js': PdfJs,
    Strapi: Strapi,
    strapi: Strapi,
    PostgreSQL: PostgreSQL,
    postgresql: PostgreSQL,
    Groq: Groq,
    groq: Groq,
    GoogleGemini: GoogleGemini,
    'google gemini': GoogleGemini,
    'Gemini API': GoogleGemini,
    'gemini api': GoogleGemini,
    'Gemini AI': GoogleGemini,
    'gemini ai': GoogleGemini,
    Clerk: Clerk,
    clerk: Clerk,
    Razorpay: Razorpay,
    razorpay: Razorpay,
    Convex: Convex,
    convex: Convex,
    Inngest: Inngest,
    inngest: Inngest,
    Express: ExpressJs,
    express: ExpressJs,
    Docker: Docker,
    docker: Docker,
    Zod: Zod,
    zod: Zod,
    Recharts: Recharts,
    recharts: Recharts,
    Html: Html,
    html: Html,
    CSS: CSS,
    css: CSS,
    FinnhubApi: FinnhubApi,
    finnhubapi: FinnhubApi,
    TradingView: TradingView,
    tradingview: TradingView,
};

const Technology = ({ name }: { name: string }) => {
    const TechComponent =
        TechnologyComponents[name] || TechnologyComponents[name.toLowerCase()];

    return (
        <div className="bg-muted/50 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium">
            {TechComponent && (
                <div className="size-4 shrink-0">
                    <TechComponent />
                </div>
            )}
            <span>{name}</span>
        </div>
    );
};

const TechStack = ({ technologies }: { technologies: string[] }) => {
    return (
        <div className="glass-panel my-6 rounded-lg border p-4">
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
        <div className="glass-panel my-6 grid gap-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="glass-panel border-primary/50 my-6 p-6">
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
        <div className="glass-panel border-primary/50 my-6 p-6">
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
        caption,
    }: {
        src?: string;
        alt?: string;
        caption?: string;
    }) => (
        <DiagramSection
            src={src as string}
            alt={alt || 'Project diagram'}
            caption={caption}
        />
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
                <code className={`${className}`} {...props}>
                    {children}
                </code>
            );
        }

        return (
            <code
                className="bg-muted/50 border-border/50 rounded-md border px-1.5 py-0.5 font-mono text-[0.875em] font-medium"
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
                className="glass-panel border-primary/50 text-foreground/90 my-8 p-6"
                {...props}
            >
                {children}
            </blockquote>
        </Reveal>
    ),

    table: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <div className="mb-8 overflow-x-auto">
            <table
                className="text-foreground w-full text-sm leading-relaxed"
                {...props}
            >
                {children}
            </table>
        </div>
    ),

    thead: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => <thead {...props}>{children}</thead>,

    tbody: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => <tbody {...props}>{children}</tbody>,

    tr: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => <tr {...props}>{children}</tr>,

    th: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <th
            className="text-muted-foreground border-border/50 border-b px-4 pb-3 text-left text-xs font-semibold tracking-wider uppercase"
            {...props}
        >
            {children}
        </th>
    ),

    td: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <td
            className="border-border/50 border-b px-4 py-3 align-top"
            {...props}
        >
            {children}
        </td>
    ),

    Technology,
    TechStack,
    ProjectMeta,
    Challenges,
    Learnings,
    FormulaCard,
};
