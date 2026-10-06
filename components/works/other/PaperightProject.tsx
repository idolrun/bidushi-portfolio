import Image from "next/image";
import { type Ref } from "react";

type PaperightProjectProps = {
  pageRef: Ref<HTMLDivElement>;
  topRef: Ref<HTMLDivElement>;
  bottomRef: Ref<HTMLDivElement>;
  logoRef: Ref<HTMLDivElement>;
  captionRef: Ref<HTMLDivElement>;
};

const sceneClass =
  "other-scene pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-[clamp(1.35rem,4.6vw,3.15rem)] pt-[clamp(4.25rem,10vh,6.25rem)] pb-[clamp(5.25rem,13vh,7.5rem)]";

export function PaperightProject({
  pageRef,
  topRef,
  bottomRef,
  logoRef,
  captionRef,
}: PaperightProjectProps) {
  return (
    <div ref={pageRef} className={sceneClass}>
      <div className="other-paperight-frame relative">
        <div ref={topRef} className="other-paperight-top">
          <Image
            src="/images/paperight_top.webp"
            alt="Paperight mission page, upper diagonal"
            width={1300}
            height={730}
            preload
            unoptimized
            sizes="(max-width: 1023px) 78vw, 34rem"
            className="other-paperight-piece pointer-events-none"
          />
        </div>
        <div ref={bottomRef} aria-hidden="true" className="other-paperight-bottom">
          <Image
            src="/images/paperight_bottom.webp"
            alt=""
            width={1300}
            height={730}
            preload
            unoptimized
            sizes="(max-width: 1023px) 78vw, 34rem"
            className="other-paperight-piece other-paperight-piece-bottom pointer-events-none"
          />
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div ref={logoRef} className="other-paperight-logo">
            <p
              aria-label="PAPERIGHT.AI"
              className="m-0 flex items-center justify-center text-center text-[calc(var(--pf)*0.15)] leading-[0.78] whitespace-nowrap text-white mix-blend-difference"
            >
              <span
                aria-hidden="true"
                className="italic [font-family:var(--font-ghosthey)] [font-synthesis:none] [text-rendering:geometricPrecision]"
              >
                P
              </span>
              <span aria-hidden="true" className="font-sans font-bold tracking-[-0.03em]">
                APERIGHT.AI
              </span>
            </p>
          </div>
        </div>
      </div>
      <div
        ref={captionRef}
        className="other-paperight-caption mt-[clamp(1.1rem,2.8vh,1.85rem)] w-full max-w-[34rem] px-4 text-center font-sans text-[clamp(0.72rem,0.92vw,0.84rem)] leading-[1.45] text-white"
      >
        <p className="m-0 text-balance">
          0–1 AI analytical tool for 4th year computer science students
        </p>
        <p className="m-0 mt-[0.85rem]">Lead Product Designer</p>
        <p className="m-0 mt-[0.7rem] text-[var(--works-green,#3CFF55)] underline">
          Request Full case study
        </p>
      </div>
    </div>
  );
}
