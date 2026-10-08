import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const getSecret = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export async function hashPassword(password: string) {
  const rounds = Number(process.env.BCRYPT_ROUNDS || '10');
  return bcrypt.hash(password, rounds);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signJwt(payload: object) {
  return jwt.sign(payload, getSecret('JWT_SECRET'), { expiresIn: '7d' });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, getSecret('JWT_SECRET')) as { userId: string; email: string };
}

export function getAuthToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization') || '';
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
}
