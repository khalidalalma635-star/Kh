# KHALIDAI - Production-Ready AI Application Foundation

A secure, scalable foundation for building AI-powered applications with Next.js, Prisma, and TypeScript.

## Features

✅ **Landing Page** - Professional marketing homepage
✅ **Authentication** - JWT-based auth with bcrypt password hashing
✅ **AI Chat** - Extensible chat endpoint with provider configuration
✅ **File Upload** - Secure file handling with type validation
✅ **Projects & Memory** - Conversation and project management database models
✅ **Health Endpoints** - `/health`, `/readiness`, `/version` for infrastructure monitoring
✅ **Security-First** - Input validation, security headers, environment-based secrets
✅ **Dashboard** - User workspace with stats and activity
✅ **Database** - Prisma ORM with PostgreSQL schema
✅ **TypeScript** - Full type safety across the codebase

## Quick Start

```bash
# 1. Copy environment template
cp .env.example .env

# 2. Fill in required environment variables
# DATABASE_URL, NEXTAUTH_SECRET, JWT_SECRET, AI_PROVIDER, etc.

# 3. Install dependencies
npm install

# 4. Generate Prisma client
npx prisma generate

# 5. Run migrations (when database is ready)
npx prisma migrate dev

# 6. Start development server
npm run dev
```

## Required Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - NextAuth callback URL
- `NEXTAUTH_SECRET` - NextAuth session secret (min 32 chars)
- `JWT_SECRET` - JWT signing secret (min 32 chars)
- `AI_PROVIDER` - AI service provider (openai, claude, gemini)
- `OPENAI_API_KEY` or `CLAUDE_API_KEY` or `GEMINI_API_KEY`

## Project Structure

```
app/                   # Next.js app directory
├── page.tsx           # Landing page
├── layout.tsx         # Root layout
├── login/page.tsx     # Login page
├── dashboard/page.tsx # User dashboard
├── chat/page.tsx      # Chat interface
├── projects/page.tsx  # Projects list
├── settings/page.tsx  # User settings
├── api/               # API routes
│   ├── auth/          # Authentication endpoints
│   ├── chat/          # Chat endpoint
│   └── files/         # File upload endpoint
├── health/route.ts    # Health check
├── readiness/route.ts # Readiness probe
└── version/route.ts   # Version endpoint

src/
├── lib/               # Utility functions
│   ├── auth.ts        # Auth helpers
│   ├── env.ts         # Environment config
│   ├── logger.ts      # Logging
│   ├── prisma.ts      # Prisma client
│   ├── security.ts    # Security headers
│   └── validation.ts  # Input validation
├── components/        # React components
├── types/             # TypeScript types
└── middleware.ts      # Request middleware

prisma/
└── schema.prisma      # Database schema
```

## API Endpoints

### Health & Status
- `GET /health` - Basic health check
- `GET /readiness` - Readiness probe (checks DB and AI config)
- `GET /version` - Version information

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Chat
- `POST /api/chat` - Send message to AI

### Files
- `POST /api/files/upload` - Upload document

## Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run type checking
npx tsc --noEmit

# Run tests
npm test

# Prisma studio (GUI database viewer)
npm run prisma:studio
```

## Security

- ✅ Environment variables for all secrets
- ✅ JWT-based authentication
- ✅ Bcrypt password hashing
- ✅ Input validation with Zod
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ CORS protection
- ✅ SQL injection prevention via Prisma
- ✅ XSS protection via React

## Production Deployment

### Vercel
```bash
git push origin feature/khalidai-production
# Connect repository to Vercel
# Set environment variables in Vercel dashboard
# Vercel will auto-deploy on push
```

### Self-Hosted (Docker)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npx prisma generate
CMD ["npm", "run", "start"]
```

### Railway / Render
1. Connect GitHub repository
2. Set environment variables
3. Deploy branch: `feature/khalidai-production`

## Monitoring

Health endpoints enable monitoring:

```bash
# Check if app is running
curl http://localhost:3000/health

# Check if app is ready for traffic
curl http://localhost:3000/readiness

# Get version info
curl http://localhost:3000/version
```

## Next Steps

1. **Connect Database** - Set `DATABASE_URL` to your PostgreSQL instance
2. **Add AI Provider** - Get API key from OpenAI/Claude/Gemini
3. **Run Migrations** - `npx prisma migrate dev`
4. **Start Development** - `npm run dev`
5. **Customize** - Modify pages, add features, extend database schema

## Important Notes

- This is a foundation. Full AI features require a valid provider API key
- Database must be configured before production deployment
- All secrets must be in environment variables, never in code
- Run `npm run build` to verify TypeScript compilation before deploying
- Test health endpoints on production to ensure proper setup

## License

MIT

## Support

For issues or questions, check the health endpoints first:
- `/health` should return 200 OK
- `/readiness` should return 200 OK only when fully configured
- Check logs for detailed error messages

---

**Built with Next.js 14 • Prisma ORM • TypeScript • Tailwind CSS**
