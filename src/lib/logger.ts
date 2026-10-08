const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const levels = { error: 0, warn: 1, info: 2, debug: 3 };
const currentLevel = levels[LOG_LEVEL as keyof typeof levels] || 2;

function shouldLog(level: keyof typeof levels): boolean {
  return levels[level] <= currentLevel;
}

function formatLog(level: string, message: string, data?: any): string {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  if (data) {
    return `${prefix} ${message} ${JSON.stringify(data)}`;
  }
  return `${prefix} ${message}`;
}

export const logger = {
  error: (message: string, data?: any) => {
    if (shouldLog('error')) {
      console.error(formatLog('error', message, data));
    }
  },
  warn: (message: string, data?: any) => {
    if (shouldLog('warn')) {
      console.warn(formatLog('warn', message, data));
    }
  },
  info: (message: string, data?: any) => {
    if (shouldLog('info')) {
      console.log(formatLog('info', message, data));
    }
  },
  debug: (message: string, data?: any) => {
    if (shouldLog('debug')) {
      console.debug(formatLog('debug', message, data));
    }
  },
};
