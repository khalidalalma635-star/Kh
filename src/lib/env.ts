export function getEnv(key: string, required: boolean = false): string | undefined {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export function requireEnv(key: string): string {
  return getEnv(key, true) || '';
}

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000'),
  databaseUrl: process.env.DATABASE_URL,
  nextAuthUrl: process.env.NEXTAUTH_URL,
  nextAuthSecret: process.env.NEXTAUTH_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  aiProvider: process.env.AI_PROVIDER || 'openai',
  openaiApiKey: process.env.OPENAI_API_KEY,
  claudeApiKey: process.env.CLAUDE_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10'),
  rateLimitRequests: parseInt(process.env.RATE_LIMIT_REQUESTS || '100'),
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || '900000'),
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'),
  allowedFileTypes: (process.env.ALLOWED_FILE_TYPES || 'pdf,txt,md,json,csv').split(','),
  logLevel: process.env.LOG_LEVEL || 'info',
};
