import GSAP from '@/components/technologies/GSAP';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCSS from '@/components/technologies/Tailwindcss';
import TypeScript from '@/components/technologies/TypeScript';
import type { Project } from '@/types/project';
import type React from 'react';

export const projects: Project[] = [
    {
        title: 'SELECTRA',
        description:
            'ATS resume optimization tool that analyzes and rewrites resumes to improve applicant-tracking-system scores.',
        image: '/project/selectra.png',
        link: 'https://github.com/aridepai17/selectra',
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'Tailwind CSS', icon: <TailwindCSS key="tailwind" /> },
        ],
        github: 'https://github.com/aridepai17/selectra',
        live: 'https://selectra-nine.vercel.app/',
        details: true,
        projectDetailsPageSlug: '/projects/selectra',
        isWorking: true,
    },
    {
        title: 'SERVD',
        description:
            'AI-powered kitchen assistant that recognizes pantry ingredients from images, generates personalized recipes, and helps users manage meals with secure authentication and subscriptions.',
        image: '/project/servd.png',
        link: 'https://github.com/aridepai17/servd',
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'Tailwind CSS', icon: <TailwindCSS key="tailwind" /> },
        ],
        github: 'https://github.com/aridepai17/servd',
        live: 'https://servdai.vercel.app/',
        details: true,
        projectDetailsPageSlug: '/projects/servd',
        isWorking: true,
    },
    {
        title: 'ROOMIFY',
        description:
            'AI-powered architectural visualization platform that transforms 2D floor plans into photorealistic 3D renders with cloud-based project management.',
        image: '/project/roomify.png',
        link: 'https://github.com/aridepai17/ROOMIFY',
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'Tailwind CSS', icon: <TailwindCSS key="tailwind" /> },
        ],
        github: 'https://github.com/aridepai17/ROOMIFY',
        live: 'https://roomify-virid-three.vercel.app/',
        details: true,
        projectDetailsPageSlug: '/projects/roomify',
        isWorking: true,
    },
    {
        title: 'World Cup Oracle',
        description:
            'Full-stack sports analytics platform that predicts the 2026 FIFA World Cup using Elo ratings, Poisson goal models, and 10,000 Monte Carlo simulations with interactive tournament and match visualizations.',
        image: '/project/worldcuporacle.png',
        link: 'https://github.com/aridepai17/worldcuporacle',
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'Tailwind CSS', icon: <TailwindCSS key="tailwind" /> },
        ],
        github: 'https://github.com/aridepai17/worldcuporacle',
        live: 'https://worldcuporacle-eight.vercel.app/',
        details: true,
        projectDetailsPageSlug: '/projects/worldcuporacle',
        isWorking: true,
    },
    {
        title: 'Splitr',
        description:
            'Full-stack expense splitting platform with real-time group expense tracking, automated balance calculations, settlement management, and AI-powered spending insights.',
        image: '/project/splitr.png',
        link: 'https://github.com/aridepai17/splitr',
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'Tailwind CSS', icon: <TailwindCSS key="tailwind" /> },
        ],
        github: 'https://github.com/aridepai17/splitr',
        live: 'https://splitr-psi-bay.vercel.app/',
        details: true,
        projectDetailsPageSlug: '/projects/splitr',
        isWorking: true,
    },
    {
        title: 'Signalist',
        description:
            'Full-stack stock market intelligence platform featuring real-time market dashboards, personalized watchlists, AI-powered news summaries, and live financial analytics.',
        image: '/project/signalist.png',
        link: 'https://github.com/aridepai17/SIGNALIST',
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'Tailwind CSS', icon: <TailwindCSS key="tailwind" /> },
            { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
        ],
        github: 'https://github.com/aridepai17/SIGNALIST',
        live: 'https://signalistrealtimestocks.vercel.app/',
        details: true,
        projectDetailsPageSlug: '/projects/signalist',
        isWorking: true,
    },
    {
        title: 'MacOS Portfolio',
        description:
            'Interactive portfolio that recreates the macOS desktop experience with draggable windows, a functional dock, smooth animations, and desktop-inspired navigation.',
        image: '/project/macosportfolio.png',
        link: 'https://github.com/aridepai17/ADVAITH-R-PAI-PORTFOLIO',
        technologies: [
            { name: 'React', icon: <ReactIcon key="react" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'Tailwind CSS', icon: <TailwindCSS key="tailwind" /> },
            { name: 'GSAP', icon: <GSAP key="gsap" /> },
        ],
        github: 'https://github.com/aridepai17/ADVAITH-R-PAI-PORTFOLIO',
        live: 'https://advaithrpai-portfolio.vercel.app/',
        details: true,
        projectDetailsPageSlug: '/projects/macosportfolio',
        isWorking: true,
    },
];
