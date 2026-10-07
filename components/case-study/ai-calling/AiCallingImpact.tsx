import { CaseStudyImageRow } from "@/components/case-study/CaseStudyImageRow";
import {
  AI_CALLING_IMPACT_HEADING,
  AI_CALLING_OUTCOMES,
  AI_CALLING_SCREENS_BOTTOM,
  AI_CALLING_SCREENS_TOP,
} from "@/lib/case-study/ai-calling";

export function AiCallingImpact() {
  return (
    <>
      <section id="impact" aria-labelledby="impact-title" className="pt-[clamp(4rem,8vw,7rem)]">
        <h2
          id="impact-title"
          data-reveal
          className="m-0 mb-12 text-[clamp(1.5rem,2.2vw,2rem)] leading-tight font-medium"
        >
          {AI_CALLING_IMPACT_HEADING}
        </h2>
        <div className="flex flex-col gap-[clamp(3rem,6vw,5rem)]">
          <CaseStudyImageRow images={AI_CALLING_SCREENS_TOP} label="Hotline home and campaigns" lens />
          <CaseStudyImageRow images={AI_CALLING_SCREENS_BOTTOM} label="Leads and calling" lens />
        </div>
      </section>

      <section
        id="outcomes"
        aria-labelledby="outcomes-title"
        className="pt-[clamp(4rem,8vw,7rem)]"
      >
        <h2
          id="outcomes-title"
          data-reveal
          className="m-0 mb-10 text-[clamp(1.5rem,2.2vw,2rem)] leading-tight font-medium text-[#1FA84A]"
        >
          {AI_CALLING_OUTCOMES.heading}
        </h2>
        <ol className="m-0 grid list-none gap-10 p-0 md:grid-cols-3 md:gap-8">
          {AI_CALLING_OUTCOMES.items.map(({ title, body }) => (
            <li key={title} data-reveal>
              <h3 className="m-0 mb-5 text-[0.875rem] font-bold">{title}</h3>
              <p className="m-0 text-[0.9375rem] leading-[1.7] text-neutral-700">{body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
