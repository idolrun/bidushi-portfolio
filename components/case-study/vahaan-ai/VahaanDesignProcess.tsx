import { CaseStudyImageRow } from "@/components/case-study/CaseStudyImageRow";
import {
  VAHAAN_GAME_DESIGN,
  VAHAAN_VERSION_1,
  VAHAAN_VERSION_2,
} from "@/lib/case-study/vahaan";

export function VahaanDesignProcess() {
  return (
    <>
      <section
        id="game-design"
        aria-labelledby="game-design-title"
        className="pt-[clamp(4rem,8vw,7rem)]"
      >
        <h2
          id="game-design-title"
          data-reveal
          className="m-0 mb-14 text-[clamp(0.9rem,1.05vw,1.0625rem)] font-bold"
        >
          {VAHAAN_GAME_DESIGN.principles}
        </h2>
        <CaseStudyImageRow images={VAHAAN_VERSION_1} label="Version 1 screens" />
      </section>

      <section
        id="solution"
        aria-label="Solution: Version 2"
        className="mt-[clamp(3rem,6vw,5rem)] border-t border-neutral-300 pt-12"
      >
        <CaseStudyImageRow images={VAHAAN_VERSION_2} label="Version 2 screens" />
      </section>
    </>
  );
}
