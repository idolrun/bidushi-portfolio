"use client"

import * as React from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

const SPRING = { stiffness: 220, damping: 18, mass: 0.4 } as const

export type MagneticProps = React.ComponentProps<"div"> & {
  /** Pull starts when the pointer is within this many px of the element centre. */
  radius?: number
  /** Share of the pointer offset the element follows. 0–1. */
  strength?: number
}

const Magnetic = ({
  className,
  children,
  radius = 60,
  strength = 0.35,
  ...props
}: MagneticProps) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const x = useSpring(useMotionValue(0), SPRING)
  const y = useSpring(useMotionValue(0), SPRING)

  React.useEffect(() => {
    if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return

    const onMove = (event: PointerEvent) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      const near = Math.hypot(dx, dy) <= radius + Math.max(rect.width, rect.height) / 2
      x.set(near ? dx * strength : 0)
      y.set(near ? dy * strength : 0)
    }
    const release = () => {
      x.set(0)
      y.set(0)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", release)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", release)
    }
  }, [reduceMotion, radius, strength, x, y])

  return (
    <motion.div
      ref={ref}
      data-slot="magnetic"
      className={cn("inline-flex", className)}
      style={{ x, y }}
      {...(props as object)}
    >
      {children}
    </motion.div>
  )
}

export { Magnetic }
export default Magnetic
