"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { caseStudyRequestSchema } from "@/lib/case-study/request-schema";
import { cn } from "@/lib/utils";
import { CaseStudyRequestTitle } from "./CaseStudyRequestTitle";

type Status = "idle" | "submitting" | "error";

const INVALID = "Please enter a valid email.";
const FAILED = "Something went wrong. Please try again.";
const THROTTLED = "Please wait a moment and try again.";

export function CaseStudyRequestForm({
  titleId,
  onSuccess,
}: {
  titleId: string;
  onSuccess: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  // Remove then re-add the class (with a reflow between) so the shake replays every time.
  const shake = () => {
    const el = inputRef.current;
    if (!el) return;
    el.classList.remove("is-shaking");
    void el.offsetWidth;
    el.classList.add("is-shaking");
  };

  const reject = (text: string, shouldShake: boolean) => {
    setStatus("error");
    setMessage(text);
    if (shouldShake) shake();
    inputRef.current?.focus({ preventScroll: true });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const data = new FormData(event.currentTarget);
    const parsed = caseStudyRequestSchema.safeParse({
      email: data.get("email"),
      website: data.get("website") ?? "",
    });
    if (!parsed.success) return reject(INVALID, true);

    setStatus("submitting");
    try {
      const res = await fetch("/api/case-study/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) return onSuccess();
      if (res.status === 400) return reject(INVALID, true);
      reject(res.status === 429 ? THROTTLED : FAILED, false);
    } catch {
      reject(FAILED, false);
    }
  };

  const hasError = status === "error";

  return (
    <form noValidate onSubmit={onSubmit}>
      <CaseStudyRequestTitle id={titleId} initial="C">
        ASE STUDY
        <br />
        REQUEST
      </CaseStudyRequestTitle>
      <p className="crm-copy">
        You are requesting the full case study, a PDF that will be emailed to you. Please
        enter the email you would like me to send it to.
      </p>

      <label htmlFor="crm-email" className="crm-label">
        Email
      </label>
      <div className={cn("t-input-wrap", hasError && "is-error")}>
        <input
          ref={inputRef}
          id="crm-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          maxLength={254}
          className={cn("t-input", hasError && "is-error")}
          aria-invalid={hasError}
          aria-describedby="crm-email-error"
          onChange={() => status === "error" && setStatus("idle")}
          onAnimationEnd={(e) => e.currentTarget.classList.remove("is-shaking")}
        />
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        />
      </div>
      <p
        id="crm-email-error"
        role="alert"
        className={cn("t-error-msg", hasError && "is-visible")}
      >
        {hasError ? message : ""}
      </p>

      <Magnetic radius={4} className="mt-2 self-start">
        <button type="submit" className="crm-submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Done"}
        </button>
      </Magnetic>
    </form>
  );
}
