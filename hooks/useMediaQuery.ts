"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Coarse layout subscription. Do not use the result to drive GSAP progress.
 * Server snapshot is false so the first client render matches SSR.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", onStoreChange);
    return () => media.removeEventListener("change", onStoreChange);
  }, [query]);

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
