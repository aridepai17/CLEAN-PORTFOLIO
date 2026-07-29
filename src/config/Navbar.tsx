export interface NavItem {
    label: string;
    href: string;
}

export const navbarConfig = {
    navItems: [
        { label: 'Home', href: '/' },
        { label: 'Experience', href: '/work-experience' },
        { label: 'Projects', href: '/projects' },
        { label: 'Blog', href: '/blog' },
        { label: 'Resume', href: '/resume' },
    ] as NavItem[],
};
