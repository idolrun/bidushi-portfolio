"use client";

import { forwardRef, useCallback, useState } from "react";
import { CaseStudyRequestModal } from "@/components/case-study/request/CaseStudyRequestModal";
import { cn } from "@/lib/utils";

type CatchbackInfoProps = {
  className?: string;
};

export const CatchbackInfo = forwardRef<HTMLDivElement, CatchbackInfoProps>(
  function CatchbackInfo({ className }, ref) {
    const [requestOpen, setRequestOpen] = useState(false);
    const closeRequest = useCallback(() => setRequestOpen(false), []);

    return (
      <div
        ref={ref}
        className={cn(
          "works-caption w-full max-w-[34rem] px-4 text-center font-sans text-[clamp(0.72rem,0.92vw,0.84rem)] leading-[1.45] text-white",
          className,
        )}
      >
        <p className="m-0 text-balance">
          Catchback AI connects multiple CRMs to help messy data make sense and help
          recovery revenue in their systems.
        </p>
        <p className="m-0 mt-[0.85rem]">Lead Product Designer</p>
        <button
          type="button"
          onClick={() => setRequestOpen(true)}
          aria-haspopup="dialog"
          className="pointer-events-auto m-0 mt-[0.7rem] cursor-pointer border-0 bg-transparent p-0 font-[inherit] text-[length:inherit] text-[var(--works-green,#3CFF55)] underline underline-offset-[0.2em] transition-opacity duration-200 hover:opacity-70 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--works-green,#3CFF55)]"
        >
          Request Access for case study
        </button>
        <CaseStudyRequestModal open={requestOpen} onClose={closeRequest} />
      </div>
    );
  },
);
