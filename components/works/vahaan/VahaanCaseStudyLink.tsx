import Link from "next/link";
import { VAHAAN_PROJECT } from "@/lib/works/projects";

export function VahaanCaseStudyLink() {
  return (
    <Link
      href={VAHAAN_PROJECT.caseStudyHref}
      className="pointer-events-auto inline-block text-[var(--works-green,#3CFF55)] underline underline-offset-[0.2em] transition-opacity duration-200 hover:opacity-70 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--works-green,#3CFF55)]"
    >
      {VAHAAN_PROJECT.caseStudyLabel}
    </Link>
  );
}
