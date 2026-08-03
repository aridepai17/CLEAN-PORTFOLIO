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
            <Image
                alt={alt}
                className="my-6 h-auto w-full rounded-lg object-cover md:my-8"
                height={400}
                src={src}
                width={800}
                {...props}
            />
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
                className="mt-8 mb-4 text-2xl font-bold tracking-tight md:mt-12 md:mb-6 md:text-3xl"
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
                className="mt-6 mb-3 text-xl font-normal tracking-tight md:mt-8 md:mb-4 md:text-2xl"
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
                className="text-muted-foreground mb-5 leading-relaxed md:mb-6"
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
            className="text-primary underline-offset-4 hover:underline"
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
            <ul
                className="mb-5 ml-4 list-disc space-y-2 md:mb-6 md:ml-6"
                {...props}
            >
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
            <ol
                className="mb-5 ml-4 list-decimal space-y-2 md:mb-6 md:ml-6"
                {...props}
            >
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
                <div className="not-prose group md:glass-panel border-border/30 md:border-border/50 bg-background/30 md:bg-background/50 text-foreground relative my-6 overflow-hidden rounded-xl border backdrop-blur-sm md:my-8">
                    <pre
                        className="[&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 !m-0 max-h-[50vh] [scrollbar-width:thin] overflow-x-auto overflow-y-auto !bg-transparent !p-5 font-mono text-sm leading-relaxed transition-colors md:max-h-[70vh] md:!p-8 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
                        {...props}
                    >
                        {children}
                    </pre>
                    <div className="absolute top-5 right-5 z-20 opacity-100 transition-opacity md:top-8 md:right-8 md:opacity-0 md:group-hover:opacity-100">
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

        // This handles simple inline code (`like this`)
        return (
            <code
                className="bg-muted text-foreground rounded-md px-1.5 py-0.5 font-mono text-[0.875em] font-medium break-words"
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
                className="border-primary bg-muted/20 text-muted-foreground my-6 rounded-r-lg border-l-4 p-4 italic md:my-8 md:p-6"
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
            <div className="not-prose border-border/50 bg-background/60 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 my-6 w-full [scrollbar-width:thin] overflow-x-auto rounded-xl border shadow-sm backdrop-blur-md md:my-8 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                <table
                    className="font-monoheavy w-full border-collapse text-left text-sm md:text-base"
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
            className="font-monoheavy border-border/50 bg-muted/50 border-b"
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
        <tr className="hover:bg-muted/30 transition-colors" {...props}>
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
            className="text-muted-foreground px-4 py-3 text-xs font-semibold tracking-wider whitespace-nowrap uppercase md:px-6 md:py-4 md:text-sm"
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
            className="font-monoheavy text-foreground/90 min-w-[150px] px-4 py-3 leading-relaxed md:px-6 md:py-4"
            {...props}
        >
            {children}
        </td>
    ),
};
