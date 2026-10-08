# KHALIDAI

Production-ready AI application foundation built in Next.js with Prisma, secure env-based configuration, and production oriented health endpoints.

## Features

- Landing page
- Authentication-ready routes
- AI chat endpoint
- File upload endpoint
- Database model structure with Prisma
- Health endpoints: `/health`, `/readiness`, `/version`
- Security-first app shell

## Setup

1. Copy `.env.example` to `.env`
2. Fill required variables
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

## Health routes

- `GET /health`
- `GET /readiness`
- `GET /version`

## Notes

This project is intentionally structured for production readiness and does not expose secrets in source code.
