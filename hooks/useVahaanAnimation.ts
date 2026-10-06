"use client";

import { type RefObject } from "react";
import { usePinnedScene } from "@/hooks/useWorksAnimation";
import {
  createVahaanTimeline,
  settleVahaanTargets,
  type VahaanTargets,
} from "@/lib/animations/vahaanAnimations";

export type VahaanAnimationRefs = { [K in keyof VahaanTargets]: RefObject<HTMLDivElement | null> };

export function useVahaanAnimation(
  scopeRef: RefObject<HTMLElement | null>,
  refs: VahaanAnimationRefs,
) {
  usePinnedScene(scopeRef, refs, createVahaanTimeline, settleVahaanTargets);
}
