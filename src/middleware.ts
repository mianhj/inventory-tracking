import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  // Only apply this middleware to specific HTTP methods
  const method = req.method;
  req.token = req.cookies.get('Authorization')?.value || '';

  // Perform actions for POST or PUT requests
  if (['POST', 'PUT', 'DELETE'].includes(method)) {
    // If the 'authToken' cookie is missing, redirect to the login page
    // if (!req.token) {
    //   return NextResponse.redirect(new URL('/login', req.url));
    // }
  }

  // If the method is not POST or PUT, or if the cookie exists, allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};
