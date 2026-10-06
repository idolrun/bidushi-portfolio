"use client";

import { MotionIcon } from "motion-icons-react";
import "motion-icons-react/style.css";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { BrandMark } from "@/components/works/BrandMark";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import {
  mapWorksPageProgress,
  useWorksPageProgress,
} from "@/hooks/useWorksPageProgress";
import { OTHER_WORKS_TRIGGER_ID } from "@/lib/animations/otherWorksAnimations";
import { VAHAAN_TRIGGER_ID } from "@/lib/animations/vahaanAnimations";
import { scrollToCatchback, scrollToVahaan } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const PROJECTS = [
  { id: "catchback", label: "CATCHBACK" },
  { id: "vahan", label: "VAHAN.AI" },
] as const;

const menuItemClass =
  "m-0 border-0 bg-transparent p-0 font-serif text-[length:inherit] leading-none font-semibold tracking-[inherit] whitespace-nowrap text-white italic";

export type WorksView = (typeof PROJECTS)[number]["id"] | "other";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** ScrollTrigger that drives the ring, and how its progress maps onto it. */
const RING: Record<
  WorksView,
  { triggerId: string; map: (scrollProgress: number) => number }
> = {
  catchback: { triggerId: "works-catchback", map: mapWorksPageProgress },
  vahan: { triggerId: VAHAAN_TRIGGER_ID, map: clamp01 },
  other: { triggerId: OTHER_WORKS_TRIGGER_ID, map: clamp01 },
};

export function WorksHeader({ current }: { current: WorksView }) {
  const progress = useWorksPageProgress(
    RING[current].triggerId,
    RING[current].map,
  );
  const currentLabel = PROJECTS.find(
    (project) => project.id === current,
  )?.label;
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const cancelClose = () => {
    clearTimeout(closeTimer.current);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  const openMenu = () => {
    cancelClose();
    setOpen(true);
  };

  useEffect(() => () => cancelClose(), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const choose = (id: (typeof PROJECTS)[number]["id"]) => {
    cancelClose();
    setOpen(false);
    if (id === "catchback") scrollToCatchback();
    else scrollToVahaan();
  };

  return (
    <header className="works-header pointer-events-none fixed inset-x-0 top-0 z-30 grid grid-cols-[1fr_auto_1fr] items-start gap-3 px-[clamp(1.35rem,4.6vw,3.15rem)] pt-[max(clamp(1.15rem,3.4vh,2rem),env(safe-area-inset-top))]">
      {/* Behind the header text (-z-10), so only the page underneath is blurred. */}
      <ProgressiveBlur
        position="top"
        height="calc(100% + 2rem)"
        blurLevels={[0.5, 1, 2, 4, 6, 8, 12, 16]}
        className="-z-10"
      />
      <BrandMark />
      <h1 className="m-0 flex items-baseline justify-self-center gap-[0.7em] text-center font-serif text-[clamp(0.62rem,0.95vw,0.84rem)] leading-none font-semibold text-[var(--works-green,#3CFF55)] italic">
        <span>{current === "other" ? "OTHER WORKS" : "SELECTED WORK"}</span>
        {current === "other" ? null : (
          <span
            className="pointer-events-auto relative"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
            onFocus={openMenu}
            onBlur={(event) => {
              if (event.currentTarget.contains(event.relatedTarget)) return;
              scheduleClose();
            }}
          >
            <button
              type="button"
              className={cn(
                menuItemClass,
                "inline-flex items-center gap-[0.4em]",
              )}
              aria-expanded={open}
              aria-controls={menuId}
              aria-haspopup="menu"
            >
              {currentLabel}
              <MotionIcon name="ArrowUpRight" size={15} animation="pulse" />
            </button>
            <AnimatePresence>
              {open ? (
                <motion.ul
                  id={menuId}
                  role="menu"
                  aria-label="Selected work"
                  initial={
                    reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                  className="absolute top-full left-1/2 z-40 m-0 mt-2 flex -translate-x-1/2 list-none flex-col items-center gap-1.5 p-0"
                >
                  {PROJECTS.filter((project) => project.id !== current).map(
                    (project) => (
                      <li key={project.id} role="none">
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => choose(project.id)}
                          className={cn(
                            menuItemClass,
                            "inline-flex items-center gap-[0.4em] opacity-55 hover:opacity-100",
                          )}
                        >
                          {project.label}
                          <MotionIcon
                            name="ArrowUpRight"
                            size={15}
                            animation="pulse"
                          />
                        </button>
                      </li>
                    ),
                  )}
                </motion.ul>
              ) : null}
            </AnimatePresence>
          </span>
        )}
      </h1>
      <ScrollProgress
        progress={progress}
        className="justify-self-end self-center text-white"
      />
    </header>
  );
}
