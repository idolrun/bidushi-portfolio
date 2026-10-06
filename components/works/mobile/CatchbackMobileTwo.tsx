import Image from "next/image";
import { forwardRef } from "react";

export const CatchbackMobileTwo = forwardRef<HTMLDivElement>(function CatchbackMobileTwo(
  _props,
  ref,
) {
  return (
    <div ref={ref} className="works-phone works-phone-center w-[clamp(4.6rem,21vw,14.75rem)] shrink-0">
      <Image
        src="/images/catcback_mobile_2.webp"
        alt="Catchback on a phone, second screen"
        width={582}
        height={1060}
        sizes="(max-width: 1023px) 24vw, 236px"
        className="pointer-events-none h-auto w-full"
      />
    </div>
  );
});
