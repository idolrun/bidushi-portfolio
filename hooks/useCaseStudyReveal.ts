"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Fade-up once for every `[data-reveal]` inside scope. Quiet on purpose. */
export function useCaseStudyReveal(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        gsap.set(targets, { autoAlpha: 0, y: 24 });

        ScrollTrigger.batch(targets, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: true,
            }),
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      document.fonts.ready.then(refresh).catch(() => undefined);
    },
    { scope: scopeRef },
  );
}
