'use client';

import { type Experience, experiences } from '@/config/Experience';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { TrackedLink } from '../common/TrackedLink';
import { ExperienceCard } from '../experience/ExperienceCard';
import { buttonVariants } from '../ui/button-variants';

export default function Experience() {
    return (
        <Container className="mt-20">
            <SectionHeading
                id="experience"
                subHeading="Featured"
                heading="Experience"
            />
            <div className="mt-4 flex flex-col gap-8">
                {experiences.slice(0, 2).map((experience: Experience) => (
                    <ExperienceCard
                        key={experience.company}
                        experience={experience}
                    />
                ))}
            </div>
            <div className="mt-8 flex justify-center">
                <TrackedLink
                    href="/work-experience"
                    track={{
                        name: 'button_click',
                        data: {
                            buttonId: 'show_all_experiences',
                            section: 'experience',
                        },
                    }}
                    className={buttonVariants({ variant: 'outline' })}
                >
                    Show all work experiences
                </TrackedLink>
            </div>
        </Container>
    );
}
