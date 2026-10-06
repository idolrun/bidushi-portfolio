"use client";

import { RailToc, type RailTocItem } from "@/components/ui/rail-toc";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Desktop only. Below lg the rail has no room and would only crowd the copy. */
export function CaseStudyRailToc({ items }: { items: RailTocItem[] }) {
  const desktop = useMediaQuery("(min-width: 1024px)");
  if (!desktop) return null;
  return <RailToc items={items} title="Case study" className="text-[0.75rem]" />;
}
