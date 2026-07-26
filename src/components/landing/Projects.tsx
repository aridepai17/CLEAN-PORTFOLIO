'use client';

import { projects } from '@/config/Projects';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { TrackedLink } from '../common/TrackedLink';
import { ProjectList } from '../projects/ProjectList';
import { buttonVariants } from '../ui/button-variants';

export default function Projects() {
    return (
        <Container className="mt-20">
            <SectionHeading subHeading="Featured" heading="Projects" />

            <ProjectList className="mt-8" projects={projects.slice(0, 4)} />
            <div className="mt-8 flex justify-center">
                <TrackedLink
                    href="/projects"
                    track={{
                        name: 'button_click',
                        data: {
                            buttonId: 'show_all_projects',
                            section: 'projects',
                        },
                    }}
                    className={buttonVariants({ variant: 'outline' })}
                >
                    Show all projects
                </TrackedLink>
            </div>
        </Container>
    );
}
