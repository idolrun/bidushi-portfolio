"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { CaseStudyPhone } from "@/lib/case-study/shared";

gsap.registerPlugin(useGSAP);

const ENTRANCE_Y = 160;
const ENTRANCE_SCALE = 0.94;
const ENTRANCE_DURATION = 1.7;

export function CaseStudyHeroPhones({ phones }: { phones: readonly CaseStudyPhone[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-phone]");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.set(targets, { autoAlpha: 0, y: ENTRANCE_Y, scale: ENTRANCE_SCALE });

      // Wait for both screens to decode so the pair rises as one, never one after the other.
      const images = gsap.utils.toArray<HTMLImageElement>("img", rootRef.current);
      const ready = Promise.all(images.map((img) => img.decode().catch(() => undefined)));
      const cap = new Promise((resolve) => window.setTimeout(resolve, 2000));

      Promise.race([ready, cap]).then(
        contextSafe!(() => {
          gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: ENTRANCE_DURATION,
            ease: "power3.out",
            delay: 0.1,
            clearProps: "transform",
          });
        }),
      );
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="mx-auto flex w-[min(88vw,40rem)] items-start justify-center gap-[4%] sm:w-[min(40vw,32rem)]"
    >
      {phones.map((phone) => (
        <div
          key={phone.src}
          data-phone
          className="w-[48%] will-change-transform"
        >
          <Image
            src={phone.src}
            alt={phone.alt}
            width={phone.width}
            height={phone.height}
            sizes="(min-width: 640px) 20rem, 44vw"
            priority
            className="h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}
