'use client';

import React from 'react';

import { ImageLightbox } from './ImageLightbox';

interface DiagramSectionProps {
    src: string;
    alt: string;
    caption?: string;
}

export function DiagramSection({ src, alt, caption }: DiagramSectionProps) {
    return (
        <span className="glass-panel my-8 inline-block rounded-xl border p-4">
            <span className="scrollbar-hide relative block overflow-x-auto">
                <ImageLightbox src={src} alt={alt} />
            </span>
            {caption && (
                <span className="text-muted-foreground mt-2 mb-2 block text-center text-sm">
                    {caption}
                </span>
            )}
        </span>
    );
}
