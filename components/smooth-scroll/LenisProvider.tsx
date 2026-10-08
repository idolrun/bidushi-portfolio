"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { scrollToCatchback, setLenis } from "@/lib/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);

const LOADER_SETTLED_EVENT = "portfolio-loader:settled";
/** Idle time at the top before the YKSH split plays itself. */
const IDLE_SPLIT_MS = 7000;
/** Slow ease-in-out so the auto split reads as a gentle glide, not a jump. */
const IDLE_SCROLL = {
  duration: 3.6,
  easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2),
};
const IDLE_EVENTS = ["wheel", "touchstart", "keydown", "scroll"] as const;

export function LenisProvider() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    let refreshFrame = 0;
    let idleTimer = 0;

    const stopIdle = () => {
      window.clearTimeout(idleTimer);
      IDLE_EVENTS.forEach((type) => window.removeEventListener(type, armIdle));
    };
    function armIdle() {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        stopIdle();
        if (window.scrollY < 1) scrollToCatchback(false, IDLE_SCROLL);
      }, IDLE_SPLIT_MS);
    }

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

      if (
        document.getElementById("portfolio-loader") &&
        !document.documentElement.dataset.loaderReduced
      ) {
        IDLE_EVENTS.forEach((type) =>
          window.addEventListener(type, armIdle, { passive: true }),
        );
        armIdle();
      }
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
      stopIdle();
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
