const windowMs = Number(process.env.RATE_LIMIT_WINDOW || '900000');
const maxRequests = Number(process.env.RATE_LIMIT_REQUESTS || '100');

const hits = new Map<string, { count: number; resetAt: number }>();

export function enforceRateLimit(identifier: string) {
  const now = Date.now();
  const current = hits.get(identifier);

  if (!current || now > current.resetAt) {
    hits.set(identifier, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count += 1;
  hits.set(identifier, current);
  return true;
}
