import { NextRequest } from "next/server";
import CaseStudyRequestEmail, {
  CASE_STUDY_EMAIL_SUBJECT,
} from "@/emails/CaseStudyRequestEmail";
import { caseStudyRequestSchema } from "@/lib/case-study/request-schema";
import { EMAIL_FROM, getResend, OWNER_EMAIL } from "@/lib/email/resend";
import { consumeRateLimit, peekRateLimit } from "@/lib/rate-limit";

const IP_LIMIT = 5;
const IP_WINDOW_MS = 10 * 60 * 1000;
const EMAIL_WINDOW_MS = 60 * 1000;

const NO_STORE = { "Cache-Control": "no-store" };

function fail(status: number, error: string, extra?: HeadersInit) {
  return Response.json(
    { ok: false, error },
    { status, headers: { ...NO_STORE, ...extra } },
  );
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  // Behind a proxy either header may carry the public host; accept a match on any entry.
  const hosts = [request.headers.get("x-forwarded-host"), request.headers.get("host")]
    .flatMap((value) => value?.split(",") ?? [])
    .map((value) => value.trim());
  try {
    return hosts.includes(new URL(origin).host);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return fail(403, "forbidden");
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail(415, "invalid");
  }

  const body = await request.json().catch(() => null);
  const parsed = caseStudyRequestSchema.safeParse(body);
  if (!parsed.success) return fail(400, "invalid_email");

  const { email, website } = parsed.data;
  // Bots fill the hidden field; pretend success and send nothing.
  if (website) return Response.json({ ok: true }, { headers: NO_STORE });

  // Rightmost entry is the one our own proxy appended; earlier ones are client-supplied.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const retryAfter =
    peekRateLimit(`ip:${ip}`, IP_LIMIT) ||
    peekRateLimit(`email:${email}`, 1);
  if (retryAfter) return fail(429, "rate_limited", { "Retry-After": String(retryAfter) });

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [email],
      subject: CASE_STUDY_EMAIL_SUBJECT,
      react: CaseStudyRequestEmail(),
    });
    if (error) throw new Error(`${error.name}: ${error.message}`);
    // Only successful sends count, so a Resend outage does not lock visitors out.
    consumeRateLimit(`ip:${ip}`, IP_WINDOW_MS);
    consumeRateLimit(`email:${email}`, EMAIL_WINDOW_MS);

    // Owner heads-up; never fails the visitor's request.
    resend.emails
      .send({
        from: EMAIL_FROM,
        to: [OWNER_EMAIL],
        subject: "Case study request",
        text: `${email} requested the full case study PDF.`,
      })
      .then(({ error: notifyError }) => {
        if (notifyError) console.error("[case-study] owner notify failed:", notifyError);
      })
      .catch((err) => console.error("[case-study] owner notify failed:", err));
  } catch (err) {
    console.error("[case-study] send failed:", err);
    return fail(502, "send_failed");
  }

  return Response.json({ ok: true }, { headers: NO_STORE });
}
