import Image from "next/image";
import { forwardRef } from "react";

export const VahaanTopImage = forwardRef<HTMLDivElement>(function VahaanTopImage(_props, ref) {
  return (
    <div ref={ref} className="vahaan-top">
      <Image
        src="/images/vahan_top.webp"
        alt="VAHAN.AI app, upper diagonal of the wallet home screen"
        width={1300}
        height={730}
        preload
        unoptimized
        sizes="(max-width: 1023px) 78vw, 34rem"
        className="vahaan-piece vahaan-piece-top pointer-events-none"
      />
    </div>
  );
});
