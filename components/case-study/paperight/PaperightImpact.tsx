import Image from "next/image";
import { Lens } from "@/components/ui/lens";
import { CaseStudyImageRow } from "@/components/case-study/CaseStudyImageRow";
import {
  PAPERIGHT_FLOW,
  PAPERIGHT_IMPACT_HEADING,
  PAPERIGHT_SCREENS,
  PAPERIGHT_SYSTEM_DESIGN,
} from "@/lib/case-study/paperight";

export function PaperightImpact() {
  const { image, caption } = PAPERIGHT_SCREENS;

  return (
    <section id="impact" aria-labelledby="impact-title" className="pt-[clamp(4rem,8vw,7rem)]">
      <h2
        id="impact-title"
        data-reveal
        className="m-0 mb-12 text-[clamp(1.5rem,2.2vw,2rem)] leading-tight font-medium"
      >
        {PAPERIGHT_IMPACT_HEADING}
      </h2>
      <div className="flex flex-col gap-[clamp(3rem,6vw,5rem)]">
        <CaseStudyImageRow images={PAPERIGHT_FLOW} label="Design process and system architecture" lens />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start lg:gap-12">
          <figure data-reveal className="m-0">
            <Lens>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 60vw, 90vw"
                className="h-auto w-full"
              />
            </Lens>
            <figcaption className="mt-4 text-center text-[0.75rem] text-neutral-700">
              {caption}
            </figcaption>
          </figure>
          <div data-reveal className="text-[0.75rem] leading-[1.6] text-neutral-700">
            <h3 className="m-0 mb-2 text-[0.8125rem] font-bold text-[#0E0E10]">
              {PAPERIGHT_SYSTEM_DESIGN.heading}
            </h3>
            <p className="m-0">{PAPERIGHT_SYSTEM_DESIGN.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
