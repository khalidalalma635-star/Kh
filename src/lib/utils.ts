import { randomBytes } from 'crypto';

export const appVersion = process.env.npm_package_version || '1.0.0';

export function getRuntimeInfo() {
  return {
    env: process.env.NODE_ENV || 'development',
    version: appVersion,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
}

export function safeSecret(value?: string) {
  if (!value || value.length < 8) {
    return null;
  }

  return value.slice(0, 6) + '...' + value.slice(-4);
}

export function createSessionToken() {
  return randomBytes(32).toString('hex');
}
