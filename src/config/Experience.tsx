import Librosa from '@/components/technologies/Librosa';
import Matplotlib from '@/components/technologies/Matplotlib';
import NumPy from '@/components/technologies/NumPy';
import Python from '@/components/technologies/Python';
import ScikitLearn from '@/components/technologies/ScikitLearn';
import TensorFlow from '@/components/technologies/TensorFlow';
import type React from 'react';

export interface Technology {
    name: string;
    href: string;
    icon: React.ReactNode;
}

export interface Experience {
    company: string;
    position: string;
    location: string;
    image: string;
    description: string[];
    startDate: string;
    endDate: string;
    website: string;
    x?: string;
    linkedin?: string;
    github?: string;
    technologies: Technology[];
    isCurrent: boolean;
    isBlur?: boolean;
}

export const experiences: Experience[] = [
    {
        company: 'DRDO - Naval Physical & Oceanographic Laboratory (NPOL)',
        position: 'Research Intern',
        location: 'Kochi, India',
        image: '/company/drdo-npol.png',
        description: [
            "Architected a scalable deep learning framework for automated passive sonar classification, directly enabling NPOL's underwater acoustics surveillance capabilities.",
            'Engineered a memory-efficient data pipeline to systematically chunk high-resolution audio files into compressed .npz tensors, mitigating cloud Out-of-Memory (OOM) bottlenecks during scale-up.',
            'Scaled the DWSTr deep learning framework to process the massive 47-hour DeepShip real-world acoustic dataset, targeting the classification of 265 distinct vessels across 4 commercial categories.',
            'Presented the model to senior leadership, facilitating high engagement Q&A to gather actionable feedback for iterative model enhancements',
        ],
        startDate: 'June 2026',
        endDate: 'Present',
        website: 'https://drdo.gov.in/drdo/en/',
        technologies: [
            {
                name: 'Python',
                href: 'https://python.org/',
                icon: <Python />,
            },
            {
                name: 'TensorFlow',
                href: 'https://www.tensorflow.org/',
                icon: <TensorFlow />,
            },
            {
                name: 'NumPy',
                href: 'https://numpy.org/',
                icon: <NumPy />,
            },
            {
                name: 'Scikit-learn',
                href: 'https://scikit-learn.org/',
                icon: <ScikitLearn />,
            },
            {
                name: 'Librosa',
                href: 'https://librosa.org/',
                icon: <Librosa />,
            },
            {
                name: 'Matplotlib',
                href: 'https://matplotlib.org/',
                icon: <Matplotlib />,
            },
        ],
        isCurrent: true,
    },
    {
        company: 'DRDO - Naval Physical & Oceanographic Laboratory (NPOL)',
        position: 'Research Intern',
        location: 'Kochi, India',
        image: '/company/drdo-npol.png',
        description: [
            'Built the initial end-to-end audio pipeline processing 10,000+ sonar samples into Mel-spectrograms, reducing preprocessing latency by 35%.',
            'Developed the foundational hybrid DWSTr (Depthwise Separable CNN + Transformer) model, achieving a benchmark 97.17% accuracy across 12 vessel categories by implementing square root class-weight smoothing to resolve severe dataset imbalances.',
        ],
        startDate: 'September 2025',
        endDate: 'December 2025',
        website: 'https://drdo.gov.in/drdo/en/',
        technologies: [
            {
                name: 'Python',
                href: 'https://python.org/',
                icon: <Python />,
            },
            {
                name: 'TensorFlow',
                href: 'https://www.tensorflow.org/',
                icon: <TensorFlow />,
            },
            {
                name: 'NumPy',
                href: 'https://numpy.org/',
                icon: <NumPy />,
            },
            {
                name: 'Scikit-learn',
                href: 'https://scikit-learn.org/',
                icon: <ScikitLearn />,
            },
            {
                name: 'Librosa',
                href: 'https://librosa.org/',
                icon: <Librosa />,
            },
            {
                name: 'Matplotlib',
                href: 'https://matplotlib.org/',
                icon: <Matplotlib />,
            },
        ],
        isCurrent: false,
    },
];
