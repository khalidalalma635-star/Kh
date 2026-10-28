import { NextResponse } from 'next/server';

export async function GET() {
  const checks = {
    database: Boolean(process.env.DATABASE_URL),
    aiProvider: Boolean(process.env.OPENAI_API_KEY || process.env.CLAUDE_API_KEY || process.env.GEMINI_API_KEY),
    auth: Boolean(process.env.JWT_SECRET && process.env.NEXTAUTH_SECRET),
  };

  const ready = Object.values(checks).every(Boolean);

  return NextResponse.json(
    {
      ready,
      checks,
      timestamp: new Date().toISOString(),
    },
    { status: ready ? 200 : 503 }
  );
}
