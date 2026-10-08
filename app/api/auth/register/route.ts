import { NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = schema.parse(body);

    const existing = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: { code: 'USER_EXISTS', message: 'User already exists' } },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(payload.password, Number(process.env.BCRYPT_ROUNDS || 10));

    const user = await prisma.user.create({
      data: {
        email: payload.email,
        password: passwordHash,
        name: payload.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: 'REGISTRATION_FAILED', message: 'Registration failed' } },
      { status: 400 }
    );
  }
}
