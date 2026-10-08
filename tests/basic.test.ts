import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    metrics: {
      uptime: process.uptime(),
      memory: process.memoryUsage().heapUsed,
      timestamp: new Date().toISOString(),
    },
  });
}
