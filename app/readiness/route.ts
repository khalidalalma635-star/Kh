import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const checks = {
    database: false,
    aiProvider: false,
    auth: true
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch {
    checks.database = false;
  }

  const aiProvider = process.env.AI_PROVIDER || 'openai';
  const aiConfigured =
    aiProvider === 'openai' ? Boolean(process.env.OPENAI_API_KEY) :
    aiProvider === 'claude' ? Boolean(process.env.CLAUDE_API_KEY) :
    aiProvider === 'gemini' ? Boolean(process.env.GEMINI_API_KEY) : false;

  checks.aiProvider = aiConfigured;

  const response = {
    success: true,
    status: checks.database && checks.aiProvider ? 'ok' : 'degraded',
    checks,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  };

  return NextResponse.json(response, { status: checks.database ? 200 : 503 });
}
