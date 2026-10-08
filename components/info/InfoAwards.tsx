import Image from "next/image";
import { INFO_AWARDS } from "@/lib/info";
import { cn } from "@/lib/utils";

export function InfoAwards({ className }: { className?: string }) {
  return (
    <section
      data-info-reveal
      aria-labelledby="info-awards-title"
      className={cn("min-w-0", className)}
    >
      <div className="mt-[1.35rem] mb-[1.35rem] h-px bg-white/15" role="presentation" />
      <h2
        id="info-awards-title"
        className="m-0 font-serif text-[clamp(2rem,3vw,2.6rem)] leading-[0.92] font-normal italic"
      >
        {INFO_AWARDS.heading}
      </h2>
      <p className="m-0 mt-[1.9rem] font-sans text-[clamp(1rem,1.45vw,1.25rem)] leading-none font-bold">
        {INFO_AWARDS.year}
      </p>
      <div className="mt-[0.95rem] flex flex-col gap-[0.62rem] font-sans text-[clamp(0.875rem,1.3vw,1.2rem)] leading-[1.35] font-normal">
        {INFO_AWARDS.lines.map((line) => (
          <p key={line} className="m-0">
            {line}
          </p>
        ))}
      </div>
      <Image
        src={INFO_AWARDS.logo.src}
        alt={INFO_AWARDS.logo.alt}
        width={INFO_AWARDS.logo.width}
        height={INFO_AWARDS.logo.height}
        sizes="66px"
        className="mt-6 h-auto w-[4.15rem]"
      />
    </section>
  );
}
