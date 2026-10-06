import { type Ref } from "react";
import { CatchbackBottomImage } from "@/components/works/catchback/CatchbackBottomImage";
import { CatchbackLogo } from "@/components/works/catchback/CatchbackLogo";
import { CatchbackTopImage } from "@/components/works/catchback/CatchbackTopImage";

type CatchbackSceneProps = {
  lockupRef: Ref<HTMLDivElement>;
  frameRef: Ref<HTMLDivElement>;
  topRef: Ref<HTMLDivElement>;
  bottomRef: Ref<HTMLDivElement>;
  logoRef: Ref<HTMLDivElement>;
};

export function CatchbackScene({
  lockupRef,
  frameRef,
  topRef,
  bottomRef,
  logoRef,
}: CatchbackSceneProps) {
  return (
    <div className="works-scene pointer-events-none absolute inset-0 z-10">
      <div ref={lockupRef} className="works-lockup absolute inset-0 flex items-center justify-center">
        <div className="relative w-[min(78vw,calc(54vh*1300/750),34rem)]">
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <CatchbackLogo ref={logoRef} />
          </div>
          <div ref={frameRef} className="works-frame relative z-10 aspect-[1300/750] w-full">
            <CatchbackTopImage ref={topRef} />
            <CatchbackBottomImage ref={bottomRef} />
            <div className="works-overlay" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
