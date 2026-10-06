"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { CaseStudyRailToc } from "@/components/case-study/CaseStudyRailToc";
import type { RailTocItem } from "@/components/ui/rail-toc";
import { useCaseStudyReveal } from "@/hooks/useCaseStudyReveal";
import { scrollToTop } from "@/lib/smooth-scroll";

type Props = {
  hero: ReactNode;
  toc: RailTocItem[];
  children: ReactNode;
  /** Sits under the content column, before the credit (e.g. next case study link). */
  footer?: ReactNode;
};

export function CaseStudyShell({ hero, toc, children, footer }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  useCaseStudyReveal(rootRef);

  // Arriving from the pinned home page or another case study can leave scroll mid-document.
  useLayoutEffect(() => {
    scrollToTop(0, true);
  }, []);

  return (
    <main ref={rootRef} className="bg-white text-[#0E0E10]">
      {hero}
      <div className="mx-auto max-w-[1360px] px-[clamp(1.25rem,4vw,3.5rem)] pb-[clamp(4rem,8vw,7rem)] lg:grid lg:grid-cols-[minmax(0,1fr)_10.5rem] lg:gap-[clamp(2rem,4vw,4rem)]">
        <div className="min-w-0">
          {children}
          {footer}
        </div>
        <aside aria-label="Case study navigation" className="hidden lg:block">
          <div className="sticky top-24 pt-[clamp(2rem,4vw,3.5rem)]">
            <CaseStudyRailToc items={toc} />
          </div>
        </aside>
      </div>
    </main>
  );
}
