import { forwardRef } from "react";

export const VahaanLogo = forwardRef<HTMLDivElement>(function VahaanLogo(_props, ref) {
  return (
    <div ref={ref} className="vahaan-logo">
      <p
        aria-label="VAHAN.AI"
        className="m-0 flex items-center justify-center text-center text-[calc(var(--vf)*0.22)] leading-[0.78] whitespace-nowrap text-white"
      >
        <span
          aria-hidden="true"
          className="italic [font-family:var(--font-ghosthey)] [font-synthesis:none] [text-rendering:geometricPrecision]"
        >
          V
        </span>
        <span aria-hidden="true" className="font-sans font-bold tracking-[-0.03em]">
          AHAN.AI
        </span>
      </p>
    </div>
  );
});
