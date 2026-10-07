"use client";

import { useRef } from "react";
import Image from "next/image";
import { BookingProject } from "@/components/works/other/BookingProject";
import { CreativeProject } from "@/components/works/other/CreativeProject";
import { PaperightProject } from "@/components/works/other/PaperightProject";
import { TravelProject } from "@/components/works/other/TravelProject";
import { usePinnedScene } from "@/hooks/useWorksAnimation";
import {
  createOtherWorksTimeline,
  settleOtherWorksTargets,
} from "@/lib/animations/otherWorksAnimations";
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
  const bookingPageRef = useRef<HTMLDivElement>(null);
  const hotelRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const artCaptionRef = useRef<HTMLDivElement>(null);

  usePinnedScene(
    sectionRef,
    {
    paperightTop: paperightTopRef,
    paperightBottom: paperightBottomRef,
    paperightLogo: paperightLogoRef,
    paperightCaption: paperightCaptionRef,
    paperightPage: paperightPageRef,
    travelPage: travelPageRef,
    artPage: artPageRef,
    bookingPage: bookingPageRef,
    hotel: hotelRef,
    social: socialRef,
    artCaption: artCaptionRef,
    travelPhones: phonesRef,
    travelCard: cardRef,
    travelCaption: travelCaptionRef,
    girl: girlRef,
    snack: snackRef,
    orange: orangeRef,
    },
    createOtherWorksTimeline,
    settleOtherWorksTargets,
  );

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
      <div
        ref={orangeRef}
        className="other-orange pointer-events-none absolute inset-x-0 top-[clamp(3.25rem,8.5vh,5.25rem)] bottom-[clamp(4.5rem,14vh,7.5rem)] z-[5]"
        aria-hidden="true"
      >
        <Image
          src="/images/orange_background.webp"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
      </div>
      <BookingProject pageRef={bookingPageRef} hotelRef={hotelRef} socialRef={socialRef} />
      <CreativeProject pageRef={artPageRef} girlRef={girlRef} snackRef={snackRef} captionRef={artCaptionRef} />
    </section>
  );
}
