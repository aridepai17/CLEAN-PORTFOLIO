import Container from '@/components/common/Container';
import { FloatingToC } from '@/components/common/FloatingToC';
import Reveal from '@/components/common/Reveal';
import { TrackedLink } from '@/components/common/TrackedLink';
import { ProjectContent } from '@/components/projects/ProjectContent';
import { ProjectNavigation } from '@/components/projects/ProjectNavigation';
import ArrowLeft from '@/components/svgs/ArrowLeft';
import { buttonVariants } from '@/components/ui/button-variants';
import { siteConfig } from '@/config/Meta';
import {
    getProjectCaseStudyBySlug,
    getProjectCaseStudySlugs,
    getProjectNavigation,
    getRelatedProjectCaseStudies,
} from '@/lib/project';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProjectCaseStudyPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static paths for all project case studies
export async function generateStaticParams() {
    const slugs = getProjectCaseStudySlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

export const dynamicParams = false;

// Generate metadata for each project case study
export async function generateMetadata({
    params,
}: ProjectCaseStudyPageProps): Promise<Metadata> {
    const { slug } = await params;
    const caseStudy = await getProjectCaseStudyBySlug(slug);

    if (!caseStudy || !caseStudy.frontmatter.isPublished) {
        return {
            title: 'Project not found',
        };
    }

    const { title, description, image } = caseStudy.frontmatter;

    return {
        metadataBase: new URL(siteConfig.url),
        title: `${title} - Project Case Study`,
        description,
        openGraph: {
            title,
            description,
            images: [image],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

export default async function ProjectCaseStudyPage({
    params,
}: ProjectCaseStudyPageProps) {
    const { slug } = await params;
    const caseStudy = await getProjectCaseStudyBySlug(slug);

    if (!caseStudy || !caseStudy.frontmatter.isPublished) {
        notFound();
    }

    const navigation = await getProjectNavigation(slug);
    const relatedProjects = await getRelatedProjectCaseStudies(slug, 2);

    return (
        <main className="font-sfProDisplayBlack">
            {/* Viewport fixed tracker layer outside layouts */}
            <FloatingToC selector=".prose h2, .prose h3" />
            <Container className="py-16">
                <div className="space-y-16">
                    {/* Back button link zone */}
                    <div>
                        <TrackedLink
                            href="/projects"
                            track={{
                                name: 'button_click',
                                data: {
                                    buttonId: 'project_back',
                                    section: 'project_detail',
                                },
                            }}
                            className={`${buttonVariants({ variant: 'ghost' })} group flex items-center space-x-2`}
                        >
                            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                            <span>Back to Projects</span>
                        </TrackedLink>
                    </div>

                    {/* Pure long-form technical prose component block */}
                    <ProjectContent
                        frontmatter={caseStudy.frontmatter}
                        content={caseStudy.content}
                    />

                    {/* Integrated next/prev modular navigation card tier */}
                    <Reveal>
                        <ProjectNavigation
                            previous={navigation.previous}
                            next={navigation.next}
                        />
                    </Reveal>

                    {/* Related Projects Display Grid Row */}
                    {relatedProjects.length > 0 && (
                        <Reveal>
                            <div className="space-y-6 pt-8">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Related Projects
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    {relatedProjects.map((project) => (
                                        <div
                                            key={project.slug}
                                            className="group bg-card hover:bg-muted/50 rounded-xl border p-6 transition-colors"
                                        >
                                            <TrackedLink
                                                href={`/projects/${project.slug}`}
                                                track={{
                                                    name: 'button_click',
                                                    data: {
                                                        buttonId:
                                                            'related_project',
                                                        section:
                                                            'project_detail',
                                                        action: project.slug,
                                                    },
                                                }}
                                            >
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <h3 className="group-hover:text-primary text-lg font-semibold transition-colors">
                                                            {
                                                                project
                                                                    .frontmatter
                                                                    .title
                                                            }
                                                        </h3>
                                                        <div
                                                            className={`inline-block rounded px-2 py-0.5 text-xs font-medium tracking-wider uppercase ${
                                                                project
                                                                    .frontmatter
                                                                    .status ===
                                                                'completed'
                                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                                    : project
                                                                            .frontmatter
                                                                            .status ===
                                                                        'in-progress'
                                                                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                                                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                                                            }`}
                                                        >
                                                            {
                                                                project
                                                                    .frontmatter
                                                                    .status
                                                            }
                                                        </div>
                                                    </div>
                                                    <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                                                        {
                                                            project.frontmatter
                                                                .description
                                                        }
                                                    </p>
                                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                                        {project.frontmatter.technologies.map(
                                                            (tech) => (
                                                                <span
                                                                    key={tech}
                                                                    className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs font-medium"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            </TrackedLink>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}

                    {/* Cleaned CTA segment section */}
                    <Reveal>
                        <div className="pt-4 text-center">
                            <Link
                                href="/projects"
                                className={buttonVariants({ size: 'lg' })}
                            >
                                View All Projects
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </main>
    );
}
