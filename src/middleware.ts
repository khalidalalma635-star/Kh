import { NextRequest, NextResponse } from 'next/server';
import { applySecurityHeaders, jsonError } from '@/lib/security';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    applySecurityHeaders(response);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/health', '/readiness', '/version']
};
