import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const schema = z.object({
  message: z.string().min(1).max(12000),
  conversationId: z.string().optional(),
  userId: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = schema.parse(json);

    const provider = process.env.AI_PROVIDER || 'openai';
    const providerKey =
      provider === 'openai' ? process.env.OPENAI_API_KEY :
      provider === 'claude' ? process.env.CLAUDE_API_KEY :
      provider === 'gemini' ? process.env.GEMINI_API_KEY : undefined;

    if (!providerKey) {
      return NextResponse.json({ success: false, error: { code: 'AI_NOT_CONFIGURED', message: 'AI provider is not configured. Set environment variables before using chat.' } }, { status: 503 });
    }

    let conversation = null;
    if (payload.conversationId) {
      conversation = await prisma.conversation.findUnique({ where: { id: payload.conversationId } });
    }

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          title: payload.message.slice(0, 40) || 'New chat',
          userId: payload.userId || 'demo-user',
        }
      });
    }

    const assistantReply = `AI provider "${provider}" is configured. This response is a secure placeholder until you provide a real LLM integration implementation and a valid API key.`;

    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'user',
        content: payload.message,
      },
    });

    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'assistant',
        content: assistantReply,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        conversationId: conversation.id,
        reply: assistantReply,
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: { code: 'CHAT_FAILED', message: 'Unable to process chat request' } }, { status: 400 });
  }
}
