import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Clone the request headers so we can modify them
    const requestHeaders = new Headers(request.headers);
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    // 1. Prevent Clickjacking (blocks other sites from embedding your site in an iframe)
    response.headers.set('X-Frame-Options', 'DENY');

    // 2. Prevent MIME-sniffing (forces browsers to respect your declared content types)
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // 3. Control how much referrer information is passed when linking to other sites
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // 4. Enforce HTTPS connections for the next 1 year (only applies in production)
    response.headers.set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload',
    );

    // 5. Basic Content Security Policy (CSP)
    // Upgrades insecure HTTP requests to HTTPS automatically
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com;
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data: https:;
        font-src 'self' data:;
        connect-src 'self' https://generativelanguage.googleapis.com https://api.telegram.org https://vitals.vercel-insights.com;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        frame-src 'self' https://drive.google.com;
        upgrade-insecure-requests;
    `
        .replace(/\s{2,}/g, ' ')
        .trim();

    response.headers.set('Content-Security-Policy', cspHeader);

    return response;
}

// Ensure the middleware only runs on actual pages and API routes,
// ignoring static assets and images to save processing time.
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - assets/ (your public assets)
         */
        '/((?!_next/static|_next/image|favicon.ico|assets/|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
    ],
};
