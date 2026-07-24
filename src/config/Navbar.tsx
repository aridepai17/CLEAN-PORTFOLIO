export interface NavItem {
    label: string;
    href: string;
}

export const navbarConfig = {
    logo: {
        src: '/assets/logo.jpg',
        alt: 'Advaith R Pai Logo',
        width: 100,
        height: 100,
    },

    navItems: [
        {
            label: 'Experience',
            href: '/work-experience',
        },
        {
            label: 'Projects',
            href: '/projects',
        },
        {
            label: 'Blog',
            href: '/blog',
        },
    ] as NavItem[],
};
