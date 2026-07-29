import * as z from 'zod';

export const contactFormSchema = z.object({
    name: z
        .string()
        .trim()
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
        // Allows optional +, allows leading 0s, and standard formatting chars
        .regex(/^[+]?[\d\s\-()]+$/, {
            message:
                'Phone number can only contain digits, spaces, hyphens, and parentheses.',
        })
        .min(10, {
            message: 'Phone number must be at least 10 characters.',
        })
        .max(20, {
            message: 'Phone number must not exceed 20 characters.',
        }),
    message: z
        .string()
        .trim()
        .min(10, {
            message: 'Message must be at least 10 characters.',
        })
        .max(1000, {
            message: 'Message must not exceed 1000 characters.',
        }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
