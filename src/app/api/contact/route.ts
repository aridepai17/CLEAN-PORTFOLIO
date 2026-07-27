import { contactFormSchema } from '@/lib/contact-schema';
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function getClientIP(request: NextRequest): string {
    // Get IP from various headers in order of preference
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip');

    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    if (realIP) {
        return realIP;
    }
    if (cfConnectingIP) {
        return cfConnectingIP;
    }

    return 'unknown';
}

function checkRateLimit(clientIP: string): {
    allowed: boolean;
    remaining: number;
    resetTime?: number;
} {
    const now = Date.now();
    const clientData = rateLimitStore.get(clientIP);

    if (!clientData || now > clientData.resetTime) {
        // First request or window expired
        rateLimitStore.set(clientIP, {
            count: 1,
            resetTime: now + RATE_LIMIT_WINDOW,
        });
        return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
    }

    if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
        return {
            allowed: false,
            remaining: 0,
            resetTime: clientData.resetTime,
        };
    }

    // Increment count
    clientData.count++;
    rateLimitStore.set(clientIP, clientData);

    return {
        allowed: true,
        remaining: RATE_LIMIT_MAX_REQUESTS - clientData.count,
    };
}

async function sendToTelegram(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
}): Promise<boolean> {
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (!telegramToken) {
        console.error('TELEGRAM_BOT_TOKEN not configured');
        return false;
    }

    if (!telegramChatId) {
        console.error('TELEGRAM_CHAT_ID not configured');
        return false;
    }

    const message = `
🔔 *New Contact Form Submission*

👤 *Name:* ${data.name.trim()}
📧 *Email:* ${data.email.trim()}
📱 *Phone:* ${data.phone.trim()}

💬 *Message:*
${data.message.trim()}

⏰ *Submitted:* ${new Date().toISOString()}
📍 *Timezone:* ${Intl.DateTimeFormat().resolvedOptions().timeZone}
  `.trim();

    try {
        const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: telegramChatId,
                text: message,
                parse_mode: 'Markdown',
            }),
        });

        if (response.ok) {
            return true;
        } else {
            const errorText = await response.text();
            console.error('Failed to send to Telegram:', errorText);
            return false;
        }
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        return false;
    }
}

export async function POST(request: NextRequest) {
    try {
        const clientIP = getClientIP(request);
        const rateLimit = checkRateLimit(clientIP);

        if (!rateLimit.allowed) {
            const retryAfter = Math.max(
                0,
                Math.round((rateLimit.resetTime! - Date.now()) / 1000),
            );

            return NextResponse.json(
                {
                    error: 'Too many requests. Please try again later.',
                    retryAfter,
                },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
                        'X-RateLimit-Remaining': '0',
                        'X-RateLimit-Reset': rateLimit.resetTime!.toString(),
                    },
                },
            );
        }

        const body = await request.json();
        const validatedData = contactFormSchema.parse(body);

        const normalizedData = {
            ...validatedData,
            phone: validatedData.phone.replace(/[\s\-()]/g, ''),
        };

        const telegramSent = await sendToTelegram(normalizedData);

        if (!telegramSent) {
            return NextResponse.json(
                { error: 'Failed to send message. Please try again.' },
                { status: 500 },
            );
        }

        return NextResponse.json(
            {
                message: 'Message sent successfully!',
                success: true,
            },
            {
                headers: {
                    'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
                    'X-RateLimit-Remaining': rateLimit.remaining.toString(),
                },
            },
        );
    } catch (error) {
        console.error('API Error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: 'Invalid form data',
                    details: error.issues,
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
