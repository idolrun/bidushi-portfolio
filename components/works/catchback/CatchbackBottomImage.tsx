import Image from "next/image";
import { forwardRef } from "react";

export const CatchbackBottomImage = forwardRef<HTMLDivElement>(function CatchbackBottomImage(
  _props,
  ref,
) {
  return (
    <div ref={ref} aria-hidden="true" className="works-bottom absolute inset-0">
      <div className="works-piece-clip">
        <Image
          src="/images/catchback_bottom.webp"
          alt=""
          width={1300}
          height={750}
          preload
          unoptimized
          sizes="(max-width: 1023px) 78vw, 34rem"
          className="works-piece works-piece-bottom pointer-events-none"
        />
      </div>
    </div>
  );
});
