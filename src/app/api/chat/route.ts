import { systemPrompt } from '@/config/ChatPrompt';
import { createParser } from 'eventsource-parser';
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const chatSchema = z.object({
    message: z.string().min(1).max(2000),
    history: z
        .array(
            z.object({
                role: z.enum(['user', 'model']),
                parts: z.array(z.object({ text: z.string().max(2000) })),
            }),
        )
        .max(20)
        .optional()
        .default([]),
});

function sanitizeInput(input: string): string {
    const injectionPatterns = [
        /ignore previous instructions/gi,
        /system prompt/gi,
        /you are now/gi,
        /act as/gi,
        /pretend to be/gi,
        /ignore all previous/gi,
        /forget everything/gi,
        /new instructions/gi,
        /prompt injection/gi,
        /system message/gi,
        /role play/gi,
        /behave as/gi,
        /respond as/gi,
    ];

    let sanitized = input;

    injectionPatterns.forEach((pattern) => {
        sanitized = sanitized.replace(pattern, '[REDACTED]');
    });

    sanitized = sanitized.trim().replace(/\s+/g, ' ');

    if (sanitized.length > 2000) {
        sanitized = sanitized.substring(0, 2000);
    }

    return sanitized;
}

function getClientIP(request: NextRequest): string {
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    const realIP = request.headers.get('x-real-ip');
    const forwarded = request.headers.get('x-forwarded-for');

    if (cfConnectingIP) {
        return cfConnectingIP;
    }
    if (realIP) {
        return realIP;
    }
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    return 'unknown';
}

function checkRateLimit(clientIP: string): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
} {
    const now = Date.now();

    if (rateLimitStore.size > 1000) {
        for (const [ip, data] of rateLimitStore) {
            if (now > data.resetTime) {
                rateLimitStore.delete(ip);
            }
        }
    }

    const clientData = rateLimitStore.get(clientIP);

    if (!clientData || now > clientData.resetTime) {
        const resetTime = now + RATE_LIMIT_WINDOW;
        rateLimitStore.set(clientIP, {
            count: 1,
            resetTime,
        });
        return {
            allowed: true,
            remaining: RATE_LIMIT_MAX_REQUESTS - 1,
            resetTime,
        };
    }

    if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
        return {
            allowed: false,
            remaining: 0,
            resetTime: clientData.resetTime,
        };
    }

    clientData.count++;
    rateLimitStore.set(clientIP, clientData);

    return {
        allowed: true,
        remaining: RATE_LIMIT_MAX_REQUESTS - clientData.count,
        resetTime: clientData.resetTime,
    };
}

export async function POST(request: NextRequest) {
    try {
        const clientIP = getClientIP(request);
        const rateLimit = checkRateLimit(clientIP);

        if (!rateLimit.allowed) {
            return NextResponse.json(
                {
                    error: 'Too many requests. Please try again later.',
                    retryAfter: Math.ceil(
                        (rateLimit.resetTime - Date.now()) / 1000,
                    ),
                },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
                        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
                        'X-RateLimit-Reset': rateLimit.resetTime.toString(),
                    },
                },
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('GEMINI_API_KEY not configured');
            return NextResponse.json(
                { error: 'AI service not configured' },
                { status: 500 },
            );
        }

        const body = await request.json();
        const validatedData = chatSchema.parse(body);

        // Prepare the request body for Gemini REST API
        const requestBody = {
            // Native systemInstruction strictly separates the rules from the user
            systemInstruction: {
                parts: [{ text: systemPrompt }],
            },
            contents: [
                // Add conversation history (sanitized to prevent retroactive injection)
                ...validatedData.history.map((msg) => ({
                    role: msg.role,
                    parts: msg.parts.map((part) => ({
                        // FIX: Only sanitize the user's past inputs, leave model context alone
                        text:
                            msg.role === 'user'
                                ? sanitizeInput(part.text)
                                : part.text,
                    })),
                })),
                // Add current message with strict string data delimiters
                {
                    role: 'user',
                    parts: [
                        {
                            text: `[USER INPUT]\n${sanitizeInput(validatedData.message)}\n[/USER INPUT]`,
                        },
                    ],
                },
            ],
            generationConfig: {
                maxOutputTokens: 512,
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
            },
        };

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000);

        let response: Response;
        try {
            response = await fetch(geminiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey,
                },
                body: JSON.stringify(requestBody),
                signal: controller.signal,
            });
        } catch (fetchError) {
            clearTimeout(timeoutId);
            if (
                fetchError instanceof Error &&
                fetchError.name === 'AbortError'
            ) {
                return NextResponse.json(
                    { error: 'AI service timeout' },
                    { status: 504 },
                );
            }
            throw fetchError;
        }

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const parser = createParser({
                        onEvent: (event) => {
                            try {
                                const data = JSON.parse(event.data);
                                const text =
                                    data?.candidates?.[0]?.content?.parts?.[0]
                                        ?.text;
                                if (text) {
                                    // Send as Server-Sent Event format
                                    const sseData = `data: ${JSON.stringify({ text })}\n\n`;
                                    controller.enqueue(encoder.encode(sseData));
                                }
                            } catch (parseError) {
                                console.error('Parse error:', parseError);
                            }
                        },
                    });

                    if (!response.body) {
                        throw new Error('No response body');
                    }

                    const reader = response.body.getReader();
                    const decoder = new TextDecoder('utf-8', { fatal: false });

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        parser.feed(decoder.decode(value, { stream: true }));
                    }

                    // Send completion signal
                    controller.enqueue(
                        encoder.encode('data: {"done": true}\n\n'),
                    );
                    controller.close();
                    clearTimeout(timeoutId);
                } catch (error) {
                    console.error('Streaming error:', error);
                    const errorData = `data: ${JSON.stringify({ error: 'Stream error occurred' })}\n\n`;
                    controller.enqueue(encoder.encode(errorData));
                    controller.close();
                    clearTimeout(timeoutId);
                }
            },
        });

        return new NextResponse(stream, {
            status: 200,
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
                'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
                'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            },
        });
    } catch (error) {
        // Log the actual detailed error server-side only
        console.error('Chat API Error:', error);

        if (error instanceof z.ZodError) {
            // Log Zod specifics securely on the server
            console.error('Chat Validation Error Details:', error.issues);

            return NextResponse.json(
                {
                    error: 'Invalid request data. Please try again.',
                },
                { status: 400 },
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}

export async function GET() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
