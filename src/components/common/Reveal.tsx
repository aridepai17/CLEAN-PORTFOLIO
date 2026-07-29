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
}

export default function Reveal({
    children,
    className = '',
    delay = 0,
    duration = 0.7,
    once = false,
    margin = '-40px',
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
                  y: 32,
                  transition: {
                      duration: duration * 0.6, // exit settles faster than it enters
                      ease: [0.4, 0, 1, 1],
                  },
              },
              visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                      duration,
                      delay,
                      ease: [0.25, 0.46, 0.45, 0.94],
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
            style={{ willChange: 'transform, opacity' }}
        >
            {children}
        </motion.div>
    );
}
