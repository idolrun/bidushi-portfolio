import { INFO_BIOGRAPHY } from "@/lib/info";
import { cn } from "@/lib/utils";

const bodyClass =
  "m-0 font-sans text-[clamp(1rem,1.55vw,1.42rem)] leading-[1.4] font-normal text-white";

export function InfoBiography({ className }: { className?: string }) {
  const [lead, body] = INFO_BIOGRAPHY.paragraphs;

  return (
    <section data-info-reveal aria-label="Biography" className={cn("min-w-0", className)}>
      <p className={bodyClass}>
        <span className="mr-[0.06em] inline-block align-baseline text-[2.7em] leading-[0.68] italic [font-family:var(--font-ghosthey)] [font-synthesis:none] [text-rendering:geometricPrecision]">
          {INFO_BIOGRAPHY.dropCap}
        </span>
        {lead}
      </p>
      <p className={cn(bodyClass, "mt-[1.15em]")}>{body}</p>
    </section>
  );
}
