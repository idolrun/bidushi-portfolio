"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { InfoAwards } from "@/components/info/InfoAwards";
import { InfoBackLink } from "@/components/info/InfoBackLink";
import { InfoBiography } from "@/components/info/InfoBiography";
import { InfoContact } from "@/components/info/InfoContact";
import { InfoResearch } from "@/components/info/InfoResearch";
import { scrollToTop } from "@/lib/smooth-scroll";

gsap.registerPlugin(useGSAP);

export function InfoPage() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    scrollToTop(0, true);
  }, []);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-info-reveal]",
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <main ref={rootRef} className="relative min-h-dvh bg-[#090909] font-sans text-white">
      <InfoBackLink />
      <div className="mx-auto grid min-h-dvh w-full content-start gap-y-[clamp(3rem,8vw,4.5rem)] px-[clamp(1.35rem,4.7vw,4.5rem)] pt-[clamp(3.5rem,11.5vh,7rem)] pb-[max(clamp(2rem,6.7vh,4.25rem),env(safe-area-inset-bottom))] lg:grid-cols-[minmax(0,1.88fr)_minmax(0,1fr)] lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-x-[clamp(2.5rem,11.6vw,10rem)] lg:gap-y-0">
        <InfoBiography className="lg:col-start-1 lg:row-start-1 lg:mt-[clamp(1rem,3vh,2rem)]" />
        <div className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <InfoResearch />
          <InfoAwards />
        </div>
        <InfoContact className="lg:col-start-1 lg:row-start-2 lg:self-end" />
      </div>
    </main>
  );
}
