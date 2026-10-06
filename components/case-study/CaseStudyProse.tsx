type Props = { id: string; heading: string; paragraphs: string[] };

export function CaseStudyProse({ id, heading, paragraphs }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="pt-[clamp(4rem,8vw,7rem)]">
      <h2
        id={`${id}-title`}
        data-reveal
        className="m-0 mb-6 text-[clamp(1.5rem,2.2vw,2rem)] leading-tight font-medium"
      >
        {heading}
      </h2>
      <div className="flex flex-col gap-8 text-[clamp(0.9rem,1.05vw,1.0625rem)] leading-[1.75] text-neutral-800">
        {paragraphs.map((text) => (
          <p key={text} data-reveal className="m-0">
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
