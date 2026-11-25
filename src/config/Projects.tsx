import CSS from '@/components/technologies/CSS';
import Clerk from '@/components/technologies/Clerk';
import Convex from '@/components/technologies/Convex';
import Docker from '@/components/technologies/Docker';
import ExpressJs from '@/components/technologies/ExpressJs';
import FinnhubApi from '@/components/technologies/FinnhubApi';
import GSAP from '@/components/technologies/GSAP';
import Groq from '@/components/technologies/Groq';
import Html from '@/components/technologies/Html';
import Inngest from '@/components/technologies/Inngest';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import PuterJs from '@/components/technologies/PuterJs';
import Python from '@/components/technologies/Python';
import Razorpay from '@/components/technologies/Razorpay';
import ReactIcon from '@/components/technologies/ReactIcon';
import ReactRouter from '@/components/technologies/ReactRouter';
import Strapi from '@/components/technologies/Strapi';
import TailwindCSS from '@/components/technologies/Tailwindcss';
import TradingView from '@/components/technologies/TradingView';
import TypeScript from '@/components/technologies/TypeScript';
import Vite from '@/components/technologies/Vite';
import Zod from '@/components/technologies/Zod';
import Zustand from '@/components/technologies/Zustand';
import type { Project } from '@/types/project';
import type React from 'react';

export const projects: Project[] = [
    {
        title: 'SELECTRA',
        description:
            'An AI-powered ATS resume optimization platform that performs client-side PDF rasterization and LLM-driven keyword analysis to improve job application success rates.',
        image: '/project/selectra.png',
        link: 'https://selectraresume.vercel.app',
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'Tailwind CSS', icon: <TailwindCSS key="tailwind" /> },
            { name: 'Zustand', icon: <Zustand key="zustand" /> },
            { name: 'Vite', icon: <Vite key="vite" /> },
            { name: 'React Router', icon: <ReactRouter key="reactrouter" /> },
            { name: 'Puter.js', icon: <PuterJs key="puterjs" /> },
        ],
        github: 'https://github.com/aridepai17/selectra',
        live: 'https://selectraresume.vercel.app/',
        details: true,
        projectDetailsPageSlug: '/projects/selectra',
        isWorking: true,
    },
    {
        title: 'SERVD',
        description:
            'AI-powered kitchen assistant that recognizes pantry ingredients from images, generates personalized recipes, and helps users manage meals with secure authentication and subscriptions.',
        image: '/project/servd.png',
        link: 'https://servdai.vercel.app/',
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'Tailwind CSS', icon: <TailwindCSS key="tailwind" /> },
            { name: 'Strapi', icon: <Strapi key="strapi" /> },
            { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
            { name: 'Groq', icon: <Groq key="groq" /> },
            { name: 'Clerk', icon: <Clerk key="clerk" /> },
            { name: 'Razorpay', icon: <Razorpay key="razorpay" /> },
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
        link: 'https://roomify-virid-three.vercel.app/',
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'Tailwind CSS', icon: <TailwindCSS key="tailwind" /> },
            { name: 'Docker', icon: <Docker key="docker" /> },
            { name: 'Puter.js', icon: <PuterJs key="puterjs" /> },
        ],
        github: 'https://github.com/aridepai17/ROOMIFY',
        live: 'https://roomify-virid-three.vercel.app/',
        details: true,
        projectDetailsPageSlug: '/projects/roomify',
        isWorking: true,
    },
    {
        title: 'WORLD CUP ORACLE',
        description:
            'A full-stack sports analytics platform for the 2026 FIFA World Cup featuring historical Elo ratings, Poisson-based match modeling, and Monte Carlo simulations',
        image: '/project/worldcuporacle.png',
        link: 'https://worldcuporacle-eight.vercel.app/',
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'Tailwind CSS', icon: <TailwindCSS key="tailwind" /> },
            { name: 'Express', icon: <ExpressJs key="express" /> },
            { name: 'Zod', icon: <Zod key="zod" /> },
        ],
        github: 'https://github.com/aridepai17/worldcuporacle',
        live: 'https://worldcuporacle-eight.vercel.app/',
        details: true,
        projectDetailsPageSlug: '/projects/worldcuporacle',
        isWorking: true,
    },
    {
        title: 'SPLITR',
        description:
            'Full-stack expense splitting platform with real-time group expense tracking, automated balance calculations, settlement management, and AI-powered spending insights.',
        image: '/project/splitr.png',
        link: 'https://splitr-psi-bay.vercel.app/',
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'Tailwind CSS', icon: <TailwindCSS key="tailwind" /> },
            { name: 'Convex', icon: <Convex key="convex" /> },
            { name: 'Clerk', icon: <Clerk key="clerk" /> },
            { name: 'Inngest', icon: <Inngest key="inngest" /> },
        ],
        github: 'https://github.com/aridepai17/splitr',
        live: 'https://splitr-psi-bay.vercel.app/',
        details: true,
        projectDetailsPageSlug: '/projects/splitr',
        isWorking: true,
    },
    {
        title: 'SIGNALIST',
        description:
            'Full-stack stock market intelligence platform featuring real-time market dashboards, personalized watchlists, AI-powered news summaries, and live financial analytics.',
        image: '/project/signalist.png',
        link: 'https://signalistrealtimestocks.vercel.app/',
        technologies: [
            { name: 'Next.js', icon: <NextJs key="nextjs" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'Tailwind CSS', icon: <TailwindCSS key="tailwind" /> },
            { name: 'MongoDB', icon: <MongoDB key="mongodb" /> },
            { name: 'Inngest', icon: <Inngest key="inngest" /> },
            { name: 'Finnhub API', icon: <FinnhubApi key="finnhubapi" /> },
            { name: 'TradingView', icon: <TradingView key="tradingview" /> },
        ],
        github: 'https://github.com/aridepai17/SIGNALIST',
        live: 'https://signalistrealtimestocks.vercel.app/',
        details: true,
        projectDetailsPageSlug: '/projects/signalist',
        isWorking: true,
    },
    {
        title: 'MacOS PORTFOLIO',
        description:
            'Interactive portfolio that recreates the macOS desktop experience with draggable windows, a functional dock, smooth animations, and desktop-inspired navigation.',
        image: '/project/macosportfolio.png',
        link: 'https://advaithrpai-portfolio.vercel.app/',
        technologies: [
            { name: 'React', icon: <ReactIcon key="react" /> },
            { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
            { name: 'Tailwind CSS', icon: <TailwindCSS key="tailwind" /> },
            { name: 'GSAP', icon: <GSAP key="gsap" /> },
            { name: 'Zustand', icon: <Zustand key="zustand" /> },
            { name: 'Vite', icon: <Vite key="vite" /> },
        ],
        github: 'https://github.com/aridepai17/ADVAITH-R-PAI-PORTFOLIO',
        live: 'https://advaithrpai-portfolio.vercel.app/',
        details: true,
        projectDetailsPageSlug: '/projects/macosportfolio',
        isWorking: true,
    },
    {
        title: 'PAPER CRAWLER',
        description:
            'A spider crawls down arXiv ML papers, marking up the words it walks over while Gemini explains each section in plain English. Add a paper from the library drawer, jump to any section, switch reading levels, and pick up where you left off.',
        image: '/project/papercrawler.png',
        technologies: [
            { name: 'Python', icon: <Python key="python" /> },
            { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
            { name: 'HTML', icon: <Html key="html" /> },
            { name: 'CSS', icon: <CSS key="css" /> },
        ],
        github: 'https://github.com/aridepai17/PAPER-CRAWLER',
        details: true,
        projectDetailsPageSlug: '/projects/papercrawler',
        isWorking: true,
    },
];
