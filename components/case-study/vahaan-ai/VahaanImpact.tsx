import { VAHAAN_METRICS } from "@/lib/case-study/vahaan";
import { VahaanFeedback } from "@/components/case-study/vahaan-ai/VahaanFeedback";

export function VahaanImpact() {
  return (
    <section id="impact" aria-label="Impact" className="pt-[clamp(4rem,8vw,7rem)]">
      <ul
        data-reveal
        className="m-0 grid list-none gap-4 bg-[#EEEEFA] p-[clamp(1rem,2.5vw,2rem)] sm:grid-cols-3 lg:max-w-[82%]"
      >
        {VAHAAN_METRICS.map((text) => (
          <li
            key={text}
            className="flex min-h-24 items-center justify-center bg-white px-5 py-6 text-center text-[clamp(0.9rem,1.1vw,1.0625rem)] leading-snug font-medium"
          >
            {text}
          </li>
        ))}
      </ul>
      <VahaanFeedback />
    </section>
  );
}
