/**
 * Pacing shared by every selected-work pin (Catchback, VAHAN.AI).
 * Units are timeline units; scroll position is the playhead.
 *
 * title drops 0.00–0.60 · close 0.10–0.60 · hold 0.60–0.63
 * page in 0.63–0.81 · caption 0.89–0.99 · hold 0.98–1.12 · next page 1.12
 * Each further page repeats `PAGE_IN_DURATION + PAGE_HOLD`.
 */

/** Pin length in % of viewport per timeline unit. */
export const PIN_PERCENT_PER_UNIT = 690;
export const SCRUB = 0.8;

export const CLOSE_AT = 0.1;
export const CLOSE_DURATION = 0.5;
export const CLOSE_END = CLOSE_AT + CLOSE_DURATION;
/** Merged composition holds this long before the next page starts. */
const MERGED_HOLD = 0.03;
export const PAGE_IN_DURATION = 0.18;
/** Completed page holds this long before it leaves. */
export const PAGE_HOLD = 0.06;
/** Outgoing page leaves over this long, as the next one enters. */
export const PAGE_EXIT_DURATION = 0.14;
export const CAPTION_DELAY = 0.09;
export const CAPTION_DURATION = 0.1;

export const FIRST_PAGE_AT = CLOSE_END + MERGED_HOLD;
