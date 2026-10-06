import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";

type Props = {
  href: string;
  label: string;
  direction: "next" | "prev";
};

/** End-of-page jump to the sibling case study. Plain `<Link>`; hover is CSS only. */
export function CaseStudyNextLink({ href, label, direction }: Props) {
  const arrow = (
    <span
      aria-hidden="true"
      className={`inline-block transition-transform duration-300 ${
        direction === "next"
          ? "group-hover:translate-x-1"
          : "group-hover:-translate-x-1"
      }`}
    >
      {direction === "next" ? "→" : "←"}
    </span>
  );

  return (
    <div data-reveal className="flex justify-center pt-[clamp(3rem,6vw,5rem)]">
      <Magnetic>
        <Link
          href={href}
          className="group inline-flex items-center gap-3 rounded-full bg-[#0E0E10] px-7 py-4 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-[var(--works-green,#3CFF55)] hover:text-[#0E0E10] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0E0E10]"
        >
          {direction === "prev" && arrow}
          {label}
          {direction === "next" && arrow}
        </Link>
      </Magnetic>
    </div>
  );
}
