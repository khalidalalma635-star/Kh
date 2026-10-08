import { NextResponse } from 'next/server';

export async function GET() {
  const status = {
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  };

  return NextResponse.json(status, { status: 200 });
}
