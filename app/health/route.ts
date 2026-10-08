import { NextResponse } from 'next/server';

export async function GET() {
  const now = new Date().toISOString();

  return NextResponse.json({
    success: true,
    status: 'ok',
    timestamp: now,
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0'
  });
}
