import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/app/lib/jwt';

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/api/protected',
];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = [
  '/login',
  '/signup',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the access token from cookies
  const accessToken = request.cookies.get('access_token')?.value;

  // Check if the current route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the current route is an auth route (login/signup)
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // If it's a protected route, verify the token
  if (isProtectedRoute) {
    if (!accessToken) {
      // No token found, redirect to login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify the access token
      await verifyAccessToken(accessToken);
      
      // Token is valid, allow the request to proceed
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired, redirect to login
      console.log('Token verification failed:', error);
      const loginUrl = new URL('/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      
      // Clear the invalid token
      response.cookies.delete('access_token');
      
      return response;
    }
  }

  // If it's an auth route and user is already authenticated, redirect to dashboard
  if (isAuthRoute && accessToken) {
    try {
      await verifyAccessToken(accessToken);
      // Token is valid, redirect to dashboard
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    } catch (error) {
      // Token is invalid, allow access to auth routes
      return NextResponse.next();
    }
  }

  // For all other routes, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 