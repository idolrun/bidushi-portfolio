import { type Ref } from "react";
import { VahaanBottomImage } from "@/components/works/vahaan/VahaanBottomImage";
import { VahaanLogo } from "@/components/works/vahaan/VahaanLogo";
import { VahaanTopImage } from "@/components/works/vahaan/VahaanTopImage";

type VahaanHeroProps = {
  heroRef: Ref<HTMLDivElement>;
  topRef: Ref<HTMLDivElement>;
  bottomRef: Ref<HTMLDivElement>;
  logoRef: Ref<HTMLDivElement>;
};

export function VahaanHero({ heroRef, topRef, bottomRef, logoRef }: VahaanHeroProps) {
  return (
    <div className="vahaan-scene pointer-events-none absolute inset-0 z-10">
      <div ref={heroRef} className="vahaan-hero absolute inset-0">
        <VahaanTopImage ref={topRef} />
        <VahaanBottomImage ref={bottomRef} />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <VahaanLogo ref={logoRef} />
        </div>
      </div>
    </div>
  );
}
