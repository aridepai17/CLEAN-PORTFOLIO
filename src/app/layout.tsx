import { ThemeProvider } from '@/components/common/ThemeProviders';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ViewTransitions } from 'next-view-transitions';

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
        <ViewTransitions>
            <html lang="en" suppressHydrationWarning>
                <body className={`font-hanken-grotesk antialiased`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <TooltipProvider delayDuration={0}>
                            {children}
                        </TooltipProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ViewTransitions>
    );
}
