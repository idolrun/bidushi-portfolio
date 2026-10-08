import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CAPTION_DELAY,
  CAPTION_DURATION,
  CLOSE_AT,
  CLOSE_DURATION,
  CLOSE_END,
  FIRST_PAGE_AT,
  PAGE_EXIT_DURATION,
  PAGE_HOLD,
  PAGE_IN_DURATION,
  PIN_PERCENT_PER_UNIT,
  SCRUB,
} from "@/lib/animations/worksTiming";
import { slideInFromRight, slideOutToLeft } from "@/lib/animations/horizontalPages";
import { dropTitle } from "@/lib/animations/titleDrop";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Each half starts apart along the normal of its diagonal cut. On the
 * 1248×1460 assets the cut runs corner to corner, so the normal pointing from
 * the top half toward the bottom half is (0.7601, 0.6498). Paperight's
 * 1806×2048 halves share it (its own normal is (0.7500, 0.6613)). Offsets are a
 * fraction of the piece height, not the viewport, so the two diagonals stay
 * parallel at any size and touch exactly at rest (0, 0).
 * Compact layouts multiply the travel by `distance`.
 */
const SEAM_NX = 0.7601;
const SEAM_NY = 0.6498;
const PIECE_DISTANCE = 0.48;
const PHONE_X = 0.28;
const PHONE_Y = 0.18;
const PHONE_FROM_SCALE = 0.92;

const PHONES_AT = FIRST_PAGE_AT;
/** Phones page, then its hold, then the pin ends. */
const END = PHONES_AT + PAGE_IN_DURATION + PAGE_HOLD;
const PIN_PERCENT = Math.round(END * PIN_PERCENT_PER_UNIT);

export const VAHAAN_TRIGGER_ID = "works-vahaan";

export type VahaanTargets = {
  hero: HTMLElement;
  /** Phones page root. Slides in from the right as the hero leaves left. */
  phonesPage: HTMLElement;
  top: HTMLElement;
  bottom: HTMLElement;
  logo: HTMLElement;
  phoneLeft: HTMLElement;
  phoneCenter: HTMLElement;
  phoneRight: HTMLElement;
  caption: HTMLElement;
};

type VahaanTimelineOptions = {
  /** Scales entry travel. 1 on desktop, shorter on tablet and mobile. */
  distance?: number;
};

const vw = (ratio: number) => () => window.innerWidth * ratio;
const vh = (ratio: number) => () => window.innerHeight * ratio;

/** Start offsets. `sign` is -1 for the top half, 1 for the bottom. */
export function pieceStartX(piece: HTMLElement, sign: -1 | 1, distance: number) {
  return () => sign * piece.offsetHeight * PIECE_DISTANCE * distance * SEAM_NX;
}

export function pieceStartY(piece: HTMLElement, sign: -1 | 1, distance: number) {
  return () => sign * piece.offsetHeight * PIECE_DISTANCE * distance * SEAM_NY;
}

/**
 * One scrubbed timeline for the whole VAHAN.AI pin. No play/reset callbacks,
 * so scrolling up runs the same tweens backwards.
 *
 * Pacing lives in `worksTiming.ts`, shared with Catchback. The halves end touching at (0, 0) and the wordmark
 * drops in and rests under the images, as on Catchback.
 */
export function createVahaanTimeline(
  trigger: HTMLElement,
  targets: VahaanTargets,
  options: VahaanTimelineOptions = {},
) {
  const distance = options.distance ?? 1;
  const { hero, phonesPage, top, bottom, logo, phoneLeft, phoneCenter, phoneRight, caption } =
    targets;
  const later = { immediateRender: false } as const;

  const topFromX = pieceStartX(top, -1, distance);
  const topFromY = pieceStartY(top, -1, distance);
  const bottomFromX = pieceStartX(bottom, 1, distance);
  const bottomFromY = pieceStartY(bottom, 1, distance);
  const phoneX = PHONE_X * distance;
  const phoneY = PHONE_Y * distance;

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      id: VAHAAN_TRIGGER_ID,
      trigger,
      start: "top top",
      end: `+=${PIN_PERCENT}%`,
      pin: true,
      pinSpacing: true,
      scrub: SCRUB,
      invalidateOnRefresh: true,
      // Created after catchback; refresh it after catchback's pin spacer exists.
      refreshPriority: -1,
    },
  });

  tl.addLabel("close", CLOSE_AT);
  tl.addLabel("phonesIn", PHONES_AT);
  tl.addLabel("end", END);

  tl.set(hero, { x: 0, autoAlpha: 1 }, 0);
  tl.set(top, { x: topFromX, y: topFromY, autoAlpha: 0 }, 0);
  tl.set(bottom, { x: bottomFromX, y: bottomFromY, autoAlpha: 0 }, 0);
  tl.set(phoneLeft, { x: vw(-phoneX), y: 0, scale: PHONE_FROM_SCALE, autoAlpha: 0 }, 0);
  tl.set(phoneCenter, { x: 0, y: vh(phoneY), scale: PHONE_FROM_SCALE, autoAlpha: 0 }, 0);
  tl.set(phoneRight, { x: vw(phoneX), y: 0, scale: PHONE_FROM_SCALE, autoAlpha: 0 }, 0);
  tl.set(caption, { autoAlpha: 0 }, 0);

  // Images assemble. Both pieces share one duration and ease so they read as one move.
  tl.fromTo(
    top,
    { x: topFromX, y: topFromY, autoAlpha: 0 },
    { x: 0, y: 0, autoAlpha: 1, duration: CLOSE_DURATION, ease: "none", ...later },
    "close",
  );
  tl.fromTo(
    bottom,
    { x: bottomFromX, y: bottomFromY, autoAlpha: 0 },
    { x: 0, y: 0, autoAlpha: 1, duration: CLOSE_DURATION, ease: "none", ...later },
    "close",
  );

  // Title starts centred and slides down to rest under the images as the halves close.
  dropTitle(tl, logo, top, CLOSE_END);

  // Hero leaves left as the phones page slides in from the right and converges.
  slideOutToLeft(tl, hero, "phonesIn", PAGE_EXIT_DURATION, distance);
  tl.fromTo(
    hero,
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: PAGE_EXIT_DURATION, ...later },
    "phonesIn",
  );
  slideInFromRight(tl, phonesPage, "phonesIn", PAGE_IN_DURATION, distance);
  tl.fromTo(
    phoneLeft,
    { x: vw(-phoneX), scale: PHONE_FROM_SCALE, autoAlpha: 0 },
    { x: 0, scale: 1, autoAlpha: 1, duration: PAGE_IN_DURATION, ease: "power3.out", ...later },
    "phonesIn",
  );
  tl.fromTo(
    phoneCenter,
    { y: vh(phoneY), scale: PHONE_FROM_SCALE, autoAlpha: 0 },
    { y: 0, scale: 1, autoAlpha: 1, duration: PAGE_IN_DURATION, ease: "power3.out", ...later },
    "phonesIn",
  );
  tl.fromTo(
    phoneRight,
    { x: vw(phoneX), scale: PHONE_FROM_SCALE, autoAlpha: 0 },
    { x: 0, scale: 1, autoAlpha: 1, duration: PAGE_IN_DURATION, ease: "power3.out", ...later },
    "phonesIn",
  );
  tl.fromTo(
    caption,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: CAPTION_DURATION, ease: "power3.out", ...later },
    PHONES_AT + CAPTION_DELAY,
  );

  // Hold the finished composition to the end of the pin.
  tl.set({}, {}, END);

  return tl;
}

/** Reduced motion: final state, nothing scrubbed. */
export function settleVahaanTargets(targets: VahaanTargets) {
  const { hero, phonesPage, top, bottom, logo, phoneLeft, phoneCenter, phoneRight, caption } =
    targets;
  gsap.set([hero, phonesPage, phoneLeft, phoneCenter, phoneRight, caption], {
    x: 0,
    y: 0,
    scale: 1,
    autoAlpha: 1,
  });
  // Touching, wordmark gone.
  gsap.set([top, bottom], { x: 0, y: 0, autoAlpha: 1 });
  gsap.set(logo, { autoAlpha: 0 });
}
