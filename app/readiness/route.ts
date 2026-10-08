import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const checks = {
    database: false,
    aiProvider: false,
    auth: true,
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch {
    checks.database = false;
  }

  const provider = (process.env.AI_PROVIDER || 'openai').toLowerCase();
  const aiConfigured =
    provider === 'openai'
      ? Boolean(process.env.OPENAI_API_KEY)
      : provider === 'claude'
        ? Boolean(process.env.CLAUDE_API_KEY)
        : provider === 'gemini'
          ? Boolean(process.env.GEMINI_API_KEY)
          : false;

  checks.aiProvider = aiConfigured;

  const healthy = checks.database && checks.aiProvider && checks.auth;

  return NextResponse.json(
    {
      success: true,
      status: healthy ? 'ok' : 'degraded',
      checks,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
    },
    { status: healthy ? 200 : 503 }
  );
}
