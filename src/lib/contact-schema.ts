import * as z from 'zod';

export const contactFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: 'Name must be at least 2 characters.',
        })
        .max(100, {
            message: 'Name must not exceed 100 characters.',
        }),
    email: z.email({
        message: 'Please enter a valid email address.',
    }),
    phone: z
        .string()
        .min(10, {
            message: 'Phone number must be at least 10 characters.',
        })
        .regex(/^[\+]?[1-9][\d]{0,15}$/, {
            message: 'Please enter a valid phone number.',
        })
        .max(20, {
            message: 'Phone number must not exceed 20 characters.',
        }),
    message: z
        .string()
        .min(10, {
            message: 'Message must be at least 10 characters.',
        })
        .max(1000, {
            message: 'Message must not exceed 1000 characters.',
        }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
