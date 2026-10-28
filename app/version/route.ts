import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      version: process.env.npm_package_version || '1.0.0',
      node: process.version,
      env: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
