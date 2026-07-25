// src/components/animations/SlideUp.tsx
'use client';

import { motion } from 'motion/react';
import React from 'react';

// src/components/animations/SlideUp.tsx

// src/components/animations/SlideUp.tsx

export function SlideUp({
    children,
    delay = 0,
    className,
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
