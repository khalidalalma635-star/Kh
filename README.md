import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  mimeType: z.string().min(1),
  size: z.number().max(10 * 1024 * 1024),
  content: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = schema.parse(json);

    if (!process.env.ALLOWED_FILE_TYPES) {
      return NextResponse.json({ success: false, error: { code: 'CONFIG_ERROR', message: 'File upload configuration missing' } }, { status: 500 });
    }

    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || '').split(',').map((item) => item.trim().toLowerCase());
    const extension = payload.name.split('.').pop()?.toLowerCase() || '';

    if (!allowedTypes.includes(extension)) {
      return NextResponse.json({ success: false, error: { code: 'UNSUPPORTED_FILE', message: 'Unsupported file type' } }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: {
        name: payload.name,
        mimeType: payload.mimeType,
        size: payload.size,
        uploaded: true,
        path: `/uploads/${payload.name}`,
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: { code: 'UPLOAD_FAILED', message: 'File upload failed' } }, { status: 400 });
  }
}
