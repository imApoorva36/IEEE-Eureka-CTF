import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
let startTime = (new Date(2023, 9, 7, 2, 55)).getTime()

export function middleware(request: NextRequest) {
  const redirectURL = new URL('http://localhost:3000/');
  
  if((new Date()).getTime() < startTime)
    return NextResponse.redirect(redirectURL.toString());
}
export const config = {
  matcher: ['/teams', '/teams/:id', '/questions/:id', '/question-map', '/login', '/register', '/scoreboard'],
}
