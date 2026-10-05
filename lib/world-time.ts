import "server-only";

const HOST = "world-time-api3.p.rapidapi.com";
const CACHE_TTL_MS = 5 * 60 * 1000;

type CacheEntry = {
  instant: number;
  fetchedAt: number;
};

type WorldTimePayload = {
  unixtime?: unknown;
  utc_datetime?: unknown;
};

const cache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<number>>();

function readInstant(data: WorldTimePayload): number {
  if (typeof data.utc_datetime === "string") {
    const parsed = Date.parse(data.utc_datetime);
    if (!Number.isNaN(parsed)) return parsed;
  }
  if (typeof data.unixtime === "number" && Number.isFinite(data.unixtime)) {
    return data.unixtime * 1000;
  }
  throw new Error("Invalid world time payload");
}

async function requestZone(timezone: string, apiKey: string): Promise<number> {
  const response = await fetch(`https://${HOST}/timezone/${timezone}`, {
    headers: {
      "x-rapidapi-host": HOST,
      "x-rapidapi-key": apiKey,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`World time request failed (${response.status})`);
  }

  const instant = readInstant((await response.json()) as WorldTimePayload);
  const fetchedAt = Date.now();
  cache.set(timezone, { instant, fetchedAt });
  return instant + (Date.now() - fetchedAt);
}

async function fetchZone(timezone: string, apiKey: string): Promise<number> {
  const cached = cache.get(timezone);
  const now = Date.now();
  if (cached && now - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.instant + (now - cached.fetchedAt);
  }

  const pending = inflight.get(timezone);
  if (pending) return pending;

  const request = requestZone(timezone, apiKey).finally(() => {
    inflight.delete(timezone);
  });
  inflight.set(timezone, request);
  return request;
}

export async function getTimeInstant(timezones: readonly string[]): Promise<number> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    throw new Error("Missing RAPIDAPI_KEY");
  }

  const results = await Promise.allSettled(
    timezones.map((timezone) => fetchZone(timezone, apiKey)),
  );
  const instants = results.flatMap((result) =>
    result.status === "fulfilled" ? [result.value] : [],
  );

  if (instants.length === 0) {
    throw new Error("World time unavailable");
  }

  return Math.max(...instants);
}
