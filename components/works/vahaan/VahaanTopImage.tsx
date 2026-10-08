import Image from "next/image";
import { forwardRef } from "react";

export const VahaanTopImage = forwardRef<HTMLDivElement>(function VahaanTopImage(_props, ref) {
  return (
    <div ref={ref} className="vahaan-top">
      <Image
        src="/images/vahan_hero_top_left.webp"
        alt="VAHAN.AI app, upper diagonal of the wallet home screen"
        width={1248}
        height={1460}
        preload
        unoptimized
        sizes="(max-width: 1023px) 78vw, 34rem"
        className="vahaan-piece vahaan-piece-top pointer-events-none"
      />
    </div>
  );
});
