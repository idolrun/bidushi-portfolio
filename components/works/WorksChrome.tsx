"use client";

import { useEffect, useState } from "react";
import { WorkNavigation, type WorkNavItem } from "@/components/works/WorkNavigation";
import { WorksHeader, type WorksView } from "@/components/works/WorksHeader";
import { scrollToCatchback } from "@/lib/smooth-scroll";

const SECTIONS: readonly [string, WorksView][] = [
  ["works", "catchback"],
  ["vahan", "vahan"],
  ["other-works", "other"],
];

const otherWorksNav: readonly WorkNavItem[] = [
  { label: "INFO", href: "/info" },
  { label: "SELECTED WORKS", onClick: scrollToCatchback },
];

/** Header + nav, fixed once. Only the middle label, ring and 2nd nav item follow the section. */
export function WorksChrome() {
  const [active, setActive] = useState<WorksView>("catchback");

  useEffect(() => {
    const update = () => {
      let next: WorksView = "catchback";
      for (const [id, view] of SECTIONS) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= window.innerHeight / 2) next = view;
      }
      setActive(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <WorksHeader current={active} />
      <WorkNavigation items={active === "other" ? otherWorksNav : undefined} />
    </>
  );
}
