import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  message: z.string().min(1).max(12000),
  conversationId: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = schema.parse(body);

    const provider = (process.env.AI_PROVIDER || 'openai').toLowerCase();
    const providerKey =
      provider === 'openai'
        ? process.env.OPENAI_API_KEY
        : provider === 'claude'
          ? process.env.CLAUDE_API_KEY
          : provider === 'gemini'
            ? process.env.GEMINI_API_KEY
            : undefined;

    if (!providerKey) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'AI_NOT_CONFIGURED',
            message: 'AI provider is not configured. Set environment variables before using chat.',
          },
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          conversationId: payload.conversationId || 'demo-conversation',
          reply: `AI provider "${provider}" is configured. This is the secure placeholder response for the chat endpoint. Add a real provider call after setting the correct API key.`,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: 'CHAT_FAILED', message: 'Unable to process chat request' } },
      { status: 400 }
    );
  }
}
