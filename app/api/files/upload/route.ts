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
    const body = await request.json();
    const payload = schema.parse(body);
    const allowed = (process.env.ALLOWED_FILE_TYPES || 'pdf,txt,md,json,csv').split(',').map((item) => item.trim().toLowerCase());
    const ext = payload.name.split('.').pop()?.toLowerCase() || '';

    if (!allowed.includes(ext)) {
      return NextResponse.json(
        { success: false, error: { code: 'UNSUPPORTED_FILE', message: 'Unsupported file type' } },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          name: payload.name,
          mimeType: payload.mimeType,
          size: payload.size,
          uploaded: true,
          path: `/uploads/${payload.name}`,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: 'UPLOAD_FAILED', message: 'File upload failed' } },
      { status: 400 }
    );
  }
}
