export const DEFAULT_LOCAL_TIMEZONE = "Asia/Kathmandu";

export const CLOCKS = [
  { name: "Local Time", timezone: DEFAULT_LOCAL_TIMEZONE },
  { name: "New York", timezone: "America/New_York" },
  { name: "London", timezone: "Europe/London" },
  { name: "Bangalore", timezone: "Asia/Kolkata" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
] as const;

const TIME_ZONE_PATTERN = /^[A-Za-z]+(?:\/[A-Za-z0-9_+-]+)+$/;

export type ClockReading = {
  name: string;
  timezone: string;
};

export type TimeResponse = {
  instant: number;
  clocks: ClockReading[];
};

export type TimeAnchor = {
  instant: number;
  receivedAt: number;
};

export function isValidTimeZone(timeZone: string): boolean {
  if (!TIME_ZONE_PATTERN.test(timeZone)) return false;
  try {
    Intl.DateTimeFormat("en-GB", { timeZone }).format(0);
    return true;
  } catch {
    return false;
  }
}

export function resolveLocalTimeZone(candidate?: string | null): string {
  if (candidate && isValidTimeZone(candidate)) return candidate;
  return DEFAULT_LOCAL_TIMEZONE;
}

export function detectVisitorTimeZone(): string {
  try {
    return resolveLocalTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  } catch {
    return DEFAULT_LOCAL_TIMEZONE;
  }
}

export function resolveClocks(visitorZone?: string | null): ClockReading[] {
  const localZone = resolveLocalTimeZone(visitorZone);
  return CLOCKS.map((clock) => ({
    name: clock.name,
    timezone: clock.name === "Local Time" ? localZone : clock.timezone,
  }));
}

export function isTimeResponse(value: unknown): value is TimeResponse {
  if (!value || typeof value !== "object") return false;
  const record = value as { instant?: unknown; clocks?: unknown };
  if (typeof record.instant !== "number" || !Number.isFinite(record.instant)) return false;
  if (!Array.isArray(record.clocks)) return false;
  return record.clocks.every(
    (clock) =>
      !!clock &&
      typeof clock === "object" &&
      typeof (clock as ClockReading).name === "string" &&
      isValidTimeZone((clock as ClockReading).timezone),
  );
}

export function instantToDate(anchor: TimeAnchor | null, now = Date.now()): Date {
  if (!anchor) return new Date(now);
  return new Date(anchor.instant + (now - anchor.receivedAt));
}

export const CLOCK_TIME_PLACEHOLDER = "--:--";

export function formatClockTime(timeZone: string, date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: timeZone === "local" ? undefined : timeZone,
  }).formatToParts(date);
  const hour = parts.find((part) => part.type === "hour")?.value ?? "00";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";
  return `${hour}:${minute}`;
}
