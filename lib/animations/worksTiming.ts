/**
 * Pacing shared by every selected-work pin (Catchback, VAHAN.AI).
 * Units are timeline units; scroll position is the playhead.
 *
 * logo in 0.00–0.10 · close 0.10–0.60 · word gone 0.55 · hold 0.60–0.80
 * page in 0.80–0.98 · caption 0.89–0.99 · hold 0.98–1.12 · next page 1.12
 * Each further page repeats `PAGE_IN_DURATION + PAGE_HOLD`.
 */

/** Pin length in % of viewport per timeline unit. */
export const PIN_PERCENT_PER_UNIT = 690;
export const SCRUB = 0.8;

/** Wordmark emerges first, inside the hold, before the halves move. */
export const LOGO_INTRO_DURATION = 0.1;
export const LOGO_FROM_Y = -0.04;
export const LOGO_FROM_SCALE = 0.96;

export const CLOSE_AT = 0.1;
export const CLOSE_DURATION = 0.5;
export const CLOSE_END = CLOSE_AT + CLOSE_DURATION;
/** Gone when about 10% of the original separation is left. */
export const WORD_SCALE_DURATION = CLOSE_DURATION * 0.9;
export const WORD_FADE_DURATION = WORD_SCALE_DURATION * 0.1;
export const WORD_FADE_AT = CLOSE_AT + WORD_SCALE_DURATION - WORD_FADE_DURATION;

/** Merged composition holds this long before the next page starts. */
export const MERGED_HOLD = 0.03;
export const PAGE_IN_DURATION = 0.18;
/** Completed page holds this long before it leaves. */
export const PAGE_HOLD = 0.06;
/** Outgoing page leaves over this long, as the next one enters. */
export const PAGE_EXIT_DURATION = 0.14;
export const PAGE_EXIT_Y = -0.2;
export const CAPTION_DELAY = 0.09;
export const CAPTION_DURATION = 0.1;

export const FIRST_PAGE_AT = CLOSE_END + MERGED_HOLD;
export const NEXT_PAGE_AT = FIRST_PAGE_AT + PAGE_IN_DURATION + PAGE_HOLD;
