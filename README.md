# KHALIDAI - Production Ready AI Application

## Overview

KHALIDAI is a production-oriented foundation for building a secure AI application with real workflows, authentication, and operational automation.

## Features

✅ **Landing Page** - Professional introduction to the platform  
✅ **Authentication** - Register and Login endpoints with JWT  
✅ **Dashboard** - User workspace overview  
✅ **AI Chat** - Real-time conversation interface  
✅ **Projects** - Workspace management  
✅ **Settings** - Account and system configuration  
✅ **File Upload** - Secure file handling with validation  
✅ **Health Endpoints** - `/health`, `/readiness`, `/version`  
✅ **Security Headers** - Frame options, CSP, CORS, etc.  
✅ **Database Ready** - PostgreSQL + Prisma schema  
✅ **Environment-First** - All secrets in .env, never in code  
✅ **Validation** - Zod schema validation on all inputs  
✅ **Error Handling** - Proper HTTP status codes and messages  
✅ **Rate Limiting** - Basic request rate limiting  
✅ **TypeScript** - Full type safety  

## Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/khalidalalma635-star/Kh.git
cd Kh
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your real values:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/khalidai"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secure-random-string"
JWT_SECRET="your-secure-random-string"
AI_PROVIDER="openai"  # or "claude" or "gemini"
OPENAI_API_KEY="sk-..."
```

### 3. Setup Database

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Run Locally

```bash
npm run dev
```

Open http://localhost:3000

### 5. Build for Production

```bash
npm run build
npm start
```

## API Routes

### Health & Monitoring

- `GET /health` - Basic health check
- `GET /readiness` - Readiness probe (checks DB + AI provider)
- `GET /version` - Version information

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (returns JWT token)

### Chat

- `POST /api/chat` - Send a message to AI

### Files

- `POST /api/files/upload` - Upload and process a file

## Environment Variables

### Required

| Variable | Description | Example |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `NEXTAUTH_URL` | App URL for NextAuth | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Random secret key (min 32 chars) | Generate: `openssl rand -base64 32` |
| `JWT_SECRET` | Random JWT secret (min 32 chars) | Generate: `openssl rand -base64 32` |
| `AI_PROVIDER` | AI provider (`openai`, `claude`, `gemini`) | `openai` |
| (AI Key) | API key for selected provider | `sk-...` or `sk-ant-...` or `AIza...` |

### Optional

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `development` | Environment mode |
| `PORT` | `3000` | Server port |
| `LOG_LEVEL` | `info` | Logging level |
| `BCRYPT_ROUNDS` | `10` | Password hash rounds |
| `RATE_LIMIT_REQUESTS` | `100` | Rate limit per window |
| `RATE_LIMIT_WINDOW` | `900000` | Rate limit window (ms) |
| `MAX_FILE_SIZE` | `10485760` | Max file size (bytes) |
| `ALLOWED_FILE_TYPES` | `pdf,txt,md,json,csv` | Allowed file extensions |

## Security

✅ **No Secrets in Code** - All sensitive values from environment variables  
✅ **Input Validation** - Zod schema validation on all endpoints  
✅ **Security Headers** - X-Frame-Options, X-Content-Type-Options, CSP  
✅ **Password Hashing** - Bcrypt with configurable rounds  
✅ **JWT Tokens** - 7-day expiration by default  
✅ **Rate Limiting** - Prevent brute force attacks  
✅ **SQL Injection Prevention** - Prisma parameterized queries  
✅ **XSS Prevention** - Output encoding via React  
✅ **CSRF Protection** - Via NextAuth mechanism  

## Database Schema

The Prisma schema includes:

- **User** - Account management
- **Conversation** - Chat conversations
- **Message** - Individual messages
- **Project** - Workspace projects
- **File** - Uploaded documents
- **Memory** - User-specific memory/context

## Testing

```bash
# Run basic smoke test
npm test

# Watch mode
npm run test:watch
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repo to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional VPS

```bash
npm run build
PORT=3000 npm start
```

## Important Notes

⚠️ **This is a foundation**, not a complete production system yet. To achieve full functionality:

1. Provide a **real PostgreSQL database**
2. Configure a **real AI provider** (OpenAI, Claude, or Gemini)
3. Set proper **secure secrets** (JWT_SECRET, NEXTAUTH_SECRET)
4. Run the application in a **production environment**
5. Test all endpoints with **real data**

## Support

For issues or questions, open an issue on the GitHub repository.

## License

MIT
