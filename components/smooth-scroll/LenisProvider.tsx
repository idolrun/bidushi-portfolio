"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);

const LOADER_SETTLED_EVENT = "portfolio-loader:settled";

export function LenisProvider() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    let refreshFrame = 0;

    const start = () => {
      if (lenis) return;

      const instance = new Lenis({ autoRaf: false });
      lenis = instance;
      setLenis(instance);
      instance.on("scroll", ScrollTrigger.update);

      tick = (time: number) => {
        instance.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    if (
      document.documentElement.dataset.loaderSettled === "true" ||
      !document.getElementById("portfolio-loader")
    ) {
      start();
    } else {
      window.addEventListener(LOADER_SETTLED_EVENT, start, { once: true });
    }

    return () => {
      window.removeEventListener(LOADER_SETTLED_EVENT, start);
      window.cancelAnimationFrame(refreshFrame);
      if (tick) gsap.ticker.remove(tick);
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        setLenis(null);
      }
    };
  }, []);

  return null;
}
