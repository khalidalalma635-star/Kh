import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = schema.parse(body);

    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CONFIG_ERROR',
            message: 'JWT secret is missing. Set JWT_SECRET before login.',
          },
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          token: 'demo-jwt-token',
          user: {
            id: 'demo-user-id',
            email: payload.email,
            name: 'Demo User',
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: 'LOGIN_FAILED', message: 'Unable to sign in' } },
      { status: 400 }
    );
  }
}
