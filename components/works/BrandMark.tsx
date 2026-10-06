"use client";

import type { MouseEvent } from "react";
import confetti from "canvas-confetti";
import { Magnetic } from "@/components/ui/magnetic";

/** "Bidushi / YKSH". Click fires small confetti from the text toward the bottom right. */
export function BrandMark() {
  const fire = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    void confetti({
      particleCount: 36,
      angle: -45,
      spread: 150,
      startVelocity: 42,
      gravity: 0.9,
      ticks: 180,
      scalar: 0.6,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      disableForReducedMotion: true,
    });
  };

  return (
    <Magnetic radius={6} className="pointer-events-auto justify-self-start">
      <button
        type="button"
        onClick={fire}
        className="pointer-events-auto m-0 cursor-pointer border-0 bg-transparent p-0 font-sans text-[clamp(0.8rem,1vw,0.96rem)] leading-none font-medium tracking-[-0.01em] whitespace-nowrap text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        Bidushi / YKSH
      </button>
    </Magnetic>
  );
}
