"use client"

import * as React from "react"
import {
  motion,
  useMotionValueEvent,
  useSpring,
  type MotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"

export type ScrollProgressProps = React.ComponentProps<"div"> & {
  /** 0–1 across the tracked pages. */
  progress: MotionValue<number>
}

/** Progress ring. aria-valuenow reports the page (1–3). */
const ScrollProgress = ({ className, progress: source, ...props }: ScrollProgressProps) => {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const progress = useSpring(source, { stiffness: 120, damping: 30, mass: 0.3 })

  useMotionValueEvent(progress, "change", (value) => {
    const page = value < 1 / 3 ? 1 : value < 2 / 3 ? 2 : 3
    rootRef.current?.setAttribute("aria-valuenow", String(page))
  })

  return (
    <div
      ref={rootRef}
      data-slot="scroll-progress"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={3}
      aria-valuenow={1}
      aria-label="Selected works progress"
      className={cn("relative inline-flex text-foreground", className)}
      {...props}
    >
      <svg viewBox="0 0 24 24" className="size-5 -rotate-90" aria-hidden>
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth="2.5"
          className="stroke-current opacity-40"
        />
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="stroke-current"
          style={{ pathLength: progress }}
        />
      </svg>
    </div>
  )
}

export { ScrollProgress }
export default ScrollProgress
