import { NextRequest, NextFetchEvent } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);
const isProtectedRoute = createRouteMatcher(['/admin(.*)']);

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  // If it's an admin route, apply Clerk auth
  if (isProtectedRoute(request)) {
    return clerkMiddleware()(request, event);
  }

  // Just return intlMiddleware with the request (only 1 argument)
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.png|.*\\..*).*)',
  ],
};
