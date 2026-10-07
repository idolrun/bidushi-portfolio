import { PAPERIGHT_UX } from "@/lib/case-study/paperight";

export function PaperightUx() {
  return (
    <section id="ux" aria-labelledby="ux-title" className="pt-[clamp(4rem,8vw,7rem)]">
      <h2
        id="ux-title"
        data-reveal
        className="m-0 mb-10 text-[clamp(1.35rem,2vw,1.875rem)] leading-tight font-medium"
      >
        {PAPERIGHT_UX.heading}
      </h2>
      <div className="space-y-10">
        {PAPERIGHT_UX.blocks.map(({ heading, body }) => (
          <div key={heading} data-reveal>
            <h3 className="m-0 mb-4 text-[clamp(0.9rem,1.05vw,1.0625rem)] font-bold">{heading}</h3>
            <div className="flex flex-col gap-5">
              {body.map((text) => (
                <p
                  key={text}
                  className="m-0 text-[clamp(0.9rem,1.05vw,1.0625rem)] leading-[1.75] text-neutral-800"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
