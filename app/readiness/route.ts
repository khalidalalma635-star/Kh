import { NextResponse } from 'next/server';

export async function GET() {
  const databaseConfigured = Boolean(process.env.DATABASE_URL);
  const aiConfigured = Boolean(
    process.env.OPENAI_API_KEY || process.env.CLAUDE_API_KEY || process.env.GEMINI_API_KEY
  );
  const authConfigured = Boolean(process.env.JWT_SECRET && process.env.NEXTAUTH_SECRET);

  const ready = databaseConfigured && aiConfigured && authConfigured;

  return NextResponse.json(
    {
      ready,
      checks: {
        database: databaseConfigured,
        aiProvider: aiConfigured,
        auth: authConfigured,
      },
      timestamp: new Date().toISOString(),
    },
    { status: ready ? 200 : 503 }
  );
}
