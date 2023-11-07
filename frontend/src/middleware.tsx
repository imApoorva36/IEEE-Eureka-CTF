import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
let startTime = (new Date(2023, 10, 8, 2, 55)).getTime()

export function middleware(request: NextRequest) {
  const redirectURL = new URL('http://localhost:3000/');
  if((new Date()).getTime() < startTime)
    return NextResponse.redirect(redirectURL.toString());
}
export const config = {
  matcher: ['/teams', '/teams/:id', '/questions', '/login', '/register', '/scoreboard'],
}
