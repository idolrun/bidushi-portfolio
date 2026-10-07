import Image from "next/image";
import { CometCard } from "@/components/ui/comet-card";
import { forwardRef } from "react";

export const CatchbackMobileOne = forwardRef<HTMLDivElement>(function CatchbackMobileOne(
  _props,
  ref,
) {
  return (
    <div ref={ref} className="works-phone works-phone-left w-[clamp(4.6rem,21vw,14.75rem)] shrink-0">
      <CometCard className="pointer-events-auto">
        <Image
          src="/images/catcback_mobile_1.webp"
          alt="Catchback on a phone, first screen"
          width={584}
          height={1060}
          sizes="(max-width: 1023px) 24vw, 236px"
          className="pointer-events-none h-auto w-full"
        />
      </CometCard>
    </div>
  );
});
