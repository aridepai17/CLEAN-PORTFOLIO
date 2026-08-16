'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUmami } from '@/hooks/use-umami';
import {
    type ContactFormValues,
    contactFormSchema,
} from '@/lib/contact-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Chat from '../svgs/Chat';

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { trackEvent } = useUmami();

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            trackEvent({
                name: 'form_submit',
                data: { formId: 'contact', success: response.ok },
            });

            if (response.ok) {
                toast.success('Message sent successfully!');
                form.reset();
            } else {
                trackEvent({
                    name: 'form_error',
                    data: { formId: 'contact', errorType: 'request_failed' },
                });
                toast.error(
                    result.error || 'Failed to send message. Please try again.',
                );
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            trackEvent({
                name: 'form_submit',
                data: { formId: 'contact', success: false },
            });
            trackEvent({
                name: 'form_error',
                data: { formId: 'contact', errorType: 'network_error' },
            });
            toast.error('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="glass-panel p-6 md:p-10">
            <div className="mb-8 space-y-3">
                <h3 className="font-display text-foreground text-4xl font-normal tracking-tight md:text-5xl">
                    Send me a message
                </h3>
                <p className="text-muted-foreground font-sans text-base md:text-lg">
                    Fill out the form below and I will get back to you as soon
                    as possible.
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground font-sans text-xs font-semibold tracking-wider uppercase">
                                        Name *
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-background/50 focus:bg-background h-11 font-sans transition-colors"
                                            placeholder="Your full name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="font-sans text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground font-sans text-xs font-semibold tracking-wider uppercase">
                                        Phone *
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-background/50 focus:bg-background h-11 font-sans transition-colors"
                                            placeholder="+1 (123) xxx-xxxx"
                                            type="tel"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="font-sans text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground font-sans text-xs font-semibold tracking-wider uppercase">
                                    Email *
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-background/50 focus:bg-background h-11 font-sans transition-colors"
                                        placeholder="your.email@example.com"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="font-sans text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground font-sans text-xs font-semibold tracking-wider uppercase">
                                    Message *
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell me about your project or just say hello..."
                                        className="bg-background/50 focus:bg-background min-h-32 resize-none font-sans transition-colors"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="font-sans text-xs" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-fit font-sans font-semibold"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending your message...
                            </>
                        ) : (
                            <>
                                <Chat className="mr-2 h-4 w-4" />
                                Send Message
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
