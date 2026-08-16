'use client';

import { ctaConfig } from '@/config/CTA';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { useUmami } from '@/hooks/use-umami';
import Image from 'next/image';
import { useState } from 'react';

import Container from '../common/Container';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';

interface CallToActionProps {
    profileImage?: string;
    profileAlt?: string;
    preText?: string;
    contactLinks?: {
        label: string;
        href: string;
    }[];
}

export default function CTA({
    profileImage = ctaConfig.profileImage,
    profileAlt = ctaConfig.profileAlt,
    contactLinks = ctaConfig.contactLinks,
    preText = ctaConfig.preText,
}: CallToActionProps) {
    const { triggerHaptic, isMobile } = useHapticFeedback();
    const { trackEvent } = useUmami();
    const [showDialog, setShowDialog] = useState(false);

    const handleButtonClick = () => {
        if (isMobile()) {
            triggerHaptic('medium');
        }
        trackEvent({
            name: 'button_click',
            data: {
                buttonId: 'contact_cta',
                section: 'cta',
                action: 'open_contact_dialog',
            },
        });
        setShowDialog(true);
    };

    return (
        <>
            <Container id="contact" className="mt-32 scroll-mt-24">
                <div className="glass-panel flex flex-col items-center justify-between gap-8 p-8 sm:flex-row sm:p-12">
                    <p className="font-display text-foreground text-2xl font-normal tracking-tight sm:max-w-md md:text-3xl">
                        {preText}
                    </p>
                    <div className="shrink-0">
                        <button
                            type="button"
                            className="border-border/60 bg-background/50 hover:bg-muted/60 focus-visible:ring-primary group inline-flex cursor-pointer items-center rounded-xl border px-4 py-2.5 text-sm font-medium shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] dark:focus-visible:ring-offset-black"
                            onClick={handleButtonClick}
                        >
                            {/* Main Wrapper */}
                            <div className="relative z-20 flex items-center gap-3 transition-all duration-300 group-hover:gap-5">
                                {/* Avatar Cluster */}
                                <div className="flex items-center gap-1.5">
                                    <div className="border-border/50 size-6 shrink-0 overflow-hidden rounded-full border">
                                        <Image
                                            alt={profileAlt}
                                            width={24}
                                            height={24}
                                            className="h-full w-full object-cover"
                                            src={profileImage}
                                            style={{ color: 'transparent' }}
                                        />
                                    </div>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-muted-foreground/60 size-3.5"
                                    >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5v14"></path>
                                    </svg>

                                    <div className="bg-muted text-muted-foreground flex size-6 items-center justify-center rounded-full text-[10px] font-semibold">
                                        You
                                    </div>
                                </div>

                                {/* Text */}
                                <span className="text-foreground font-sans text-sm font-semibold whitespace-nowrap">
                                    Get in Touch
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </Container>

            {/* Contact Dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="glass-panel border-border/50 max-h-[90vh] max-w-[calc(100vw-2rem)] overflow-hidden p-6 sm:max-w-[calc(100vw-4rem)] md:max-w-xl md:p-8">
                    <DialogHeader className="space-y-2">
                        <DialogTitle className="font-display text-foreground text-3xl font-normal">
                            Let&apos;s Connect
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground font-sans text-sm">
                            Choose your preferred way to get in touch.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-6 space-y-3">
                        {contactLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target={
                                    link.href.startsWith('http')
                                        ? '_blank'
                                        : undefined
                                }
                                rel={
                                    link.href.startsWith('http')
                                        ? 'noopener noreferrer'
                                        : undefined
                                }
                                onClick={() =>
                                    trackEvent({
                                        name: 'external_link_click',
                                        data: {
                                            url: link.href,
                                            text: link.label,
                                            location: 'cta',
                                        },
                                    })
                                }
                                className="border-border/50 bg-background/40 hover:bg-muted/40 hover:border-border focus-visible:ring-primary block rounded-xl border p-4 font-sans text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.99] dark:focus-visible:ring-offset-black"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
