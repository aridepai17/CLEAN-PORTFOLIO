'use client';

import { cn } from '@/lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { buttonVariants } from './button-variants';

function Button({
    className,
    variant = 'default',
    size = 'default',
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot.Root : 'button';

    return (
        <Comp
            data-slot="button"
            data-variant={variant}
            data-size={size}
            className={cn(
                'transition-transform duration-200 active:scale-[0.98]',
                buttonVariants({ variant, size, className }),
            )}
            {...props}
        />
    );
}

export { Button, buttonVariants };
