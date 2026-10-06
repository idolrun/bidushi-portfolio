"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { scrollToOtherWorks } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

export type WorkNavItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

const defaultItems: readonly WorkNavItem[] = [
  { label: "INFO", href: "/info" },
  { label: "OTHER WORKS", onClick: scrollToOtherWorks },
];

type WorkNavigationProps = {
  items?: readonly WorkNavItem[];
};

const interactiveClass =
  "pointer-events-auto cursor-pointer border-0 bg-transparent p-0 text-left font-[inherit] leading-[inherit] tracking-[inherit] text-inherit transition-opacity duration-200 hover:opacity-70 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

function NavLabel({ label }: { label: string }) {
  return <span className="inline-flex items-center">{label}</span>;
}

export const WorkNavigation = forwardRef<HTMLDivElement, WorkNavigationProps>(
  function WorkNavigation({ items = defaultItems }, ref) {
    return (
      <div
        ref={ref}
        className="works-nav pointer-events-none fixed bottom-0 left-0 z-30 px-[clamp(1.35rem,4.6vw,3.15rem)] pb-[max(clamp(1.35rem,4.2vh,2.4rem),env(safe-area-inset-bottom))] font-sans text-[clamp(0.74rem,0.92vw,0.9rem)] leading-[1.45] font-medium tracking-[0.12em] text-white"
      >
        {items.map((item, index) => {
          const className = cn("m-0 block w-fit", index > 0 && "mt-[0.28rem]", interactiveClass);

          if (item.href) {
            return (
              <Link key={item.label} href={item.href} className={className}>
                <NavLabel label={item.label} />
              </Link>
            );
          }

          if (item.onClick) {
            return (
              <button key={item.label} type="button" onClick={() => item.onClick?.()} className={className}>
                <NavLabel label={item.label} />
              </button>
            );
          }

          return (
            <p key={item.label} className={cn("m-0 block w-fit", index > 0 && "mt-[0.28rem]")}>
              <NavLabel label={item.label} />
            </p>
          );
        })}
      </div>
    );
  },
);
