"use client";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { type RefObject } from "react";
import {
  createWorksTimeline,
  settleWorksTargets,
  type WorksTargets,
} from "@/lib/animations/worksAnimations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type SceneRefs<T> = { [K in keyof T]: RefObject<HTMLDivElement | null> };

/**
 * One pinned, scrubbed scene: settled under reduced motion, full travel on
 * desktop, 0.62 travel below 1024px. Refreshes once the loader and fonts settle.
 */
export function usePinnedScene<T extends Record<string, HTMLElement>>(
  scopeRef: RefObject<HTMLElement | null>,
  refs: SceneRefs<T>,
  create: (scope: HTMLElement, scene: T, options: { distance?: number }) => void,
  settle: (scene: T) => void,
) {
  useGSAP(
    () => {
      const scope = scopeRef.current;
      if (!scope) return;

      const targets: Record<string, HTMLElement> = {};
      for (const key of Object.keys(refs) as (keyof T & string)[]) {
        const el = refs[key].current;
        if (!el) return;
        targets[key] = el;
      }
      const scene = targets as T;

      let alive = true;
      const mm = gsap.matchMedia(scope);

      mm.add("(prefers-reduced-motion: reduce)", () => settle(scene));
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        create(scope, scene, {});
      });
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        create(scope, scene, { distance: 0.62 });
      });

      const refresh = () => {
        if (alive) ScrollTrigger.refresh();
      };

      if (document.documentElement.dataset.loaderSettled === "true") refresh();
      window.addEventListener("portfolio-loader:settled", refresh);
      document.fonts.ready.then(refresh).catch(() => undefined);

      return () => {
        alive = false;
        window.removeEventListener("portfolio-loader:settled", refresh);
        mm.revert();
      };
    },
    { scope: scopeRef },
  );
}

export type WorksAnimationRefs = SceneRefs<Omit<WorksTargets, "loader">>;

export function useWorksAnimation(
  scopeRef: RefObject<HTMLElement | null>,
  refs: WorksAnimationRefs,
) {
  usePinnedScene(
    scopeRef,
    refs,
    (scope, scene, options) =>
      createWorksTimeline(
        scope,
        { ...scene, loader: document.getElementById("portfolio-loader") },
        options,
      ),
    settleWorksTargets,
  );
}
