"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToCatchback, scrollToVahaan } from "@/lib/smooth-scroll";

/** Landing on `/#vahan` or `/#catchback`: jump to that pin once triggers exist. */
export function ScrollToHash() {
  useEffect(() => {
    const { hash } = window.location;
    if (hash !== "#vahan" && hash !== "#catchback") return;

    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (hash === "#vahan") scrollToVahaan(true);
      else scrollToCatchback(true);
    }, 150);
    return () => window.clearTimeout(id);
  }, []);

  return null;
}
