import Git from '@/components/technologies/Git';
import JavaScript from '@/components/technologies/JavaScript';
import Matplotlib from '@/components/technologies/Matplotlib';
import NextJs from '@/components/technologies/NextJs';
import NumPy from '@/components/technologies/NumPy';
import Python from '@/components/technologies/Python';
import React from '@/components/technologies/ReactIcon';
import ScikitLearn from '@/components/technologies/ScikitLearn';
import TailwindCSS from '@/components/technologies/Tailwindcss';
import TensorFlow from '@/components/technologies/TensorFlow';
import TypeScript from '@/components/technologies/TypeScript';

export interface AboutConfig {
    name: string;
    description: string;
}

export const mySkills = [
    <Python key="python" />,
    <React key="react" />,
    <TailwindCSS key="tailwindcss" />,
    <JavaScript key="javascript" />,
    <TypeScript key="typescript" />,
    <NextJs key="nextjs" />,
    <TensorFlow key="tensorflow" />,
    <ScikitLearn key="scikit-learn" />,
    <Matplotlib key="matplotlib" />,
    <NumPy key="numpy" />,
    <Git key="git" />,
];

export const about: AboutConfig = {
    name: 'Advaith R Pai',
    description:
        "I'm a Software Engineer passionate about building AI-powered and full-stack applications. I enjoy creating performant web experiences, solving real-world problems with intelligent systems, and continuously learning modern technologies.",
};
