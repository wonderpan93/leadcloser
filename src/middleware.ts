import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/auth/auth';

export async function middleware(request: NextRequest) {
  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/login',
    '/signup',
    '/api/auth/login',
    '/api/auth/signup',
    '/api/auth/logout'
  ];
  
  const url = new URL(request.url);
  
  // Allow public paths
  if (publicPaths.includes(url.pathname)) {
    return NextResponse.next();
  }
  
  // Check authentication for protected routes
  const authResponse = await authMiddleware(request);
  if (authResponse) {
    return authResponse;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
