import { NextRequest } from "next/server";
import { isValidTimeZone, resolveClocks, type TimeResponse } from "@/lib/clocks";
import { getTimeInstant } from "@/lib/world-time";

export async function GET(request: NextRequest) {
  const clocks = resolveClocks(request.nextUrl.searchParams.get("local"));
  const timezones = [
    ...new Set(clocks.map((clock) => clock.timezone).filter(isValidTimeZone)),
  ];

  try {
    const instant = await getTimeInstant(timezones);
    const body: TimeResponse = { instant, clocks };
    return Response.json(body, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json({ error: "Time unavailable" }, { status: 502 });
  }
}
