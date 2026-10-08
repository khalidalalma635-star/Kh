export const appVersion = process.env.npm_package_version || '1.0.0';

export function getRuntimeInfo() {
  return {
    env: process.env.NODE_ENV || 'development',
    version: appVersion,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
}
