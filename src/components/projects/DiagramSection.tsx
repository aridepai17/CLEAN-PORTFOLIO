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
        <div className="glass-panel my-8 rounded-xl border p-4">
            <div className="scrollbar-hide relative overflow-x-auto">
                <ImageLightbox src={src} alt={alt} />
            </div>
            {caption && (
                <p className="text-muted-foreground mt-2 mb-2 text-center text-sm">
                    {caption}
                </p>
            )}
        </div>
    );
}
