import { NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = schema.parse(body);

    const user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' } },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(payload.password, user.password);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' } },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { success: false, error: { code: 'CONFIG_ERROR', message: 'JWT secret is missing' } },
        { status: 500 }
      );
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, secret, { expiresIn: '7d' });

    return NextResponse.json(
      {
        success: true,
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
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
