import { AI_CALLING_RESEARCH } from "@/lib/case-study/ai-calling";

export function AiCallingResearch() {
  return (
    <section id="research" aria-labelledby="research-title" className="pt-[clamp(4rem,8vw,7rem)]">
      <h2
        id="research-title"
        data-reveal
        className="m-0 mb-6 text-[clamp(1.35rem,2vw,1.875rem)] leading-tight font-medium"
      >
        {AI_CALLING_RESEARCH.heading}
      </h2>
      <p
        data-reveal
        className="m-0 mb-10 text-[clamp(0.9rem,1.05vw,1.0625rem)] leading-[1.75] text-neutral-800"
      >
        {AI_CALLING_RESEARCH.intro}
      </p>
      <div className="flex flex-col gap-8">
        {AI_CALLING_RESEARCH.blocks.map(({ heading, body }) => (
          <div key={heading} data-reveal>
            <h3 className="m-0 mb-3 text-[clamp(0.8rem,0.95vw,0.9375rem)] font-bold tracking-[0.02em] uppercase">
              {heading}
            </h3>
            <p className="m-0 text-[clamp(0.9rem,1.05vw,1.0625rem)] leading-[1.75] text-neutral-800">
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
