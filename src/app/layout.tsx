import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import BackToTop from '@/components/common/BackToTop';
import ChatBubble from '@/components/common/ChatBubble';
import Footer from '@/components/common/Footer';
import LenisProvider from '@/components/common/LenisProvider';
import Navbar from '@/components/common/Navbar';
import { Quote } from '@/components/common/Quote';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { generateMetadata as getMetaData } from '@/config/Meta';
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
                        <LenisProvider>
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
                        </LenisProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ViewTransitions>
    );
}
