import Image from "next/image";
import { CometCard } from "@/components/ui/comet-card";
import { type Ref } from "react";
import { VahaanCaseStudyLink } from "@/components/works/vahaan/VahaanCaseStudyLink";
import { VAHAAN_PROJECT } from "@/lib/works/projects";
import { cn } from "@/lib/utils";

type VahaanMobileSectionProps = {
  pageRef: Ref<HTMLDivElement>;
  phoneLeftRef: Ref<HTMLDivElement>;
  phoneCenterRef: Ref<HTMLDivElement>;
  phoneRightRef: Ref<HTMLDivElement>;
  captionRef: Ref<HTMLDivElement>;
};

const PHONES = [
  { key: "left", src: "/images/vaahaan_mobile_1.webp", width: 584, alt: "VAHAN.AI on a phone, wallet home" },
  { key: "center", src: "/images/vaahaan_mobile_2.webp", width: 582, alt: "VAHAN.AI on a phone, challenges" },
  { key: "right", src: "/images/vaahaan_mobile_3.webp", width: 584, alt: "VAHAN.AI on a phone, win up to ₹200" },
] as const;

export function VahaanMobileSection({
  pageRef,
  phoneLeftRef,
  phoneCenterRef,
  phoneRightRef,
  captionRef,
}: VahaanMobileSectionProps) {
  const refs = { left: phoneLeftRef, center: phoneCenterRef, right: phoneRightRef };

  return (
    <div ref={pageRef} className="vahaan-scene pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-[clamp(1.35rem,4.6vw,3.15rem)] pt-[clamp(4.25rem,10vh,6.25rem)] pb-[clamp(5.25rem,13vh,7.5rem)]">
      <div className="flex w-full max-w-[68rem] flex-nowrap items-end justify-center gap-[clamp(0.5rem,2.2vw,2.25rem)]">
        {PHONES.map(({ key, src, width, alt }) => (
          <div
            key={key}
            ref={refs[key]}
            className={cn(
              "vahaan-phone shrink-0 w-[clamp(4.2rem,min(17vw,27vh),15rem)] max-lg:w-[min(27vw,27vh)]",
              `vahaan-phone-${key}`,
            )}
          >
            <CometCard className="pointer-events-auto">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={1060}
                sizes="(max-width: 1023px) 27vw, 240px"
                className="pointer-events-none h-auto w-full"
              />
            </CometCard>
          </div>
        ))}
      </div>
      <div
        ref={captionRef}
        className="vahaan-caption mt-[clamp(1.25rem,3.2vh,2.1rem)] w-full max-w-[40rem] px-4 text-center font-sans text-white"
      >
        <p className="m-0 text-[clamp(0.8rem,1.1vw,1rem)] leading-[1.45] text-balance">
          {VAHAAN_PROJECT.summary}
        </p>
        <p className="m-0 mt-[0.7rem] text-[clamp(0.68rem,0.85vw,0.78rem)] leading-[1.45]">
          {VAHAAN_PROJECT.role}
        </p>
        <p className="m-0 mt-[1.1rem] text-[clamp(0.78rem,1vw,0.9rem)] font-medium">
          <VahaanCaseStudyLink />
        </p>
      </div>
    </div>
  );
}
