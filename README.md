# KHALIDAI

This repository contains the initial production-oriented foundation for the KHALIDAI product.

## Included

- Landing page
- Login page
- Dashboard page
- Chat page
- Projects page
- Settings page
- Health endpoints: `/health`, `/readiness`, `/version`
- Secure API route structure
- Environment-driven configuration
- Basic validation and security headers

## Setup

1. Copy `.env.example` to `.env`
2. Fill in real values for your environment
3. Run `npm install`
4. Run `npx prisma generate`
5. Run `npm run build`
6. Run `npm run dev`

## Required environment variables

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `JWT_SECRET`
- `AI_PROVIDER`
- `OPENAI_API_KEY` or `CLAUDE_API_KEY` or `GEMINI_API_KEY`

## Important note

This is still a foundation project. To achieve full production behavior, you must provide a valid database and a valid AI provider API key. The app intentionally refuses to claim success without real configuration.
