import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { slideInFromRight, slideOutToLeft } from "@/lib/animations/horizontalPages";
import { pieceStartX, pieceStartY } from "@/lib/animations/vahaanAnimations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Pages move sideways (`horizontalPages.ts`). */
/** Phones rise together. Same travel as the other phone entrances. */
const PHONE_FROM_Y = 0.18;
/** Girl and snack enter from opposite sides. */
const ART_FROM_X = 0.28;

/**
 * Timeline units. Scroll position is the playhead across +=1000%
 * (about ten viewports). Holds are long enough to read each composition.
 *
 * paperight logo 0.00 · close 0.30–1.40 · hold · paperightOut 2.40
 * travelIn 2.60 · hold · travelOut 5.05
 * artIn 5.55 · hold · orangeOut 8.05 · end 9.50
 */
/** Halves close as on VAHAN.AI: wordmark first, then the diagonal pieces. */
const PAPERIGHT_LOGO_IN = 0.3;
const PAPERIGHT_CLOSE_AT = 0.3;
const PAPERIGHT_CLOSE = 1.1;
const PAPERIGHT_LOGO_FROM_Y = -0.04;
const PAPERIGHT_LOGO_FROM_SCALE = 0.96;
const PAPERIGHT_CAPTION_IN = 0.4;
const PAPERIGHT_HOLD = 1.0;
const PAPERIGHT_OUT = 0.5;
const TRAVEL_IN = 0.6;
const TRAVEL_HOLD = 1.85;
const TRAVEL_OUT = 0.5;
const ART_IN = 0.65;
const ART_HOLD = 1.85;
/** Longer than ART_IN; settles in while the art holds (ART_IN + ART_HOLD = 2.5). */
const ORANGE_IN = 1.8;
const ORANGE_OUT = 0.9;
const TAIL = 0.55;
/**
 * Travel starts sliding in this long before Paperight is gone, so there is no
 * empty beat. Art does not overlap Travel: its polaroids converge from the
 * sides and would cross the leaving phones.
 */
const PAGE_OVERLAP = 0.3;

const PAPERIGHT_MERGED_AT = PAPERIGHT_CLOSE_AT + PAPERIGHT_CLOSE;
const PAPERIGHT_OUT_AT = PAPERIGHT_MERGED_AT + PAPERIGHT_HOLD;
const TRAVEL_IN_AT = PAPERIGHT_OUT_AT + PAPERIGHT_OUT - PAGE_OVERLAP;
const TRAVEL_OUT_AT = TRAVEL_IN_AT + TRAVEL_IN + TRAVEL_HOLD;
const ART_IN_AT = TRAVEL_OUT_AT + TRAVEL_OUT;
const ORANGE_OUT_AT = ART_IN_AT + ART_IN + ART_HOLD;
const END = ORANGE_OUT_AT + ORANGE_OUT + TAIL;

/** Pin length in % of the viewport. About ten screens. */
const PIN_PERCENT = 1000;

export const OTHER_WORKS_TRIGGER_ID = "works-other";

export type OtherWorksTargets = {
  paperightTop: HTMLElement;
  paperightBottom: HTMLElement;
  paperightLogo: HTMLElement;
  paperightCaption: HTMLElement;
  /** Page roots, so a whole page can slide sideways over its own animation. */
  paperightPage: HTMLElement;
  travelPage: HTMLElement;
  artPage: HTMLElement;
  travelPhones: HTMLElement;
  travelCard: HTMLElement;
  travelCaption: HTMLElement;
  girl: HTMLElement;
  snack: HTMLElement;
  orange: HTMLElement;
};

export type OtherWorksTimelineOptions = {
  /** Scales entry travel. 1 on desktop, shorter on tablet and mobile. */
  distance?: number;
};

const vw = (ratio: number) => () => window.innerWidth * ratio;
const vh = (ratio: number) => () => window.innerHeight * ratio;

/**
 * One scrubbed timeline. No play() and no onEnter callbacks, so scrolling
 * up runs the same tweens backwards.
 */
export function createOtherWorksTimeline(
  trigger: HTMLElement,
  targets: OtherWorksTargets,
  options: OtherWorksTimelineOptions = {},
) {
  const distance = options.distance ?? 1;
  const {
    paperightTop,
    paperightBottom,
    paperightLogo,
    paperightCaption,
    paperightPage,
    travelPage,
    artPage,
    travelPhones,
    travelCard,
    travelCaption,
    girl,
    snack,
    orange,
  } = targets;
  const later = { immediateRender: false } as const;

  const topFromX = pieceStartX(paperightTop, -1, distance);
  const topFromY = pieceStartY(paperightTop, -1, distance);
  const bottomFromX = pieceStartX(paperightBottom, 1, distance);
  const bottomFromY = pieceStartY(paperightBottom, 1, distance);
  const logoFromY = vh(PAPERIGHT_LOGO_FROM_Y * distance);
  const phoneFromY = vh(PHONE_FROM_Y * distance);
  const girlFromX = vw(-ART_FROM_X * distance);
  const snackFromX = vw(ART_FROM_X * distance);

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      id: OTHER_WORKS_TRIGGER_ID,
      trigger,
      start: "top top",
      end: `+=${PIN_PERCENT}%`,
      pin: true,
      pinSpacing: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
      // After catchback (0) and vahan (-1), so their pin spacers exist first.
      refreshPriority: -2,
    },
  });

  tl.addLabel("paperightClose", PAPERIGHT_CLOSE_AT);
  tl.addLabel("paperightOut", PAPERIGHT_OUT_AT);
  tl.addLabel("travelIn", TRAVEL_IN_AT);
  tl.addLabel("travelOut", TRAVEL_OUT_AT);
  tl.addLabel("artIn", ART_IN_AT);
  tl.addLabel("orangeOut", ORANGE_OUT_AT);
  tl.addLabel("end", END);

  tl.set(paperightTop, { x: topFromX, y: topFromY, autoAlpha: 0 }, 0);
  tl.set(paperightBottom, { x: bottomFromX, y: bottomFromY, autoAlpha: 0 }, 0);
  tl.set(
    paperightLogo,
    { y: logoFromY, scale: PAPERIGHT_LOGO_FROM_SCALE, autoAlpha: 0, transformOrigin: "50% 50%" },
    0,
  );
  tl.set(paperightCaption, { autoAlpha: 0 }, 0);
  tl.set(travelPhones, { y: phoneFromY, autoAlpha: 0 }, 0);
  tl.set([travelCard, travelCaption], { autoAlpha: 0 }, 0);
  tl.set(girl, { x: girlFromX, autoAlpha: 0 }, 0);
  tl.set(snack, { x: snackFromX, autoAlpha: 0 }, 0);
  tl.set(orange, { autoAlpha: 0 }, 0);

  // Halves close together; the wordmark shrinks away as they touch.
  tl.fromTo(
    paperightTop,
    { x: topFromX, y: topFromY, autoAlpha: 0 },
    { x: 0, y: 0, autoAlpha: 1, duration: PAPERIGHT_CLOSE, ease: "none", ...later },
    "paperightClose",
  );
  tl.fromTo(
    paperightBottom,
    { x: bottomFromX, y: bottomFromY, autoAlpha: 0 },
    { x: 0, y: 0, autoAlpha: 1, duration: PAPERIGHT_CLOSE, ease: "none", ...later },
    "paperightClose",
  );
  tl.fromTo(
    paperightLogo,
    { autoAlpha: 0, y: logoFromY, scale: PAPERIGHT_LOGO_FROM_SCALE },
    { autoAlpha: 1, y: 0, scale: 1, duration: PAPERIGHT_LOGO_IN, ...later },
    0,
  );
  tl.fromTo(
    paperightLogo,
    { scale: 1 },
    { scale: 0, duration: PAPERIGHT_CLOSE * 0.9, ease: "none", ...later },
    "paperightClose",
  );
  tl.fromTo(
    paperightLogo,
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: PAPERIGHT_CLOSE * 0.09, ease: "none", ...later },
    PAPERIGHT_MERGED_AT - PAPERIGHT_CLOSE * 0.19,
  );
  tl.fromTo(
    paperightCaption,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: PAPERIGHT_CAPTION_IN, ease: "power3.out", ...later },
    PAPERIGHT_MERGED_AT - 0.1,
  );
  slideOutToLeft(tl, paperightPage, "paperightOut", PAPERIGHT_OUT, distance);
  tl.fromTo(
    paperightPage,
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: PAPERIGHT_OUT, ...later },
    "paperightOut",
  );

  tl.fromTo(
    travelPhones,
    { y: phoneFromY, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: TRAVEL_IN, ease: "power3.out", ...later },
    "travelIn",
  );
  tl.fromTo(
    [travelCard, travelCaption],
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: TRAVEL_IN, ease: "power3.out", ...later },
    "travelIn",
  );
  slideInFromRight(tl, travelPage, "travelIn", TRAVEL_IN, distance, { ease: "power3.out" });
  slideOutToLeft(tl, travelPage, "travelOut", TRAVEL_OUT, distance);
  tl.fromTo(
    travelPage,
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: TRAVEL_OUT, ...later },
    "travelOut",
  );

  // Orange fades in softly with the polaroids and stays to the end of the pin.
  tl.fromTo(
    orange,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: ORANGE_IN, ease: "power1.inOut", ...later },
    "artIn",
  );
  slideInFromRight(tl, artPage, "artIn", ART_IN, distance, { ease: "power3.out" });
  tl.fromTo(
    girl,
    { x: girlFromX, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, duration: ART_IN, ease: "power3.out", ...later },
    "artIn",
  );
  tl.fromTo(
    snack,
    { x: snackFromX, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, duration: ART_IN, ease: "power3.out", ...later },
    "artIn",
  );

  tl.set({}, {}, END);

  return tl;
}

/** Reduced motion: every composition visible. */
export function settleOtherWorksTargets(targets: OtherWorksTargets) {
  const {
    paperightTop,
    paperightBottom,
    paperightLogo,
    paperightCaption,
    paperightPage,
    travelPage,
    artPage,
    travelPhones,
    travelCard,
    travelCaption,
    girl,
    snack,
    orange,
  } = targets;
  gsap.set([paperightCaption, paperightPage, travelPage, artPage, travelPhones, travelCard, travelCaption, girl, snack, orange], {
    x: 0,
    y: 0,
    scale: 1,
    autoAlpha: 1,
  });
  // Touching, wordmark gone.
  gsap.set([paperightTop, paperightBottom], { x: 0, y: 0, autoAlpha: 1 });
  gsap.set(paperightLogo, { autoAlpha: 0 });
}
