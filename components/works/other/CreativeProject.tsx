import Image from "next/image";
import { type Ref } from "react";

type CreativeProjectProps = {
  pageRef: Ref<HTMLDivElement>;
  girlRef: Ref<HTMLDivElement>;
  snackRef: Ref<HTMLDivElement>;
  captionRef: Ref<HTMLDivElement>;
};

const PANELS = [
  {
    key: "girl" as const,
    src: "/images/otherwork-girl-illustration.webp",
    title: "Pixel Art 001",
    note: "This piece is helped me understand tone and balancing colors",
    alt: "Illustration of a woman in a visor, smoking",
    className: "other-girl",
  },
  {
    key: "snack" as const,
    src: "/images/otherwork-snack-illustration.webp",
    title: "Pixel Art 002",
    note: "This was to understand shape form lighting and angle on the objects placed.",
    alt: "Illustration of a takeaway meal",
    className: "other-snack",
  },
];

export function CreativeProject({
  pageRef,
  girlRef,
  snackRef,
  captionRef,
}: CreativeProjectProps) {
  const refs = { girl: girlRef, snack: snackRef };

  return (
    <div
      ref={pageRef}
      className="other-scene pointer-events-none absolute inset-0 z-10"
    >
      <div className="relative z-10 flex h-full items-center justify-center gap-[clamp(0.85rem,2.4vw,2.25rem)] px-[clamp(1.35rem,4.6vw,3.15rem)] pt-[clamp(4.25rem,10vh,6.25rem)] pb-[clamp(5.25rem,13vh,7.5rem)] max-md:flex-col max-md:gap-[clamp(0.75rem,2vh,1.25rem)]">
        {PANELS.map(({ key, src, alt, title, note, className }) => (
          <div
            key={key}
            ref={refs[key]}
            className={`${className} relative w-[min(40vw,28rem)] [container-type:inline-size] max-md:w-[min(33.5vh,78vw,22rem)]`}
          >
            <Image
              src={src}
              alt={alt}
              width={1056}
              height={1070}
              sizes="(max-width: 767px) 72vw, 448px"
              className="pointer-events-none h-auto w-full"
            />
            {/* Header strip of the card is empty cream: title + note go top-left. */}
            <div className="pointer-events-none absolute top-[7%] left-[5%] w-[62%] font-sans text-[#0E0E10]">
              <p className="m-0 text-[max(0.6rem,3.4cqw)] leading-none font-medium">{title}</p>
              <p className="m-0 mt-[2.2cqw] text-[max(0.5rem,2.3cqw)] leading-[1.35]">{note}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-[calc(clamp(4.5rem,14vh,7.5rem)-3rem)] flex justify-center px-[clamp(1.35rem,4.6vw,3.15rem)]">
        <div className="flex w-[calc(2*min(40vw,28rem)+clamp(0.85rem,2.4vw,2.25rem))] max-w-full justify-end max-md:justify-center">
          <div
            ref={captionRef}
            className="other-art-caption m-0 max-w-[26rem] text-right font-sans text-[clamp(0.68rem,0.85vw,0.8rem)] leading-[1.45] text-white max-md:text-center"
          >
            Pixel art has always been a creative thing for me when im not
            working. Here are a few pieces I&apos;ve done recently
          </div>
        </div>
      </div>
    </div>
  );
}
