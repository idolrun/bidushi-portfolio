import type { ReactNode } from "react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import { CaseStudyHomeLink } from "@/components/case-study/CaseStudyHomeLink";
import { CaseStudyHeroPhones } from "@/components/case-study/CaseStudyHeroPhones";
import type { CaseStudyPhone } from "@/lib/case-study/shared";

export const DISPLAY_FONT = "[font-family:var(--font-ghosthey)] [font-synthesis:none]";

type Props = {
  /** Big wordmark. Visual only; `ariaLabel` names the heading for screen readers. */
  wordmark: ReactNode;
  ariaLabel: string;
  title: string;
  subtitle: string;
  phones: readonly CaseStudyPhone[];
  /** The other case study, top right. */
  sibling: { href: string; label: ReactNode; ariaLabel: string };
};

export function CaseStudyHero({ wordmark, ariaLabel, title, subtitle, phones, sibling }: Props) {
  return (
    <header className="relative overflow-hidden bg-[#121212] text-[#F5F5F5]">
      <div className="mx-auto flex max-w-[1360px] flex-col items-center px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(1.5rem,3.2vw,3rem)]">
        <div className="flex w-full items-start justify-between text-[0.8125rem] leading-none">
          <CaseStudyHomeLink />
          <Magnetic radius={10}>
            <Link
              href={sibling.href}
              aria-label={sibling.ariaLabel}
              className="m-0 font-bold tracking-[0.08em] transition-opacity duration-200 hover:opacity-70 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--works-green,#3CFF55)]"
            >
              {sibling.label}
            </Link>
          </Magnetic>
        </div>

        <h1
          aria-label={ariaLabel}
          className="m-0 mt-[clamp(0.5rem,1.5vw,1.5rem)] flex flex-col items-center"
        >
          <span
            aria-hidden="true"
            className="block text-[clamp(3.5rem,10vw,9rem)] leading-[1] font-bold tracking-[-0.02em]"
          >
            {wordmark}
          </span>
          <span className="mt-[clamp(0.75rem,2vw,2rem)] block w-full border-t border-white/15 pt-[clamp(1rem,2vw,2rem)] text-center text-[clamp(1.25rem,2.6vw,2.25rem)] leading-tight font-light tracking-[0.01em]">
            {title}
          </span>
        </h1>
        <p className="m-0 mt-[clamp(0.5rem,1vw,1rem)] max-w-[40rem] text-center text-[clamp(0.8rem,1.1vw,1rem)] leading-snug text-white/80">
          {subtitle}
        </p>

        <div className="mt-[clamp(2rem,4vw,3.5rem)] w-full">
          <CaseStudyHeroPhones phones={phones} />
        </div>
      </div>
      <div aria-hidden="true" className="h-[clamp(1.5rem,4vw,3.5rem)]" />
    </header>
  );
}
