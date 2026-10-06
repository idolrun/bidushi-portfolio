"use client";

import { type Ref } from "react";
import { CatchbackInfo } from "@/components/works/catchback/CatchbackInfo";
import { CatchbackMobileOne } from "@/components/works/mobile/CatchbackMobileOne";
import { CatchbackMobileThree } from "@/components/works/mobile/CatchbackMobileThree";
import { CatchbackMobileTwo } from "@/components/works/mobile/CatchbackMobileTwo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type CatchbackMobileSceneProps = {
  pageRef: Ref<HTMLDivElement>;
  phoneLeftRef: Ref<HTMLDivElement>;
  phoneCenterRef: Ref<HTMLDivElement>;
  phoneRightRef: Ref<HTMLDivElement>;
  captionRef: Ref<HTMLDivElement>;
};

export function CatchbackMobileScene({
  pageRef,
  phoneLeftRef,
  phoneCenterRef,
  phoneRightRef,
  captionRef,
}: CatchbackMobileSceneProps) {
  const compact = useMediaQuery("(max-width: 1023px)");

  return (
    <div ref={pageRef} className="works-scene pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-[clamp(1.35rem,4.6vw,3.15rem)] pt-[clamp(4.25rem,10vh,6.25rem)] pb-[clamp(5.25rem,13vh,7.5rem)]">
      <div
        className={cn(
          "flex w-full flex-nowrap items-end justify-center",
          compact ? "max-w-[96vw] gap-2" : "max-w-[68rem] gap-[clamp(0.7rem,1.8vw,2.25rem)]",
        )}
      >
        <CatchbackMobileOne ref={phoneLeftRef} />
        <CatchbackMobileTwo ref={phoneCenterRef} />
        <CatchbackMobileThree ref={phoneRightRef} />
      </div>
      <CatchbackInfo ref={captionRef} className="mt-[clamp(1.25rem,3.2vh,2.1rem)]" />
    </div>
  );
}
