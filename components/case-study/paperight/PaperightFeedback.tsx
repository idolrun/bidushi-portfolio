import { PAPERIGHT_FEEDBACK } from "@/lib/case-study/paperight";

export function PaperightFeedback() {
  return (
    <section id="feedback" aria-labelledby="feedback-title" className="pt-[clamp(4rem,8vw,7rem)]">
      <h2
        id="feedback-title"
        data-reveal
        className="m-0 mb-8 text-[clamp(1.5rem,2.2vw,2rem)] leading-tight font-medium text-[#1FA84A]"
      >
        {PAPERIGHT_FEEDBACK.heading}
      </h2>
      <h3
        data-reveal
        className="m-0 mb-5 max-w-[16ch] text-[clamp(1.1rem,1.5vw,1.375rem)] leading-tight font-semibold"
      >
        {PAPERIGHT_FEEDBACK.subheading}
      </h3>
      <p
        data-reveal
        className="m-0 mb-8 text-[clamp(0.8rem,0.95vw,0.9375rem)] leading-[1.7] text-neutral-800"
      >
        {PAPERIGHT_FEEDBACK.intro}
      </p>
      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 xl:grid-cols-4">
        {PAPERIGHT_FEEDBACK.items.map(({ quote, author }) => (
          <li
            key={author}
            data-reveal
            className="flex flex-col justify-between gap-5 rounded-xl bg-[#F3F3FB] p-5 text-[0.8125rem] leading-[1.6]"
          >
            <blockquote className="m-0 text-neutral-800">{quote}</blockquote>
            <p className="m-0 text-[0.75rem] font-semibold tracking-wide">
              <span aria-hidden="true">★★★★★</span>
              <span className="sr-only">5 out of 5 stars, </span> {author}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
