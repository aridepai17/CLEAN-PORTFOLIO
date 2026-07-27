import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { Quote } from '@/components/common/Quote';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import { TooltipProvider } from '@/components/ui/tooltip';
import { generateMetadata as getMetaData } from '@/config/Meta';
import ReactLenis from 'lenis/react';
import { ViewTransitions } from 'next-view-transitions';

import './globals.css';

export const metadata = getMetaData('/');

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
                        <ReactLenis root>
                            <Navbar />
                            <TooltipProvider delayDuration={0}>
                                {children}
                            </TooltipProvider>
                            <Quote />
                            <Footer />
                            <UmamiAnalytics />
                        </ReactLenis>
                    </ThemeProvider>
                </body>
            </html>
        </ViewTransitions>
    );
}
