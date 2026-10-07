import type { ReactNode } from "react";

/** Ghosthey initial + bold grotesk, same pairing as the PAPERIGHT.AI lockup. */
export function CaseStudyRequestTitle({
  id,
  initial,
  children,
}: {
  id: string;
  initial: string;
  children: ReactNode;
}) {
  return (
    <h2 id={id} className="crm-title font-sans">
      <span className="mr-[0.04em] italic [font-family:var(--font-ghosthey)] [font-synthesis:none] [text-rendering:geometricPrecision]">
        {initial}
      </span>
      {children}
    </h2>
  );
}
