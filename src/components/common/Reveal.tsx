'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
    margin?: string;
    yOffset?: number;
}

export default function Reveal({
    children,
    className = '',
    delay = 0,
    duration = 0.6,
    once = false,
    margin = '-40px',
    yOffset = 17,
}: RevealProps) {
    const prefersReducedMotion = useReducedMotion();

    const variants: Variants = prefersReducedMotion
        ? {
              hidden: { opacity: 0 },
              visible: {
                  opacity: 1,
                  transition: { duration: Math.min(duration, 0.3), delay },
              },
          }
        : {
              hidden: {
                  opacity: 0,
                  y: yOffset,
                  filter: 'blur(4px)',
                  transition: {
                      duration: duration * 0.6,
                      ease: [0.4, 0, 1, 1],
                  },
              },
              visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: {
                      duration,
                      delay,
                      ease: [0.21, 0.47, 0.32, 0.98],
                  },
              },
          };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin, amount: 0.1 }}
            className={className}
            style={{ willChange: 'opacity, transform, filter' }}
        >
            {children}
        </motion.div>
    );
}
