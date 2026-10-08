import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(128)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const chatSchema = z.object({
  message: z.string().min(1).max(12000),
  conversationId: z.string().optional(),
});

export const fileUploadSchema = z.object({
  fileName: z.string().min(1).max(255),
  mimeType: z.string().min(1),
  size: z.number().max(10 * 1024 * 1024)
});
