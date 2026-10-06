"use client";

import Link from "next/link";
import { MotionIcon } from "motion-icons-react";
import "motion-icons-react/style.css";
import { useState } from "react";

/** Back to the catchback section of the works page. */
export function InfoBackLink() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/#catchback"
      aria-label="Back to selected works"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute top-[clamp(0.9rem,3.2vh,1.75rem)] left-[clamp(1.35rem,4.7vw,4.5rem)] z-10 inline-flex w-fit text-white transition-opacity duration-200 hover:opacity-70 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <span className="inline-flex rotate-90">
        <MotionIcon name="ArrowDownLeft" size={20} animation={hovered ? "tada" : "none"} />
      </span>
    </Link>
  );
}
