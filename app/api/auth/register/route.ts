import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = schema.parse(body);

    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CONFIG_ERROR',
            message: 'Database is not configured. Set DATABASE_URL before registration.',
          },
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: 'demo-user-id',
          email: payload.email,
          name: payload.name,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: 'REGISTRATION_FAILED', message: 'Registration failed' } },
      { status: 400 }
    );
  }
}
