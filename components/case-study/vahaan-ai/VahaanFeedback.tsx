import { VAHAAN_FEEDBACK } from "@/lib/case-study/vahaan";

export function VahaanFeedback() {
  return (
    <div className="pt-[clamp(3.5rem,7vw,6rem)]">
      <h2 data-reveal className="m-0 mb-8 text-[clamp(1.5rem,2.2vw,2rem)] leading-tight font-medium">
        {VAHAAN_FEEDBACK.heading}
      </h2>
      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 xl:grid-cols-4">
        {VAHAAN_FEEDBACK.items.map(({ quote, author }, index) => (
          <li
            key={index}
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
    </div>
  );
}
