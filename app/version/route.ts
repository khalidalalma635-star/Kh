import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const databaseReady = await prisma.$queryRaw`SELECT 1`.then(() => true).catch(() => false);
  const aiConfigured = Boolean(process.env.OPENAI_API_KEY || process.env.CLAUDE_API_KEY || process.env.GEMINI_API_KEY);

  const ready = databaseReady && aiConfigured;

  return NextResponse.json({
    ready,
    checks: {
      database: databaseReady,
      aiProvider: aiConfigured,
      auth: true,
    },
    timestamp: new Date().toISOString()
  }, { status: ready ? 200 : 503 });
}
