import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import { OTHER_WORKS_TRIGGER_ID } from "@/lib/animations/otherWorksAnimations";
import {
  WORKS_LOCKUP_VISIBLE,
  WORKS_TIMELINE_DURATION,
} from "@/lib/animations/worksAnimations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToTop(top: number, immediate = false) {
  const reduce =
    immediate ||
    (typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  if (lenis) {
    lenis.scrollTo(top, { immediate: reduce, duration: reduce ? 0 : 1.1, force: true });
    return;
  }

  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

/** Scroll to the catchback lockup, just after the loader has left. */
export function scrollToCatchback(immediate = false) {
  const trigger = ScrollTrigger.getById("works-catchback");
  const progress = WORKS_LOCKUP_VISIBLE / WORKS_TIMELINE_DURATION;
  scrollToTop(trigger ? trigger.start + (trigger.end - trigger.start) * progress : 0, immediate);
}

/** Scroll to the start of the vahan pin. */
export function scrollToVahaan(immediate = false) {
  const trigger = ScrollTrigger.getById("works-vahaan");
  if (trigger) scrollToTop(trigger.start, immediate);
}

/** Scroll to the start of the other-works pin. */
export function scrollToOtherWorks() {
  const trigger = ScrollTrigger.getById(OTHER_WORKS_TRIGGER_ID);
  if (trigger) {
    scrollToTop(trigger.start);
    return;
  }

  const section = document.getElementById("other-works");
  if (!section) return;
  scrollToTop(section.getBoundingClientRect().top + window.scrollY);
}
