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
            'Worked on naval applications research, focused on acoustic signal processing.',
            'Explored signal-processing techniques applied to underwater acoustic data relevant to naval systems.',
            'Gained exposure to a defense-research environment, translating theoretical signal-processing concepts into applied analysis.',
        ],
        startDate: 'Sept 2025',
        endDate: 'Oct 2025',
        website: 'https://www.npol.drdo.gov.in/',
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
