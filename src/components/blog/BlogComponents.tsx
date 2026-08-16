import Reveal from '@/components/common/Reveal';
import katex from 'katex';
import Image from 'next/image';
import React from 'react';

import { CodeCopyButton } from './CodeCopyButton';

const Math = ({
    formula,
    inline = false,
}: {
    formula: string;
    inline?: boolean;
}) => {
    const html = katex.renderToString(formula, {
        throwOnError: false,
        displayMode: !inline,
    });
    return (
        <span
            dangerouslySetInnerHTML={{ __html: html }}
            className={inline ? '' : 'my-4 block'}
        />
    );
};

export const BlogComponents = {
    Math,

    // 💡 Styled as a framed figure with captions
    img: ({
        src,
        alt,
        ...props
    }: {
        src: string;
        alt: string;
        [key: string]: unknown;
    }) => (
        <Reveal>
            <figure className="border-border/50 bg-muted/10 my-10 overflow-hidden rounded-xl border shadow-sm">
                <div className="relative w-full">
                    <Image
                        alt={alt || 'Blog image'}
                        className="h-auto w-full object-cover"
                        height={600}
                        src={src}
                        width={1200}
                        {...props}
                    />
                </div>
                {alt && (
                    <figcaption className="border-border/50 text-muted-foreground border-t p-3 text-center text-sm font-medium">
                        {alt}
                    </figcaption>
                )}
            </figure>
        </Reveal>
    ),

    h2: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <Reveal>
            <h2
                className="font-display mt-12 mb-6 text-3xl font-normal tracking-tight md:text-4xl"
                {...props}
            >
                {children}
            </h2>
        </Reveal>
    ),

    h3: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <Reveal>
            <h3
                className="font-display mt-8 mb-4 text-2xl font-normal tracking-tight md:text-3xl"
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

    a: ({
        children,
        href,
        ...props
    }: {
        children: React.ReactNode;
        href?: string;
        [key: string]: unknown;
    }) => (
        <a
            className="text-foreground hover:text-primary decoration-primary/50 hover:decoration-primary underline underline-offset-4 transition-colors"
            href={href}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
        >
            {children}
        </a>
    ),

    ul: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <Reveal>
            <ul className="mb-6 ml-6 list-disc space-y-2" {...props}>
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
        <li className="text-muted-foreground leading-relaxed" {...props}>
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
                <div className="not-prose group glass-panel relative my-8 overflow-hidden">
                    <pre
                        className="[&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 !m-0 max-h-[60vh] [scrollbar-width:thin] overflow-x-auto overflow-y-auto !bg-transparent !p-6 font-mono text-sm leading-relaxed transition-colors md:max-h-[70vh] md:!p-8 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
                        {...props}
                    >
                        {children}
                    </pre>
                    <div className="absolute top-4 right-4 z-20 opacity-100 transition-opacity md:top-6 md:right-6 md:opacity-0 md:group-hover:opacity-100">
                        <div className="bg-background/80 border-border/50 hover:bg-background rounded-md border shadow-sm backdrop-blur-md transition-colors">
                            <CodeCopyButton code={codeText} />
                        </div>
                    </div>
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
                <code
                    className={`!m-0 !bg-transparent !p-0 text-inherit ${className}`}
                    {...props}
                >
                    {children}
                </code>
            );
        }

        // Handles simple inline code (`like this`)
        return (
            <code
                className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[0.875em] font-medium break-words"
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

    table: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <Reveal>
            <div className="not-prose glass-panel [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 my-8 w-full [scrollbar-width:thin] overflow-x-auto md:my-10 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                <table
                    className="w-full border-collapse text-left font-sans text-sm md:text-base"
                    {...props}
                >
                    {children}
                </table>
            </div>
        </Reveal>
    ),

    thead: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <thead
            className="border-border/50 bg-muted/30 border-b font-sans"
            {...props}
        >
            {children}
        </thead>
    ),

    tbody: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <tbody className="divide-border/50 divide-y bg-transparent" {...props}>
            {children}
        </tbody>
    ),

    tr: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <tr className="hover:bg-muted/20 transition-colors" {...props}>
            {children}
        </tr>
    ),

    th: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <th
            className="text-muted-foreground px-4 py-4 text-xs font-semibold tracking-wider whitespace-nowrap uppercase md:px-6 md:text-sm"
            {...props}
        >
            {children}
        </th>
    ),

    // 💡 THE FIX: Removed monoheavy entirely from table data
    td: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <td
            className="text-foreground/90 min-w-[150px] px-4 py-4 font-sans leading-relaxed md:px-6"
            {...props}
        >
            {children}
        </td>
    ),
};
