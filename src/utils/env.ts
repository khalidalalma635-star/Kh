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
  // App
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000'),
  
  // Database
  databaseUrl: requireEnv('DATABASE_URL'),
  
  // Auth
  nextAuthUrl: requireEnv('NEXTAUTH_URL'),
  nextAuthSecret: requireEnv('NEXTAUTH_SECRET'),
  jwtSecret: requireEnv('JWT_SECRET'),
  
  // AI Provider
  aiProvider: process.env.AI_PROVIDER || 'openai',
  openaiApiKey: process.env.OPENAI_API_KEY,
  claudeApiKey: process.env.CLAUDE_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  
  // Security
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10'),
  rateLimitRequests: parseInt(process.env.RATE_LIMIT_REQUESTS || '100'),
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || '900000'),
  
  // File Upload
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'),
  allowedFileTypes: (process.env.ALLOWED_FILE_TYPES || 'pdf,txt,md,json,csv').split(','),
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
};

export function validateConfig(): string[] {
  const errors: string[] = [];
  
  try {
    requireEnv('DATABASE_URL');
  } catch (e) {
    errors.push('DATABASE_URL is required');
  }
  
  try {
    requireEnv('NEXTAUTH_SECRET');
  } catch (e) {
    errors.push('NEXTAUTH_SECRET is required');
  }
  
  try {
    requireEnv('JWT_SECRET');
  } catch (e) {
    errors.push('JWT_SECRET is required');
  }
  
  return errors;
}
