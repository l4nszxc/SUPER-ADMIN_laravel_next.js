import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the access_token from cookies
  const token = request.cookies.get('access_token')?.value;

  const { pathname } = request.nextUrl;

  // List of protected routes that require authentication
  const protectedRoutes = ['/admin', '/admin-assistant', '/super-admin'];

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // If trying to access a protected route without a token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is logged in and trying to access login/register page, redirect to dashboard
  if ((pathname === '/' || pathname === '/login') && token) {
    // Redirect to appropriate dashboard based on role
    return NextResponse.redirect(new URL('/admin', request.url));
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
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
