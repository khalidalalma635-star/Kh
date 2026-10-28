import { NextResponse } from 'next/server';

export async function GET() {
  const configured = Boolean(process.env.DATABASE_URL && process.env.JWT_SECRET);

  return NextResponse.json(
    {
      success: true,
      status: configured ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
    },
    { status: configured ? 200 : 503 }
  );
}
