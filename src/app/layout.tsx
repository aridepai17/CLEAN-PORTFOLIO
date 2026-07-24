import { ThemeProvider } from '@/components/common/ThemeProviders';

import './globals.css';

export const metadata = {
    title: 'Clean Portfolio',
    description: 'A modern, responsive portfolio built with Next.js.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="font-hanken-grotesk antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
