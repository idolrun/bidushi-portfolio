import "server-only";
import { Resend } from "resend";

export const EMAIL_FROM = "Bidushi <hello@bidushi.design>";
export const OWNER_EMAIL = "hello@bidushi.design";

let client: Resend | null = null;

/** Lazy so `next build` works without secrets. */
export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return (client ??= new Resend(key));
}
