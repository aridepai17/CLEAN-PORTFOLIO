import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import Python from '@/components/technologies/Python';
import React from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';

export interface AboutConfig {
    name: string;
    description: string;
}

export const mySkills = [
    <Python key="python" />,
    <React key="react" />,
    <TypeScript key="typescript" />,
    <NextJs key="nextjs" />,
    <MongoDB key="mongodb" />,
];

export const about: AboutConfig = {
    name: 'Advaith R Pai',
    description:
        "I'm a Software Engineer passionate about building AI-powered and full-stack applications. I enjoy creating performant web experiences, solving real-world problems with intelligent systems, and continuously learning modern technologies.",
};
