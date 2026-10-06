"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionValue, type MotionValue } from "motion/react";
import { WORKS_PHONES_PAGE, WORKS_TIMELINE_DURATION } from "@/lib/animations/worksAnimations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PAGE_COUNT = 2;

/**
 * Maps the pinned works scroll onto two equal pages:
 * lockup, then phones.
 */
export function mapWorksPageProgress(scrollProgress: number) {
  const phones = WORKS_PHONES_PAGE / WORKS_TIMELINE_DURATION;
  const p = gsap.utils.clamp(0, 1, scrollProgress);

  if (p <= phones) return (p / phones) / PAGE_COUNT;
  return (1 + (p - phones) / (1 - phones)) / PAGE_COUNT;
}

export function useWorksPageProgress(
  triggerId = "works-catchback",
  map: (scrollProgress: number) => number = mapWorksPageProgress,
): MotionValue<number> {
  const progress = useMotionValue(0);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      progress.set(1);
      return;
    }

    const tick = () => {
      const trigger = ScrollTrigger.getById(triggerId);
      if (!trigger) return;
      const next = map(trigger.progress);
      if (Math.abs(progress.get() - next) < 0.0005) return;
      progress.set(next);
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, { dependencies: [triggerId, map, progress] });

  return progress;
}
