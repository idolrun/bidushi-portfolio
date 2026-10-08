import Image from "next/image";
import { forwardRef } from "react";

export const VahaanBottomImage = forwardRef<HTMLDivElement>(function VahaanBottomImage(
  _props,
  ref,
) {
  return (
    <div ref={ref} aria-hidden="true" className="vahaan-bottom">
      <Image
        src="/images/vahan_hero_bottom_right.webp"
        alt=""
        width={1248}
        height={1460}
        preload
        unoptimized
        sizes="(max-width: 1023px) 78vw, 34rem"
        className="vahaan-piece vahaan-piece-bottom pointer-events-none"
      />
    </div>
  );
});
