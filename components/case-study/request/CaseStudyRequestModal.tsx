"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { lockScroll, unlockScroll } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";
import { CaseStudyRequestForm } from "./CaseStudyRequestForm";
import { CaseStudyRequestSuccess } from "./CaseStudyRequestSuccess";
import "./case-study-request.css";

const CLOSE_MS = 150;

type Phase = "closed" | "open" | "closing";
type View = "form" | "leaving" | "success";

const FOCUSABLE = "a[href], button:not([disabled]), input:not([tabindex='-1']):not([disabled])";

export function CaseStudyRequestModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const [phase, setPhase] = useState<Phase>("closed");
  const [shown, setShown] = useState(false);
  const [view, setView] = useState<View>("form");
  const dialogRef = useRef<HTMLDivElement>(null);
  // Captured before the form mounts and steals focus.
  const [returnTo, setReturnTo] = useState<HTMLElement | null>(null);

  // closed -> open (mount, then flip `shown` a frame later so the transition runs)
  // open -> closing (animate out, then unmount)
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setPhase("open");
      setReturnTo(document.activeElement as HTMLElement | null);
    }
    else if (phase === "open") setPhase("closing");
  }

  useEffect(() => {
    if (phase === "open") {
      const frame = requestAnimationFrame(() =>
        requestAnimationFrame(() => setShown(true)),
      );
      return () => cancelAnimationFrame(frame);
    }
    if (phase === "closing") {
      const timer = setTimeout(() => {
        setPhase("closed");
        setShown(false);
        setView("form");
        returnTo?.focus({ preventScroll: true });
      }, CLOSE_MS);
      return () => clearTimeout(timer);
    }
  }, [phase, returnTo]);

  const phaseRef = useRef(phase);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const active = phase !== "closed";
  useEffect(() => {
    if (!active) return;
    lockScroll();
    return unlockScroll;
  }, [active]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (view !== "leaving") return;
    const timer = setTimeout(() => setView("success"), CLOSE_MS);
    return () => clearTimeout(timer);
  }, [view]);

  // A submit that resolves after the modal closed must not leak into the next open.
  const onSuccess = useCallback(() => {
    if (phaseRef.current === "open") setView("leaving");
  }, []);

  // Keep Tab inside the dialog without trapping anything else.
  const onDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const items = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!items?.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (phase === "closed") return null;

  const state = phase === "closing" ? "is-closing" : shown ? "is-open" : "";

  return createPortal(
    <div className="crm-layer">
      <div className={cn("crm-backdrop", state)} onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className={cn("t-modal font-sans", state)}
        onKeyDown={onDialogKeyDown}
      >
        <div key={view === "success" ? "success" : "form"} className={cn("crm-pane", view === "leaving" && "is-leaving")}>
          {view === "success" ? (
            <CaseStudyRequestSuccess id={titleId} />
          ) : (
            <CaseStudyRequestForm titleId={titleId} onSuccess={onSuccess} />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

