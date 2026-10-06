"use client";

import { type RefObject } from "react";
import { usePinnedScene } from "@/hooks/useWorksAnimation";
import {
  createOtherWorksTimeline,
  settleOtherWorksTargets,
  type OtherWorksTargets,
} from "@/lib/animations/otherWorksAnimations";

export type OtherWorksAnimationRefs = {
  [K in keyof OtherWorksTargets]: RefObject<HTMLDivElement | null>;
};

export function useOtherWorksAnimation(
  scopeRef: RefObject<HTMLElement | null>,
  refs: OtherWorksAnimationRefs,
) {
  usePinnedScene(scopeRef, refs, createOtherWorksTimeline, settleOtherWorksTargets);
}
