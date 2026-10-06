import { VAHAAN_ANALYSIS } from "@/lib/case-study/vahaan";

export function VahaanBehaviorAnalysis() {
  return (
    <section
      id="analysis"
      aria-labelledby="analysis-title"
      className="pt-[clamp(4rem,8vw,7rem)]"
    >
      <h2
        id="analysis-title"
        data-reveal
        className="m-0 mb-6 text-[clamp(1.35rem,2vw,1.875rem)] leading-tight font-medium"
      >
        {VAHAAN_ANALYSIS.heading}
      </h2>
      <p
        data-reveal
        className="m-0 mb-10 text-[clamp(0.9rem,1.05vw,1.0625rem)] leading-[1.75] text-neutral-800"
      >
        {VAHAAN_ANALYSIS.intro}
      </p>
      <div className="space-y-8">
        {VAHAAN_ANALYSIS.blocks.map(({ heading, body }) => (
          <div key={heading} data-reveal>
            <h3 className="m-0 mb-3 text-[clamp(0.9rem,1.05vw,1.0625rem)] font-bold">{heading}</h3>
            <p className="m-0 text-[clamp(0.9rem,1.05vw,1.0625rem)] leading-[1.75] text-neutral-800">
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
