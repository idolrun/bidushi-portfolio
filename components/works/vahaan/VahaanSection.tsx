"use client";

import { useRef } from "react";
import { VahaanHero } from "@/components/works/vahaan/VahaanHero";
import { VahaanMobileSection } from "@/components/works/vahaan/VahaanMobileSection";
import { usePinnedScene } from "@/hooks/useWorksAnimation";
import { createVahaanTimeline, settleVahaanTargets } from "@/lib/animations/vahaanAnimations";
import "./vahaan.css";

export function VahaanSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const phonesPageRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const phoneLeftRef = useRef<HTMLDivElement>(null);
  const phoneCenterRef = useRef<HTMLDivElement>(null);
  const phoneRightRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  usePinnedScene(
    sectionRef,
    {
    hero: heroRef,
    phonesPage: phonesPageRef,
    top: topRef,
    bottom: bottomRef,
    logo: logoRef,
    phoneLeft: phoneLeftRef,
    phoneCenter: phoneCenterRef,
    phoneRight: phoneRightRef,
    caption: captionRef,
    },
    createVahaanTimeline,
    settleVahaanTargets,
  );

  return (
    <section
      ref={sectionRef}
      id="vahan"
      aria-label="Selected works: VAHAN.AI"
      className="vahaan-stage relative h-dvh min-h-dvh shrink-0 overflow-hidden bg-[#090909] font-serif text-white"
    >
      <VahaanHero heroRef={heroRef} topRef={topRef} bottomRef={bottomRef} logoRef={logoRef} />
      <VahaanMobileSection
        pageRef={phonesPageRef}
        phoneLeftRef={phoneLeftRef}
        phoneCenterRef={phoneCenterRef}
        phoneRightRef={phoneRightRef}
        captionRef={captionRef}
      />
    </section>
  );
}
