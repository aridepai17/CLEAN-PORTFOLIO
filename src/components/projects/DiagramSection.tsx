'use client';

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useGesture } from '@use-gesture/react';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface DiagramSectionProps {
    src: string;
    alt: string;
    caption?: string;
}

export function DiagramSection({ src, alt, caption }: DiagramSectionProps) {
    const isSvg = src.toLowerCase().endsWith('.svg');

    const [scale, setScale] = useState(1);
    const [tx, setTx] = useState(0);
    const [ty, setTy] = useState(0);
    const lastTapRef = useRef(0);
    const lockedRef = useRef(false);
    const scrollYRef = useRef(0);

    const lock = useCallback(() => {
        if (!window.matchMedia('(pointer: coarse)').matches) return;
        scrollYRef.current = window.scrollY;
        lockedRef.current = true;
        const { documentElement: html, body } = document;
        html.style.overscrollBehavior = 'none';
        body.style.position = 'fixed';
        body.style.top = `-${scrollYRef.current}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.width = '100%';
    }, []);

    const unlock = useCallback(() => {
        if (!lockedRef.current) return;
        lockedRef.current = false;
        const { documentElement: html, body } = document;
        html.style.overscrollBehavior = '';
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        window.scrollTo({ top: scrollYRef.current, behavior: 'instant' });
    }, []);

    useEffect(() => unlock, [unlock]);

    const handleOpenChange = (open: boolean) => {
        if (open) {
            lock();
        } else {
            unlock();
            setScale(1);
            setTx(0);
            setTy(0);
        }
    };

    const bind = useGesture(
        {
            onPinch: ({ event, memo, first, da, initial }) => {
                event.preventDefault();
                const startScale = first ? scale : (memo?.startScale ?? scale);
                const pinchScale = da[0] / Math.max(initial[0], 1);
                let nextScale = startScale * pinchScale;
                nextScale = Math.min(Math.max(nextScale, 1), 4);
                setScale(nextScale);
                return { startScale };
            },
            onPinchEnd: () => {
                if (scale <= 1) {
                    setTx(0);
                    setTy(0);
                }
            },
            onDrag: ({ event, first, last, tap, delta, memo }) => {
                event.preventDefault();
                if (tap && last) {
                    const now = Date.now();
                    if (
                        now - lastTapRef.current < 300 &&
                        lastTapRef.current > 0
                    ) {
                        setScale(1);
                        setTx(0);
                        setTy(0);
                    }
                    lastTapRef.current = now;
                    return;
                }
                const baseTx = first ? tx : (memo?.tx ?? tx);
                const baseTy = first ? ty : (memo?.ty ?? ty);
                const nextTx = baseTx + delta[0];
                const nextTy = baseTy + delta[1];
                setTx(nextTx);
                setTy(nextTy);
                return { tx: nextTx, ty: nextTy };
            },
        },
        { eventOptions: { passive: false } },
    );

    const transform = `translate(${tx}px, ${ty}px) scale(${scale})`;

    return (
        <span className="glass-panel my-8 block w-full rounded-xl border p-4">
            <Dialog onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <button
                        className="focus-visible:ring-primary m-0 block w-full cursor-zoom-in border-none bg-transparent p-0 outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        type="button"
                    >
                        <Image
                            alt={alt || 'Project diagram'}
                            className="mx-auto block h-auto w-full object-contain"
                            loading="eager"
                            priority
                            sizes="(max-width: 640px) 100vw, 50vw"
                            src={src}
                            width={1200}
                            height={630}
                        />
                    </button>
                </DialogTrigger>
                <DialogContent className="bg-background h-full max-h-[100dvh] max-w-[100vw] rounded-none border-0 p-0 shadow-2xl sm:h-auto sm:max-h-[90vh] sm:max-w-[92vw]">
                    <DialogTitle className="sr-only">
                        {alt || caption || 'Project diagram'}
                    </DialogTitle>
                    <div
                        {...bind()}
                        className="relative flex h-full w-full touch-none items-center justify-center overflow-hidden overscroll-contain rounded-lg bg-black/5"
                    >
                        <Image
                            alt={alt || 'Project diagram'}
                            className={`object-contain ${
                                isSvg
                                    ? 'h-auto max-h-[85vh] w-full'
                                    : 'h-full w-full object-cover'
                            }`}
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, 92vw"
                            src={src}
                            style={{ transform, transformOrigin: 'center' }}
                            width={1200}
                            height={630}
                        />
                    </div>
                </DialogContent>
            </Dialog>
            {caption && (
                <span className="text-muted-foreground mt-2 mb-2 block text-center text-sm">
                    {caption}
                </span>
            )}
        </span>
    );
}
