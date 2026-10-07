import { PAPERIGHT_PROCESS } from "@/lib/case-study/paperight";

export function PaperightProcess() {
  return (
    <section id="process" aria-labelledby="process-title" className="pt-[clamp(4rem,8vw,7rem)]">
      <h2
        id="process-title"
        data-reveal
        className="m-0 mb-6 text-[clamp(1.35rem,2vw,1.875rem)] leading-tight font-medium"
      >
        {PAPERIGHT_PROCESS.heading}
      </h2>
      <p
        data-reveal
        className="m-0 mb-10 text-[clamp(0.9rem,1.05vw,1.0625rem)] leading-[1.75] text-neutral-800"
      >
        {PAPERIGHT_PROCESS.intro}
      </p>
      <div className="flex flex-col gap-8">
        {PAPERIGHT_PROCESS.blocks.map(({ heading, body }) => (
          <p
            key={heading}
            data-reveal
            className="m-0 text-[clamp(0.9rem,1.05vw,1.0625rem)] leading-[1.75] text-neutral-800"
          >
            <strong className="font-bold">{heading}</strong> {body}
          </p>
        ))}
      </div>
    </section>
  );
}
