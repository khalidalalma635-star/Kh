import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  message: z.string().min(1).max(12000),
  conversationId: z.string().optional(),
  userId: z.string().optional(),
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

    const reply = `AI provider "${provider}" is configured. This secure placeholder response confirms the endpoint is working. Add a real provider integration and valid key to enable production-grade AI responses.`;

    return NextResponse.json(
      {
        success: true,
        data: {
          conversationId: payload.conversationId || 'demo-conversation',
          reply,
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
