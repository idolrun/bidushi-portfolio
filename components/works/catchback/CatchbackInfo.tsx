import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type CatchbackInfoProps = {
  className?: string;
};

export const CatchbackInfo = forwardRef<HTMLDivElement, CatchbackInfoProps>(
  function CatchbackInfo({ className }, ref) {
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
        <p className="m-0 mt-[0.7rem] text-[var(--works-green,#3CFF55)] underline">
          Request Access for case study
        </p>
      </div>
    );
  },
);
