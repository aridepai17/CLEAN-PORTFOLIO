import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import BackToTop from '@/components/common/BackToTop';
import ChatBubble from '@/components/common/ChatBubble';
import Footer from '@/components/common/Footer';
import { GlobalClickSound } from '@/components/common/GlobalClickSound';
import LenisProvider from '@/components/common/LenisProvider';
import Navbar from '@/components/common/Navbar';
import { Quote } from '@/components/common/Quote';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import JsonLd from '@/components/seo/JsonLd';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { generateMetadata as getMetaData } from '@/config/Meta';
import { validateEnv } from '@/lib/env';
import { ViewTransitions } from 'next-view-transitions';

import './globals.css';

// Validate env at module scope (logs, never throws, so builds won't break).
validateEnv();

export const metadata = getMetaData('/');

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ViewTransitions>
            <html lang="en">
                <body className={`font-hanken-grotesk antialiased`}>
                    <JsonLd />
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <LenisProvider>
                            <ScrollToTop />
                            <Navbar />
                            <TooltipProvider delayDuration={0}>
                                {children}
                                <BackToTop />
                            </TooltipProvider>
                            <Quote />
                            <Footer />
                            <UmamiAnalytics />
                            <Toaster />
                            <ChatBubble />
                            <GlobalClickSound />
                        </LenisProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ViewTransitions>
    );
}
