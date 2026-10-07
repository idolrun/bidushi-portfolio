import gsap from "gsap";

/**
 * Pages inside one project group move sideways; groups themselves stay
 * vertical (native scroll between pin spacers). The outgoing page leaves to
 * the left, the incoming page enters from the right. Scroll is the playhead,
 * so scrolling up runs the same tweens backwards.
 *
 * Travel is a fraction of the viewport width, scaled by the timeline's
 * `distance` (1 on desktop, shorter on compact layouts).
 */
const PAGE_SLIDE_X = 0.45;

const slideX = (distance: number, sign: -1 | 1) => () =>
  sign * window.innerWidth * PAGE_SLIDE_X * distance;

/** Page rests off to the right until `at`, then slides to 0. */
export function slideInFromRight(
  tl: gsap.core.Timeline,
  page: HTMLElement,
  at: gsap.Position,
  duration: number,
  distance: number,
  vars: gsap.TweenVars = {},
) {
  const from = slideX(distance, 1);
  tl.set(page, { x: from }, 0);
  tl.fromTo(
    page,
    { x: from },
    { x: 0, duration, immediateRender: false, ...vars },
    at,
  );
}

/** Page rests at 0 until `at`, then slides off to the left. */
export function slideOutToLeft(
  tl: gsap.core.Timeline,
  page: HTMLElement,
  at: gsap.Position,
  duration: number,
  distance: number,
  vars: gsap.TweenVars = {},
) {
  tl.fromTo(
    page,
    { x: 0 },
    { x: slideX(distance, -1), duration, immediateRender: false, ...vars },
    at,
  );
}
