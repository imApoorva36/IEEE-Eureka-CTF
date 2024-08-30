import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const startTime = new Date(2023, 9, 7, 2, 55).getTime();

export function middleware(request: NextRequest) {
  const redirectURL = new URL('http://localhost:3000/', request.url);
  const access_token = request.cookies.get('access_token');

  if (Date.now() < startTime) {
    return NextResponse.redirect(redirectURL);
  }

  const protectedPaths = ['/teams', '/teams/:id', '/questions/:id', '/question-map', '/scoreboard'];
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtectedPath && !access_token) {
    return NextResponse.redirect(redirectURL);
  }
}

export const config = {
  matcher: ['/teams', '/teams/:id*', '/questions/:id*', '/question-map', '/login', '/register', '/scoreboard'],
};
