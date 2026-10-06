import { type Ref } from "react";
import { cn } from "@/lib/utils";

type TravelInfoCardProps = {
  cardRef: Ref<HTMLDivElement>;
  className?: string;
};

export function TravelInfoCard({ cardRef, className }: TravelInfoCardProps) {
  return (
    <div
      ref={cardRef}
      className={cn(
        "other-travel-card w-[min(12.25rem,72vw)] rounded-[1.15rem] bg-[#121212] px-[1.15rem] py-[1.15rem] text-left shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
        className,
      )}
    >
      <p className="m-0 font-sans text-[clamp(0.98rem,1.2vw,1.15rem)] leading-[1.2] font-medium tracking-[-0.02em] text-white">
        Travel made simple
      </p>
      <p className="m-0 mt-[0.55rem] font-sans text-[clamp(0.62rem,0.72vw,0.7rem)] leading-[1.45] text-white/55">
        With hyper personalized selections that meet your needs.
      </p>
    </div>
  );
}
