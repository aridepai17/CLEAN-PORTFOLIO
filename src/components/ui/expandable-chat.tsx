'use client';

import { Button } from '@/components/ui/button';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';

export type ChatPosition = 'bottom-right' | 'bottom-left';

interface ExpandableChatProps extends React.HTMLAttributes<HTMLDivElement> {
    position?: ChatPosition;
    icon?: React.ReactNode;
    zIndex?: number;
}

const ExpandableChat: React.FC<ExpandableChatProps> = ({
    className,
    position = 'bottom-right',
    icon,
    zIndex = 50,
    children,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragBounds, setDragBounds] = useState({
        top: -500,
        bottom: 0,
        left: -500,
        right: 0,
    });
    const { triggerHaptic, isMobile } = useHapticFeedback();

    const isDesktop = !isMobile();

    // Calculate dynamic drag bounds based on viewport to prevent losing the window
    useEffect(() => {
        const updateBounds = () => {
            setDragBounds({
                top:
                    -window.innerHeight +
                    (window.innerWidth < 640 ? window.innerHeight * 0.6 : 500) +
                    100,
                bottom: 0,
                left:
                    -window.innerWidth +
                    (window.innerWidth < 640 ? window.innerWidth * 0.9 : 400) +
                    40,
                right: 0,
            });
        };
        updateBounds();
        window.addEventListener('resize', updateBounds);
        return () => window.removeEventListener('resize', updateBounds);
    }, []);

    const closeChat = useCallback(() => setIsOpen(false), []);
    const toggleChat = useCallback(() => {
        if (!isOpen && isMobile()) triggerHaptic('selection');
        setIsOpen((prev) => !prev);
    }, [isOpen, isMobile, triggerHaptic]);

    useEffect(() => {
        if (!isOpen) return;
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeChat();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeChat]);

    return (
        <div
            className={cn('fixed flex flex-col items-end gap-4', className)}
            style={{
                bottom: '1.25rem',
                right: position === 'bottom-right' ? '1.25rem' : 'auto',
                left: position === 'bottom-left' ? '1.25rem' : 'auto',
                zIndex,
            }}
            {...props}
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        drag={isDesktop}
                        dragConstraints={dragBounds}
                        dragElastic={0.1}
                        dragMomentum={false}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 30,
                        }}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => setIsDragging(false)}
                        className={cn(
                            'bg-background flex origin-bottom-right flex-col overflow-hidden border shadow-2xl',
                            'h-[60vh] w-[90vw] rounded-2xl sm:h-[500px] sm:w-[400px]',
                            isDesktop && 'hover:shadow-3xl',
                            isDragging && 'touch-none select-none',
                        )}
                    >
                        {/* Dedicated Top Bar for Dragging & Close Action */}
                        <div className="bg-background relative flex-none">
                            {isDesktop && (
                                <div
                                    className="flex w-full cursor-grab items-center justify-center pt-3 pb-2 active:cursor-grabbing"
                                    aria-label="Drag handle"
                                >
                                    <div className="bg-muted-foreground/20 hover:bg-muted-foreground/40 h-1.5 w-10 rounded-full transition-colors" />
                                </div>
                            )}
                            <div
                                className={cn(
                                    'absolute right-2 z-10',
                                    isDesktop ? 'top-2' : 'top-3',
                                )}
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={closeChat}
                                    className="bg-background/50 hover:bg-muted h-8 w-8 rounded-full backdrop-blur"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            <ExpandableChatToggle
                icon={icon}
                isOpen={isOpen}
                toggleChat={toggleChat}
            />
        </div>
    );
};

ExpandableChat.displayName = 'ExpandableChat';

const ExpandableChatHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => (
    <div
        className={cn(
            'flex items-center justify-between border-b px-4 pt-1 pr-12 pb-3',
            className,
        )}
        {...props}
    />
);

ExpandableChatHeader.displayName = 'ExpandableChatHeader';

const ExpandableChatBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => <div className={cn('grow overflow-y-auto', className)} {...props} />;

ExpandableChatBody.displayName = 'ExpandableChatBody';

const ExpandableChatFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => <div className={cn('border-t p-4', className)} {...props} />;

ExpandableChatFooter.displayName = 'ExpandableChatFooter';

interface ExpandableChatToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    isOpen: boolean;
    toggleChat: () => void;
}

const ExpandableChatToggle = forwardRef<
    HTMLButtonElement,
    ExpandableChatToggleProps
>(({ className, icon, isOpen, toggleChat, ...props }, ref) => {
    return (
        <Button
            ref={ref}
            variant="default"
            onClick={toggleChat}
            className={cn(
                'flex h-14 w-14 flex-none items-center justify-center rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-black/30',
                className,
            )}
            {...props}
        >
            {isOpen ? (
                <X className="h-6 w-6" />
            ) : (
                icon || <MessageCircle className="h-6 w-6" />
            )}
        </Button>
    );
});

ExpandableChatToggle.displayName = 'ExpandableChatToggle';

export {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
    ExpandableChatToggle,
};
