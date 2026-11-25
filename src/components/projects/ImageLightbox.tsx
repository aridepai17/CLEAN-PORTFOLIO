'use client';

import Image from 'next/image';
import React from 'react';

interface ImageLightboxProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

export function ImageLightbox({
    src,
    alt,
    width = 1200,
    height = 630,
}: ImageLightboxProps) {
    const isSvg = src.toLowerCase().endsWith('.svg');

    return (
        <Image
            alt={alt || 'Project diagram'}
            className={`mx-auto block h-auto object-contain ${isSvg ? 'w-full max-w-none' : 'w-full'} `}
            loading="eager"
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            src={src}
            width={width}
            height={height}
        />
    );
}
