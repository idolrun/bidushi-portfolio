import Image from "next/image";
import { CometCard } from "@/components/ui/comet-card";
import { type Ref } from "react";
import { TravelInfoCard } from "@/components/works/other/TravelInfoCard";

type TravelProjectProps = {
  pageRef: Ref<HTMLDivElement>;
  phonesRef: Ref<HTMLDivElement>;
  cardRef: Ref<HTMLDivElement>;
  captionRef: Ref<HTMLDivElement>;
};

const PHONES = [
  {
    src: "/images/travel_mobile_1.webp",
    alt: "Travel app map with a hotel near Kathmandu",
  },
  {
    src: "/images/travel_mobile_2.webp",
    alt: "Travel app date and room selection",
  },
] as const;

export function TravelProject({ pageRef, phonesRef, cardRef, captionRef }: TravelProjectProps) {
  return (
    <div ref={pageRef} className="other-scene pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-[clamp(1.35rem,4.6vw,3.15rem)] pt-[clamp(4.25rem,10vh,6.25rem)] pb-[clamp(5.25rem,13vh,7.5rem)]">
      <div className="grid w-full max-w-[76rem] grid-cols-1 items-center justify-items-center gap-y-[clamp(1.15rem,2.8vh,1.75rem)] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:justify-items-stretch lg:gap-x-[clamp(1.25rem,3vw,3rem)]">
        <TravelInfoCard cardRef={cardRef} className="lg:justify-self-end" />
        <div
          ref={phonesRef}
          className="other-phones flex max-w-full flex-wrap items-end justify-center gap-[clamp(0.45rem,1.5vw,1.25rem)]"
        >
          {PHONES.map(({ src, alt }) => (
            <div key={src} className="w-[clamp(6.75rem,min(30vw,32vh),17.5rem)]">
              <CometCard className="pointer-events-auto">
                <Image
                  src={src}
                  alt={alt}
                  width={639}
                  height={1063}
                  sizes="(max-width: 1023px) 42vw, 280px"
                  className="pointer-events-none h-auto w-full"
                />
              </CometCard>
            </div>
          ))}
        </div>
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
      <div
        ref={captionRef}
        className="other-travel-caption mt-[clamp(1.15rem,3vh,2rem)] w-full max-w-[40rem] px-4 text-center font-sans text-white"
      >
        <p className="m-0 text-[clamp(0.8rem,1.1vw,1rem)] leading-[1.45] text-balance">
          Travel app for Nepalese Travelers with local wallet integration and no need for credit card
        </p>
        <p className="m-0 mt-[0.7rem] text-[clamp(0.68rem,0.85vw,0.78rem)] leading-[1.45]">
          Lead Product Designer/ CO-Founder
        </p>
      </div>
    </div>
  );
}
