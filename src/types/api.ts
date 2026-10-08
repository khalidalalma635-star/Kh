export interface HealthStatus {
  success: boolean;
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptime: number;
  version: string;
}

export interface ReadinessStatus {
  ready: boolean;
  checks: {
    database: boolean;
    aiProvider: boolean;
    auth: boolean;
  };
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: string;
}
