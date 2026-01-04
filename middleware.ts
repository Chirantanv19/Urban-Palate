import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // 1. Define protected routes
    const isProtectedRoute = path.startsWith('/admin');

    // 2. Get the session cookie
    const isAuthenticated = request.cookies.get('admin_session');

    // 3. If accessing admin without cookie, redirect to login
    if (isProtectedRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 4. If already logged in and trying to access login page, go to admin
    if (path === '/login' && isAuthenticated) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
};