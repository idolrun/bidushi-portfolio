import { INFO_RESEARCH } from "@/lib/info";
import { cn } from "@/lib/utils";

export function InfoResearch({ className }: { className?: string }) {
  return (
    <section
      data-info-reveal
      aria-labelledby="info-research-title"
      className={cn("min-w-0", className)}
    >
      <h2
        id="info-research-title"
        className="m-0 font-serif text-[clamp(2rem,3vw,2.6rem)] leading-[0.92] font-normal italic"
      >
        {INFO_RESEARCH.heading}
      </h2>
      <ul className="m-0 mt-[1.85rem] list-none space-y-[0.95rem] p-0 font-sans text-[clamp(0.875rem,1.3vw,1.2rem)] leading-[1.4] font-normal">
        {INFO_RESEARCH.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
