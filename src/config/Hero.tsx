import GitHubIcon from '@/components/svgs/GitHubIcon';
import LinkedInIcon from '@/components/svgs/LinkedInIcon';
import MailIcon from '@/components/svgs/MailIcon';
import XIcon from '@/components/svgs/XIcon';
import GSAP from '@/components/technologies/GSAP';
import Git from '@/components/technologies/Git';
import GitHub from '@/components/technologies/GitHub';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import Python from '@/components/technologies/Python';
import React from '@/components/technologies/ReactIcon';
import Supabase from '@/components/technologies/Supabase';
import TailwindCSS from '@/components/technologies/Tailwindcss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';

export interface Skill {
    name: string;
    href: string;
    component: keyof typeof skillComponents;
}

export interface HeroConfig {
    name: string;
    title: string;
    avatar: string;
    skills: Skill[];
    description: { template: string };
    buttons: {
        variant: 'outline' | 'default';
        text: string;
        href: string;
        icon: string;
    }[];
}

export const skillComponents = {
    Python,
    React,
    JavaScript,
    TypeScript,
    NextJs,
    TailwindCSS,
    MongoDB,
    Git,
    GitHub,
    Vercel,
    Supabase,
    GSAP,
};

export const heroConfig: HeroConfig = {
    name: 'Advaith R Pai',
    title: 'Software Engineer',
    avatar: '/assets/logo.jpg',

    skills: [
        {
            name: 'Python',
            href: 'https://python.org/',
            component: 'Python',
        },
        {
            name: 'React',
            href: 'https://react.dev/',
            component: 'React',
        },
        {
            name: 'JavaScript',
            href: 'https://developer.mozilla.org/docs/Web/JavaScript',
            component: 'JavaScript',
        },
        {
            name: 'Tailwind CSS',
            href: 'https://tailwindcss.com/',
            component: 'TailwindCSS',
        },
        {
            name: 'MongoDB',
            href: 'https://www.mongodb.com/',
            component: 'MongoDB',
        },
        {
            name: 'Git',
            href: 'https://git-scm.com/',
            component: 'Git',
        },
        {
            name: 'GitHub',
            href: 'https://github.com/',
            component: 'GitHub',
        },
        {
            name: 'TypeScript',
            href: 'https://www.typescriptlang.org/',
            component: 'TypeScript',
        },
        {
            name: 'Next.js',
            href: 'https://nextjs.org/',
            component: 'NextJs',
        },
        {
            name: 'Vercel',
            href: 'https://vercel.com/',
            component: 'Vercel',
        },
        {
            name: 'Supabase',
            href: 'https://supabase.com/',
            component: 'Supabase',
        },
        {
            name: 'GSAP',
            href: 'https://gsap.com/',
            component: 'GSAP',
        },
    ],

    description: {
        template:
            "I'm a Software Engineer who builds AI-powered, full-stack applications with {skills:0}, {skills:1}, {skills:7}, {skills:8}, and {skills:9}",
    },

    buttons: [
        {
            variant: 'outline',
            text: 'Resume / CV',
            href: '/resume',
            icon: 'CV',
        },
        {
            variant: 'default',
            text: 'Get in touch',
            href: '/contact',
            icon: 'Chat',
        },
    ],
};

export const socialLinks = [
    { name: 'X', href: 'https://x.com/rpaiv17', icon: <XIcon /> },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/advaithrpai/',
        icon: <LinkedInIcon />,
    },
    {
        name: 'GitHub',
        href: 'https://github.com/aridepai17',
        icon: <GitHubIcon />,
    },
    {
        name: 'Email',
        href: 'mailto:advaithdepai26@gmail.com',
        icon: <MailIcon />,
    },
];
