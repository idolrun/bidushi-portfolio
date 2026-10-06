import type { CaseStudyOverviewData } from "@/lib/case-study/shared";

export function CaseStudyOverview({ overview }: { overview: CaseStudyOverviewData }) {
  return (
    <section
      id="overview"
      aria-labelledby="overview-title"
      className="grid gap-10 pt-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16"
    >
      <div data-reveal>
        <h2 id="overview-title" className="m-0 mb-4 text-base font-medium tracking-wide">
          {overview.heading}
        </h2>
        <div className="flex flex-col gap-5 text-[0.8125rem] leading-[1.6] text-neutral-700">
          {overview.paragraphs.map((text) => (
            <p key={text} className="m-0">
              {text}
            </p>
          ))}
        </div>
      </div>

      <dl
        data-reveal
        className="m-0 grid grid-cols-2 content-start gap-x-6 gap-y-8 text-[0.8125rem] sm:grid-cols-4"
      >
        {overview.meta.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-neutral-500">{label}</dt>
            <dd className="m-0 mt-2 font-semibold">
              {value.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
