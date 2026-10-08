import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const prisma = new PrismaClient();

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = schema.parse(json);

    const exists = await prisma.user.findUnique({ where: { email: payload.email } });
    if (exists) {
      return NextResponse.json({ success: false, error: { code: 'USER_EXISTS', message: 'User already exists' } }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(payload.password, Number(process.env.BCRYPT_ROUNDS || 10));

    const user = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: passwordHash,
      },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: { code: 'INVALID_REQUEST', message: 'Registration failed' } }, { status: 400 });
  }
}
