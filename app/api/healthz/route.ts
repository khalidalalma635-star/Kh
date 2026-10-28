import { NextResponse } from 'next/server';

export function handleApiError(error: unknown, fallbackMessage: string = 'Internal server error') {
  if (error instanceof Error) {
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: process.env.NODE_ENV === 'production' ? fallbackMessage : error.message,
      },
    }, { status: 500 });
  }

  return NextResponse.json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: fallbackMessage,
    },
  }, { status: 500 });
}
