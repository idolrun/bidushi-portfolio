import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CAPTION_DELAY,
  CAPTION_DURATION,
  CLOSE_AT,
  CLOSE_DURATION,
  FIRST_PAGE_AT,
  LOGO_FROM_SCALE,
  LOGO_FROM_Y,
  LOGO_INTRO_DURATION,
  PAGE_EXIT_DURATION,
  PAGE_HOLD,
  PAGE_IN_DURATION,
  PIN_PERCENT_PER_UNIT,
  SCRUB,
  WORD_FADE_AT,
  WORD_FADE_DURATION,
  WORD_SCALE_DURATION,
} from "@/lib/animations/worksTiming";
import { slideInFromRight, slideOutToLeft } from "@/lib/animations/horizontalPages";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Each half leaves the merged frame along the screen normal of the diagonal.
 * The cut is x = 1298.5 − 1.7777y on the 1300×750 asset, so the normal that
 * points from the top half toward the bottom half is (0.4904, 0.8717).
 * Offsets are fractions of the frame, not the viewport: a vw/vh travel slides
 * the halves along the cut once the frame hits its max width, and the two
 * diagonals stop lining up.
 * `PIECE_DISTANCE` is that travel as a fraction of frame height.
 */
const SEAM_NX = 0.4904;
const SEAM_NY = 0.8717;
const PIECE_DISTANCE = 0.48;
const FRAME_ASPECT = 750 / 1300;
const PIECE_X_RATIO = PIECE_DISTANCE * FRAME_ASPECT * SEAM_NX;
const PIECE_Y_RATIO = PIECE_DISTANCE * SEAM_NY;
const PHONE_X = 0.28;
const PHONE_Y = 0.18;
const PHONE_FROM_SCALE = 0.92;

/**
 * Pacing is shared with VAHAN.AI (`worksTiming.ts`). The loader exits over the
 * first 0.05, inside the wordmark intro.
 */
const LOADER_EXIT_DURATION = 0.09;

/**
 * YKSH leaves on an arc around its bottom-right corner. Rotation does the
 * swing; the drift (viewport ratios, eased in later) carries the sheet clear of
 * the pivot, which pure rotation only does near 90°.
 */
const LOADER_ROTATION = 32;
const LOADER_DRIFT_X = 0.95;
const LOADER_DRIFT_Y = -0.3;
const LOADER_END_SCALE = 0.96;

/**
 * Outgoing pages finish fading in the first half of the exit; the incoming page
 * only starts fading in after that, so the two never show through each other.
 */
const FADE_OUT_DURATION = PAGE_EXIT_DURATION * 0.5;
const FADE_IN_DURATION = PAGE_IN_DURATION - FADE_OUT_DURATION;

/** After the intro, before the close. Where "Catchback" in the menu lands. */
export const WORKS_LOCKUP_VISIBLE = LOGO_INTRO_DURATION;
/** Lockup page runs until the phones enter. */
export const WORKS_PHONES_PAGE = FIRST_PAGE_AT;
/** Phones page, then its hold, then the pin ends. */
export const WORKS_TIMELINE_DURATION = WORKS_PHONES_PAGE + PAGE_IN_DURATION + PAGE_HOLD;
const WORKS_PIN_PERCENT = Math.round(WORKS_TIMELINE_DURATION * PIN_PERCENT_PER_UNIT);

export type WorksTargets = {
  loader: HTMLElement | null;
  top: HTMLElement;
  bottom: HTMLElement;
  frame: HTMLElement;
  logo: HTMLElement;
  lockup: HTMLElement;
  /** Phones page root. Slides in from the right as the lockup page leaves left. */
  phonesPage: HTMLElement;
  phoneLeft: HTMLElement;
  phoneCenter: HTMLElement;
  phoneRight: HTMLElement;
  phonesCaption: HTMLElement;
};

export type WorksTimelineOptions = {
  /** Scales entry travel. 1 on desktop, shorter on tablet and mobile. */
  distance?: number;
};

function widthRatio(ratio: number) {
  return () => window.innerWidth * ratio;
}

function heightRatio(ratio: number) {
  return () => window.innerHeight * ratio;
}

function frameX(frame: HTMLElement, ratio: number) {
  return () => frame.offsetWidth * ratio;
}

function frameY(frame: HTMLElement, ratio: number) {
  return () => frame.offsetHeight * ratio;
}

/**
 * One scrubbed timeline. Scroll position is the playhead.
 * Child eases weight each beat; the scrub itself stays linear.
 *
 * Same choreography as VAHAN.AI: the wordmark emerges (0–0.10), the halves
 * close with ease none while it shrinks to 0 (0.10–0.60), the merged lockup
 * holds, then the lockup page slides out left while fading as the phones page
 * slides in from the right (`horizontalPages.ts`). Phones at `FIRST_PAGE_AT`,
 * then the hold to the end of the pin. The loader swings off its bottom-right
 * corner over the first 0.09. Scroll up reverses the same tweens.
 */
export function createWorksTimeline(
  trigger: HTMLElement,
  targets: WorksTargets,
  options: WorksTimelineOptions = {},
) {
  const distance = options.distance ?? 1;
  const pieceX = PIECE_X_RATIO * distance;
  const pieceY = PIECE_Y_RATIO * distance;
  const phoneX = PHONE_X * distance;
  const phoneY = PHONE_Y * distance;

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      id: "works-catchback",
      trigger,
      start: "top top",
      end: `+=${WORKS_PIN_PERCENT}%`,
      pin: true,
      // Body is a flex column. ScrollTrigger skips pin spacing for flex
      // parents unless this is set, which collapses the whole sequence
      // into a single viewport.
      pinSpacing: true,
      scrub: SCRUB,
      invalidateOnRefresh: true,
    },
  });

  tl.addLabel("loaderExit", 0);
  tl.addLabel("close", CLOSE_AT);
  tl.addLabel("phonesIn", WORKS_PHONES_PAGE);
  tl.addLabel("end", WORKS_TIMELINE_DURATION);

  const later = { immediateRender: false } as const;
  const overlay = targets.frame.querySelector<HTMLElement>(".works-overlay");

  if (targets.loader) {
    tl.set(targets.loader, { transformOrigin: "100% 100%" }, 0);
    tl.fromTo(
      targets.loader,
      { rotation: 0, scale: 1 },
      {
        rotation: LOADER_ROTATION * distance,
        scale: LOADER_END_SCALE,
        duration: LOADER_EXIT_DURATION,
        ease: "power2.inOut",
      },
      "loaderExit",
    );
    tl.fromTo(
      targets.loader,
      { x: 0, y: 0 },
      {
        // Not scaled by `distance`: clearing the pivot needs about one frame width at any angle.
        x: widthRatio(LOADER_DRIFT_X),
        y: heightRatio(LOADER_DRIFT_Y * distance),
        duration: LOADER_EXIT_DURATION,
        ease: "power2.in",
        ...later,
      },
      "loaderExit",
    );
  }

  tl.set(
    targets.top,
    { x: frameX(targets.frame, -pieceX), y: frameY(targets.frame, -pieceY), autoAlpha: 0 },
    0,
  );
  tl.set(
    targets.bottom,
    { x: frameX(targets.frame, pieceX), y: frameY(targets.frame, pieceY), autoAlpha: 0 },
    0,
  );
  tl.set(
    targets.logo,
    { y: heightRatio(LOGO_FROM_Y * distance), scale: LOGO_FROM_SCALE, autoAlpha: 0, transformOrigin: "50% 50%" },
    0,
  );
  if (overlay) tl.set(overlay, { autoAlpha: 0 }, 0);
  tl.set(targets.frame, { y: 0, scale: 1, transformOrigin: "50% 50%" }, 0);
  tl.set(targets.lockup, { x: 0, autoAlpha: 1 }, 0);
  tl.set(targets.phoneLeft, { x: widthRatio(-phoneX), y: 0, scale: PHONE_FROM_SCALE, autoAlpha: 0 }, 0);
  tl.set(targets.phoneCenter, { x: 0, y: heightRatio(phoneY), scale: PHONE_FROM_SCALE, autoAlpha: 0 }, 0);
  tl.set(targets.phoneRight, { x: widthRatio(phoneX), y: 0, scale: PHONE_FROM_SCALE, autoAlpha: 0 }, 0);
  tl.set(targets.phonesCaption, { autoAlpha: 0 }, 0);

  // Wordmark emerges from the background, then shrinks away as the halves touch.
  tl.fromTo(
    targets.logo,
    { autoAlpha: 0, y: heightRatio(LOGO_FROM_Y * distance), scale: LOGO_FROM_SCALE },
    { autoAlpha: 1, y: 0, scale: 1, duration: LOGO_INTRO_DURATION, ...later },
    0,
  );

  tl.fromTo(
    targets.top,
    { x: frameX(targets.frame, -pieceX), y: frameY(targets.frame, -pieceY), autoAlpha: 0 },
    { x: 0, y: 0, autoAlpha: 1, duration: CLOSE_DURATION, ease: "none", ...later },
    "close",
  );
  tl.fromTo(
    targets.bottom,
    { x: frameX(targets.frame, pieceX), y: frameY(targets.frame, pieceY), autoAlpha: 0 },
    { x: 0, y: 0, autoAlpha: 1, duration: CLOSE_DURATION, ease: "none", ...later },
    "close",
  );
  tl.fromTo(
    targets.logo,
    { scale: 1 },
    { scale: 0, duration: WORD_SCALE_DURATION, ease: "none", ...later },
    "close",
  );
  tl.fromTo(
    targets.logo,
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: WORD_FADE_DURATION, ease: "none", ...later },
    WORD_FADE_AT,
  );

  slideOutToLeft(tl, targets.lockup, "phonesIn", PAGE_EXIT_DURATION, distance);
  slideInFromRight(tl, targets.phonesPage, "phonesIn", PAGE_IN_DURATION, distance);
  tl.fromTo(
    targets.lockup,
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: FADE_OUT_DURATION, ease: "none", ...later },
    "phonesIn",
  );

  tl.fromTo(
    targets.phoneLeft,
    { x: widthRatio(-phoneX), scale: PHONE_FROM_SCALE },
    { x: 0, scale: 1, duration: PAGE_IN_DURATION, ease: "power3.out", ...later },
    "phonesIn",
  );
  tl.fromTo(
    targets.phoneCenter,
    { y: heightRatio(phoneY), scale: PHONE_FROM_SCALE },
    { y: 0, scale: 1, duration: PAGE_IN_DURATION, ease: "power3.out", ...later },
    "phonesIn",
  );
  tl.fromTo(
    targets.phoneRight,
    { x: widthRatio(phoneX), scale: PHONE_FROM_SCALE },
    { x: 0, scale: 1, duration: PAGE_IN_DURATION, ease: "power3.out", ...later },
    "phonesIn",
  );
  tl.fromTo(
    [targets.phoneLeft, targets.phoneCenter, targets.phoneRight],
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: FADE_IN_DURATION, ease: "none", ...later },
    `phonesIn+=${FADE_OUT_DURATION}`,
  );
  tl.fromTo(
    targets.phonesCaption,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: CAPTION_DURATION, ease: "power3.out", ...later },
    `phonesIn+=${CAPTION_DELAY}`,
  );

  // Hold the finished composition to the end of the pin.
  tl.set({}, {}, "end");

  return tl;
}

export function settleWorksTargets(targets: Omit<WorksTargets, "loader">) {
  gsap.set(
    [
      targets.top,
      targets.bottom,
      targets.frame,
      targets.logo,
      targets.lockup,
      targets.phonesPage,
      targets.phoneLeft,
      targets.phoneCenter,
      targets.phoneRight,
      targets.phonesCaption,
    ],
    { x: 0, y: 0, scale: 1, autoAlpha: 1 },
  );
}
