import { z } from 'zod';

const envSchema = z.object({
    TELEGRAM_BOT_TOKEN: z.string().optional(),
    TELEGRAM_CHAT_ID: z.string().optional(),
    GEMINI_API_KEY: z.string().optional(),
    NODE_ENV: z.string().optional(),
    NEXT_PUBLIC_URL: z.string().optional(),
    NEXT_PUBLIC_UMAMI_SRC: z.string().optional(),
    NEXT_PUBLIC_UMAMI_ID: z.string().optional(),
});

export function validateEnv(): boolean {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
        const missing = result.error.issues
            .map((issue) => issue.path.join('.'))
            .join(', ');
        console.error(
            `[env] Missing environment variables: ${
                missing || 'validation failed'
            }`,
        );
    }
    return result.success;
}
