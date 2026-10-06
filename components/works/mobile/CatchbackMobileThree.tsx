import Image from "next/image";
import { forwardRef } from "react";

export const CatchbackMobileThree = forwardRef<HTMLDivElement>(function CatchbackMobileThree(
  _props,
  ref,
) {
  return (
    <div ref={ref} className="works-phone works-phone-right w-[clamp(4.6rem,21vw,14.75rem)] shrink-0">
      <Image
        src="/images/catcback_mobile_3.webp"
        alt="Catchback on a phone, third screen"
        width={584}
        height={1060}
        sizes="(max-width: 1023px) 24vw, 236px"
        className="pointer-events-none h-auto w-full"
      />
    </div>
  );
});
