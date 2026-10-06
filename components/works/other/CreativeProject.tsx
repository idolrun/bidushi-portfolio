import Image from "next/image";
import { type Ref } from "react";

type CreativeProjectProps = {
  pageRef: Ref<HTMLDivElement>;
  girlRef: Ref<HTMLDivElement>;
  snackRef: Ref<HTMLDivElement>;
  orangeRef: Ref<HTMLDivElement>;
};

const PANELS = [
  {
    key: "girl" as const,
    src: "/images/illustractor_girl.webp",
    alt: "Illustration of a woman in a visor, smoking",
    className: "other-girl",
  },
  {
    key: "snack" as const,
    src: "/images/illustractor_snack.webp",
    alt: "Illustration of a takeaway meal",
    className: "other-snack",
  },
];

export function CreativeProject({ pageRef, girlRef, snackRef, orangeRef }: CreativeProjectProps) {
  const refs = { girl: girlRef, snack: snackRef };

  return (
    <div ref={pageRef} className="other-scene pointer-events-none absolute inset-0 z-10">
      <div
        ref={orangeRef}
        className="other-orange absolute inset-x-0 top-[clamp(3.25rem,8.5vh,5.25rem)] bottom-[clamp(4.5rem,14vh,7.5rem)]"
        aria-hidden="true"
      >
        <Image
          src="/images/orange_background.webp"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
      </div>
      <div className="relative z-10 flex h-full items-center justify-center gap-[clamp(0.85rem,2.4vw,2.25rem)] px-[clamp(1.35rem,4.6vw,3.15rem)] pt-[clamp(4.25rem,10vh,6.25rem)] pb-[clamp(5.25rem,13vh,7.5rem)] max-md:flex-col max-md:gap-[clamp(0.75rem,2vh,1.25rem)]">
        {PANELS.map(({ key, src, alt, className }) => (
          <div
            key={key}
            ref={refs[key]}
            className={`${className} w-[min(40vw,28rem)] max-md:w-auto`}
          >
            <Image
              src={src}
              alt={alt}
              width={1056}
              height={1070}
              sizes="(max-width: 767px) 72vw, 448px"
              className="pointer-events-none h-auto w-full max-md:max-h-[34vh] max-md:w-auto max-md:max-w-[min(78vw,22rem)]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
