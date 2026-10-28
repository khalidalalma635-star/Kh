import { NextRequest, NextResponse } from 'next/server';
import { applySecurityHeaders } from '@/lib/security';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const response = NextResponse.next();

  if (url.pathname.startsWith('/api/')) {
    applySecurityHeaders(response);
  }

  return response;
}

export const config = {
  matcher: ['/api/:path*', '/health', '/readiness', '/version'],
};
