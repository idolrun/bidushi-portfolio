import gsap from "gsap";

/** Gap between the image frame (or `below`) and the resting title, as a share of frame height. */
const TITLE_GAP = 0.1;
const TITLE_DROP_EASE = "power1.out";

/** Resting offset of a title: below its image frame (and `below`, a caption stacked under it). */
export function titleRestY(title: HTMLElement, frame: HTMLElement, below?: HTMLElement) {
  return (
    frame.offsetHeight * (0.5 + TITLE_GAP) +
    title.offsetHeight / 2 +
    (below ? below.offsetHeight + frame.offsetHeight * TITLE_GAP : 0)
  );
}

/**
 * A project title starts centred on its image frame and slides straight down
 * to a slot under it, then stays. `below` is anything stacked directly under
 * the frame (a caption) that the title must clear.
 * Pure translateY on the scrubbed timeline, so scrolling up runs it backwards.
 */
export function dropTitle(
  tl: gsap.core.Timeline,
  title: HTMLElement,
  frame: HTMLElement,
  duration: number,
  below?: HTMLElement,
) {
  const rest = () => titleRestY(title, frame, below);

  tl.set(title, { y: 0, autoAlpha: 1 }, 0);
  tl.fromTo(
    title,
    { y: 0 },
    { y: rest, duration, ease: TITLE_DROP_EASE, immediateRender: false },
    0,
  );
}
