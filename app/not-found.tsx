"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const DIGITS = ["4", "0", "4"];

export default function NotFound() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1.1, delay, ease: EASE_OUT },
  });

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-[#090909] text-[#F5F5F5]">
      {/* breathing green glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[min(70vw,46rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--works-green,#3CFF55)] blur-[140px]"
        initial={{ opacity: 0 }}
        animate={reduce ? { opacity: 0.08 } : { opacity: [0.04, 0.1, 0.04] }}
        transition={
          reduce ? { duration: 0 } : { duration: 7, ease: "easeInOut", repeat: Infinity }
        }
      />

      <header className="relative z-10 flex items-start justify-between px-[clamp(1.35rem,4.6vw,3.15rem)] pt-[max(clamp(1.15rem,3.4vh,2rem),env(safe-area-inset-top))]">
        <motion.p
          {...rise(0.1)}
          className="m-0 font-sans text-[clamp(0.68rem,0.82vw,0.78rem)] leading-none font-medium tracking-[-0.01em] whitespace-nowrap"
        >
          Bidushi / YKSH
        </motion.p>
        <motion.p
          {...rise(0.2)}
          className="m-0 font-serif text-[clamp(0.62rem,0.95vw,0.84rem)] leading-none font-semibold text-[var(--works-green,#3CFF55)] italic"
        >
          PAGE NOT FOUND
        </motion.p>
      </header>

      <section className="relative z-10 flex flex-1 flex-col items-center justify-center gap-[clamp(1.25rem,3vw,2rem)] px-6 pb-12 text-center">
        <h1
          aria-label="404"
          className="m-0 flex text-[clamp(7rem,30vw,22rem)] leading-[0.8] italic [font-family:var(--font-ghosthey)] [font-synthesis:none] [text-rendering:geometricPrecision]"
        >
          {DIGITS.map((digit, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              {...rise(0.3 + i * 0.12)}
              className={i === 1 ? "text-[var(--works-green,#3CFF55)]" : undefined}
            >
              {digit}
            </motion.span>
          ))}
        </h1>

        <motion.p
          {...rise(0.8)}
          className="m-0 max-w-[26rem] font-serif text-[clamp(1rem,1.5vw,1.25rem)] leading-snug text-white/60 italic"
        >
          This page wandered off. Nothing here but quiet.
        </motion.p>

        <motion.div {...rise(0.95)}>
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-[#F5F5F5] px-7 py-4 text-[0.9375rem] font-medium text-[#0E0E10] transition-colors duration-300 hover:bg-[var(--works-green,#3CFF55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--works-green,#3CFF55)]"
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>
            Back to YKSH
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
