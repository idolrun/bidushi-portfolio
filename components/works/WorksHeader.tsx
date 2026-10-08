"use client";

import { BrandMark } from "@/components/works/BrandMark";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import {
  mapWorksPageProgress,
  useWorksPageProgress,
} from "@/hooks/useWorksPageProgress";
import { OTHER_WORKS_TRIGGER_ID } from "@/lib/animations/otherWorksAnimations";
import { VAHAAN_TRIGGER_ID } from "@/lib/animations/vahaanAnimations";

export type WorksView = "catchback" | "vahan" | "other";

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
      </h1>
      <ScrollProgress
        progress={progress}
        className="justify-self-end self-center text-white"
      />
    </header>
  );
}
