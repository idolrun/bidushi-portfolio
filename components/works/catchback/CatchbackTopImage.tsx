import Image from "next/image";
import { forwardRef } from "react";

export const CatchbackTopImage = forwardRef<HTMLDivElement>(function CatchbackTopImage(
  _props,
  ref,
) {
  return (
    <div ref={ref} className="works-top absolute inset-0">
      <div className="works-piece-clip">
        <Image
          src="/images/catchback_top.webp"
          alt="Catchback website, upper diagonal of the homepage"
          width={1300}
          height={750}
          preload
          unoptimized
          sizes="(max-width: 1023px) 78vw, 34rem"
          className="works-piece works-piece-top pointer-events-none"
        />
      </div>
    </div>
  );
});
