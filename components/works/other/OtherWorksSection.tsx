"use client";

import { useRef } from "react";
import { CreativeProject } from "@/components/works/other/CreativeProject";
import { PaperightProject } from "@/components/works/other/PaperightProject";
import { TravelProject } from "@/components/works/other/TravelProject";
import { useOtherWorksAnimation } from "@/hooks/useOtherWorksAnimation";
import "./other-works.css";

export function OtherWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const paperightTopRef = useRef<HTMLDivElement>(null);
  const paperightBottomRef = useRef<HTMLDivElement>(null);
  const paperightLogoRef = useRef<HTMLDivElement>(null);
  const paperightCaptionRef = useRef<HTMLDivElement>(null);
  const paperightPageRef = useRef<HTMLDivElement>(null);
  const travelPageRef = useRef<HTMLDivElement>(null);
  const artPageRef = useRef<HTMLDivElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const travelCaptionRef = useRef<HTMLDivElement>(null);
  const girlRef = useRef<HTMLDivElement>(null);
  const snackRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  useOtherWorksAnimation(sectionRef, {
    paperightTop: paperightTopRef,
    paperightBottom: paperightBottomRef,
    paperightLogo: paperightLogoRef,
    paperightCaption: paperightCaptionRef,
    paperightPage: paperightPageRef,
    travelPage: travelPageRef,
    artPage: artPageRef,
    travelPhones: phonesRef,
    travelCard: cardRef,
    travelCaption: travelCaptionRef,
    girl: girlRef,
    snack: snackRef,
    orange: orangeRef,
  });

  return (
    <section
      ref={sectionRef}
      id="other-works"
      aria-label="Other works"
      className="other-works-stage relative h-dvh min-h-dvh shrink-0 overflow-hidden bg-[#090909] font-serif text-white"
    >
      <PaperightProject
        pageRef={paperightPageRef}
        topRef={paperightTopRef}
        bottomRef={paperightBottomRef}
        logoRef={paperightLogoRef}
        captionRef={paperightCaptionRef}
      />
      <TravelProject pageRef={travelPageRef} phonesRef={phonesRef} cardRef={cardRef} captionRef={travelCaptionRef} />
      <CreativeProject pageRef={artPageRef} girlRef={girlRef} snackRef={snackRef} orangeRef={orangeRef} />
    </section>
  );
}
