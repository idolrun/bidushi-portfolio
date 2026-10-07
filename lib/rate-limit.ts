import "server-only";

const MAX_KEYS = 10_000;
const hits = new Map<string, { count: number; resetAt: number }>();
let nextSweep = 0;

// ponytail: in-memory, per process. Resets on deploy and breaks past one container; swap for Redis/Upstash if scaled out.
function sweep(now: number) {
  if (now < nextSweep && hits.size < MAX_KEYS) return;
  nextSweep = now + 60_000;
  for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  // Still full of live keys: drop the oldest so memory stays bounded.
  while (hits.size >= MAX_KEYS) hits.delete(hits.keys().next().value!);
}

/** Seconds until retry when `key` is over its limit, otherwise 0. Does not count the call. */
export function peekRateLimit(key: string, limit: number): number {
  const now = Date.now();
  sweep(now);
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now || entry.count < limit) return 0;
  return Math.ceil((entry.resetAt - now) / 1000);
}

/** Records one use of `key`. */
export function consumeRateLimit(key: string, windowMs: number) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) hits.set(key, { count: 1, resetAt: now + windowMs });
  else entry.count += 1;
}
