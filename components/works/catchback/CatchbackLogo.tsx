import { forwardRef } from "react";

export const CatchbackLogo = forwardRef<HTMLDivElement>(function CatchbackLogo(_props, ref) {
  return (
    <div ref={ref} className="works-logo origin-center">
      <p className="m-0 flex items-center justify-center text-center text-[calc(min(78vw,calc(54vh*1300/730),34rem)*0.22)] leading-[0.78] whitespace-nowrap text-white">
        <span className="italic [font-family:var(--font-ghosthey)] [font-synthesis:none] [text-rendering:geometricPrecision]">
          C
        </span>
        <span className="font-sans font-bold tracking-[-0.03em]">ATCHBACK</span>
      </p>
    </div>
  );
});
