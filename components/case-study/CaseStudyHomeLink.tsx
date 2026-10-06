"use client";

import Link from "next/link";
import { MotionIcon } from "motion-icons-react";
import "motion-icons-react/style.css";
import { useState } from "react";
import { Magnetic } from "@/components/ui/magnetic";

/** Back to the vahan section of the works page. */
export function CaseStudyHomeLink() {
  const [hovered, setHovered] = useState(false);

  return (
    <Magnetic radius={6}>
      <Link
        href="/#vahan"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="m-0 inline-flex items-center gap-[0.6em] tracking-[0.3em] lowercase transition-opacity duration-200 hover:opacity-70 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--works-green,#3CFF55)]"
      >
        <span className="inline-flex rotate-90">
          <MotionIcon
            name="ArrowDownLeft"
            size={14}
            animation={hovered ? "tada" : "none"}
          />
        </span>
        vahan
      </Link>
    </Magnetic>
  );
}
