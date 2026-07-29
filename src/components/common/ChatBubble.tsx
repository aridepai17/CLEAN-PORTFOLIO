'use client';

import ChatBubbleIcon from '@/components/svgs/ChatBubbleIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    ExpandableChat,
    ExpandableChatBody,
    ExpandableChatFooter,
    ExpandableChatHeader,
} from '@/components/ui/expandable-chat';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatSuggestions } from '@/config/ChatPrompt';
import { heroConfig } from '@/config/Hero';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { useUmami } from '@/hooks/use-umami';
import { cn } from '@/lib/utils';
import { createParser } from 'eventsource-parser';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import SendIcon from '../svgs/SendIcon';

// 1. Changed id from 'number' to 'string' to support UUIDs
interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: string;
    isStreaming?: boolean;
}

const initialMessages: Message[] = [
    {
        id: 'initial-msg-1',
        text: "Hello! I'm Advaith's Portfolio Assistant. How can I help you?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        }),
    },
];

const LOCAL_STORAGE_KEY = 'advaith-portfolio-chat-history';

const ChatBubble: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { triggerHaptic, isMobile } = useHapticFeedback();
    const { trackEvent } = useUmami();

    // Load chat history from local storage on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedHistory) {
            try {
                const parsed = JSON.parse(savedHistory);
                // Reset any 'isStreaming' states that might have been saved if the user refreshed mid-stream
                const cleanedHistory = parsed.map((msg: Message) => ({
                    ...msg,
                    isStreaming: false,
                }));
                setMessages(cleanedHistory);
            } catch (error) {
                console.error('Failed to parse chat history:', error);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save chat history to local storage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
        }
    }, [messages, isInitialized]);

    // Smooth auto-scroll to bottom
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current.querySelector(
                '[data-radix-scroll-area-viewport]',
            );
            if (scrollElement) {
                scrollElement.scrollTo({
                    top: scrollElement.scrollHeight,
                    behavior: 'smooth',
                });
            }
        }
    }, [messages]);

    const clearChat = () => {
        if (isMobile()) triggerHaptic('medium');
        setMessages(initialMessages);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() || isLoading) return;

        if (isMobile()) triggerHaptic('light');

        const messageText = newMessage.trim();
        trackEvent({
            name: 'chat_message_sent',
            data: { message: messageText, sender: 'user' },
        });

        // 2. Use crypto.randomUUID() for guaranteed unique React keys
        const userMessage: Message = {
            id: crypto.randomUUID(),
            text: messageText,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        setMessages((prev) => [...prev, userMessage]);
        setNewMessage('');
        setIsLoading(true);

        const botMessageId = crypto.randomUUID();
        const botMessage: Message = {
            id: botMessageId,
            text: '',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
            isStreaming: true,
        };

        setMessages((prev) => [...prev, botMessage]);
        await sendMessage(messageText, botMessageId);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        if (isMobile()) triggerHaptic('selection');

        trackEvent({
            name: 'chat_message_sent',
            data: { message: suggestion, sender: 'user' },
        });

        setNewMessage(suggestion);
        const userMessage: Message = {
            id: crypto.randomUUID(),
            text: suggestion,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        const botMessageId = crypto.randomUUID();
        const botMessage: Message = {
            id: botMessageId,
            text: '',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
            isStreaming: true,
        };

        setMessages((prev) => [...prev, botMessage]);
        sendMessage(suggestion, botMessageId);
    };

    const sendMessage = async (messageText: string, botMessageId: string) => {
        try {
            const history = messages
                // 3. Update filter to match the new string ID
                .filter((msg) => msg.id !== 'initial-msg-1')
                .slice(-10)
                .map((msg) => ({
                    role:
                        msg.sender === 'user'
                            ? ('user' as const)
                            : ('model' as const),
                    parts: [{ text: msg.text }],
                }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageText, history }),
            });

            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            if (!reader) throw new Error('No reader available');

            let accumulatedText = '';
            const parser = createParser({
                onEvent: (event) => {
                    let data;
                    try {
                        data = JSON.parse(event.data);
                    } catch {
                        return;
                    }

                    if (data.error) {
                        setMessages((prev) =>
                            prev.map((msg) =>
                                msg.id === botMessageId
                                    ? {
                                          ...msg,
                                          text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
                                          isStreaming: false,
                                      }
                                    : msg,
                            ),
                        );
                        return;
                    }

                    if (data.text) {
                        accumulatedText += data.text;
                        setMessages((prev) =>
                            prev.map((msg) =>
                                msg.id === botMessageId
                                    ? {
                                          ...msg,
                                          text: accumulatedText,
                                          isStreaming: true,
                                      }
                                    : msg,
                            ),
                        );
                    }

                    if (data.done) {
                        setMessages((prev) =>
                            prev.map((msg) =>
                                msg.id === botMessageId
                                    ? {
                                          ...msg,
                                          text: accumulatedText,
                                          isStreaming: false,
                                      }
                                    : msg,
                            ),
                        );
                    }
                },
            });

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                parser.feed(decoder.decode(value));
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === botMessageId
                        ? {
                              ...msg,
                              text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
                              isStreaming: false,
                          }
                        : msg,
                ),
            );
        } finally {
            setIsLoading(false);
            setNewMessage('');
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === botMessageId
                        ? { ...msg, isStreaming: false }
                        : msg,
                ),
            );
        }
    };

    return (
        <ExpandableChat
            position="bottom-right"
            icon={<ChatBubbleIcon className="h-6 w-6" />}
        >
            <ExpandableChatHeader>
                <div className="flex w-full items-center justify-between overflow-hidden pr-2">
                    <div className="flex items-center space-x-3 overflow-hidden">
                        <Avatar className="border-primary h-8 w-8 shrink-0 border bg-blue-300 dark:bg-yellow-300">
                            <AvatarImage src="/assets/ai.jpg" alt="Assistant" />
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-semibold">
                                {heroConfig.name}&apos;s Portfolio Assistant
                            </h3>
                            <div className="text-muted-foreground text-xs">
                                <div className="mt-0.5 flex items-center gap-1.5">
                                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></div>
                                    Online
                                </div>
                            </div>
                        </div>
                    </div>
                    {messages.length > 1 && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={clearChat}
                            className="text-muted-foreground hover:text-destructive h-7 w-7 shrink-0"
                            title="Clear Chat"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </ExpandableChatHeader>

            <ExpandableChatBody className="flex-1 overflow-hidden">
                <ScrollArea
                    ref={scrollAreaRef}
                    className="h-full w-full overscroll-contain"
                >
                    <div className="w-full space-y-4 p-4 pr-6">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    'flex w-fit max-w-[85%] flex-col gap-2 rounded-xl px-3 py-2 text-sm break-words',
                                    message.sender === 'user'
                                        ? 'bg-muted text-secondary ml-auto rounded-tr-sm'
                                        : 'bg-muted/50 rounded-tl-sm border',
                                )}
                            >
                                <div className="flex items-start space-x-2">
                                    {message.sender === 'bot' && (
                                        <Avatar className="border-primary mt-0.5 h-6 w-6 shrink-0 border bg-blue-300 dark:bg-yellow-300">
                                            <AvatarImage
                                                src="/assets/ai.jpg"
                                                alt="Assistant"
                                            />
                                            <AvatarFallback>AI</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                                            {message.isStreaming &&
                                            !message.text ? (
                                                <div className="flex h-5 items-center space-x-1 px-1">
                                                    <div className="bg-muted-foreground/60 h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
                                                    <div className="bg-muted-foreground/60 h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
                                                    <div className="bg-muted-foreground/60 h-1.5 w-1.5 animate-bounce rounded-full"></div>
                                                </div>
                                            ) : (
                                                <ReactMarkdown
                                                    components={{
                                                        a: (props) => (
                                                            <a
                                                                {...props}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="break-words text-blue-500 underline hover:text-blue-700"
                                                            />
                                                        ),
                                                        p: (props) => (
                                                            <p
                                                                {...props}
                                                                className="m-0 leading-relaxed whitespace-pre-wrap"
                                                            />
                                                        ),
                                                        ul: (props) => (
                                                            <ul
                                                                {...props}
                                                                className="m-0 pl-4"
                                                            />
                                                        ),
                                                        ol: (props) => (
                                                            <ol
                                                                {...props}
                                                                className="m-0 pl-4"
                                                            />
                                                        ),
                                                        li: (props) => (
                                                            <li
                                                                {...props}
                                                                className="m-0"
                                                            />
                                                        ),
                                                        strong: (props) => (
                                                            <strong
                                                                {...props}
                                                                className="font-semibold"
                                                            />
                                                        ),
                                                    }}
                                                >
                                                    {message.text}
                                                </ReactMarkdown>
                                            )}
                                        </div>
                                        <p
                                            className={cn(
                                                'mt-1.5 text-[10px]',
                                                message.sender === 'user'
                                                    ? 'text-secondary/70 text-right'
                                                    : 'text-muted-foreground',
                                            )}
                                        >
                                            {message.timestamp}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {messages.length === 1 && !isLoading && (
                            <div className="w-full space-y-2 pt-2">
                                <p className="text-muted-foreground px-1 text-xs font-medium">
                                    Quick questions:
                                </p>
                                <div className="flex w-full flex-wrap gap-2">
                                    {chatSuggestions.map(
                                        (suggestion, index) => (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleSuggestionClick(
                                                        suggestion,
                                                    )
                                                }
                                                className="bg-background hover:bg-muted border-muted-foreground/20 h-auto max-w-full px-3 py-1.5 text-left text-xs whitespace-normal"
                                            >
                                                {suggestion}
                                            </Button>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </ExpandableChatBody>

            <ExpandableChatFooter>
                <div className="flex items-end space-x-2">
                    <Input
                        placeholder="Ask me about my work..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        className="flex-1 text-base focus-visible:ring-1 sm:text-sm"
                    />
                    <Button
                        size="sm"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || isLoading}
                        className="h-9 w-9 shrink-0 p-0"
                    >
                        {isLoading ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                            <SendIcon className="ml-0.5 h-4 w-4" />
                        )}
                    </Button>
                </div>
            </ExpandableChatFooter>
        </ExpandableChat>
    );
};

export default ChatBubble;
