'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useGesture } from '@use-gesture/react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

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
    const [isZoomed, setIsZoomed] = useState(false);
    const lastTapRef = useRef(0);

    const bind = useGesture({
        onPinch: ({ event, memo, first, da, initial }) => {
            event.preventDefault();
            const startScale = first ? scale : (memo?.startScale ?? scale);
            const pinchScale = da[0] / Math.max(initial[0], 1);
            let nextScale = startScale * pinchScale;
            nextScale = Math.min(Math.max(nextScale, 1), 4);
            setScale(nextScale);
            setIsZoomed(nextScale > 1);
            return { startScale };
        },
        onPinchEnd: ({ memo }) => {
            if ((memo?.startScale ?? scale) <= 1) {
                setTx(0);
                setTy(0);
                setIsZoomed(false);
            }
        },
        onDrag: ({ event, first, last, tap, delta, memo }) => {
            event.preventDefault();
            if (tap && last) {
                const now = Date.now();
                if (now - lastTapRef.current < 300 && lastTapRef.current > 0) {
                    setScale(1);
                    setTx(0);
                    setTy(0);
                    setIsZoomed(false);
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
    });

    const transform = `scale(${scale}) translate(${tx}px, ${ty}px)`;

    return (
        <span className="glass-panel my-8 block w-full rounded-xl border p-4">
            <Dialog>
                <DialogTrigger asChild>
                    <span className="block w-full cursor-zoom-in select-none">
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
                    </span>
                </DialogTrigger>
                <DialogContent className="bg-background h-full max-h-[100vh] max-w-[100vw] rounded-none border-0 p-0 shadow-2xl sm:h-auto sm:max-h-[90vh] sm:max-w-[92vw]">
                    <div
                        {...bind()}
                        className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-black/5 ${isZoomed ? 'touch-none' : 'touch-auto'}`}
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
