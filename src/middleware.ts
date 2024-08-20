import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  // Only apply this middleware to specific HTTP methods
  const method = req.method;
  const token = req.cookies.get('Authorization')?.value || '';

  // Perform actions for POST , PUT and DELETE requests
  if (
    ['POST', 'PUT', 'DELETE'].includes(method) &&
    !token &&
    !req.url.includes('login')
  ) {
    return NextResponse.json(
      { error: 'Please Login to perform this action' },
      { status: 403 }
    );
  }

  // If the method is not POST or PUT or DELETE, or if the cookie exists, allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};
