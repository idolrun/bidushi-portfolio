"use client";

import { useRef } from "react";
import { CatchbackScene } from "@/components/works/catchback/CatchbackScene";
import { CatchbackMobileScene } from "@/components/works/mobile/CatchbackMobileScene";
import { useWorksAnimation } from "@/hooks/useWorksAnimation";
import "./works.css";

export function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const phonesPageRef = useRef<HTMLDivElement>(null);
  const phoneLeftRef = useRef<HTMLDivElement>(null);
  const phoneCenterRef = useRef<HTMLDivElement>(null);
  const phoneRightRef = useRef<HTMLDivElement>(null);
  const phonesCaptionRef = useRef<HTMLDivElement>(null);

  useWorksAnimation(sectionRef, {
    top: topRef,
    bottom: bottomRef,
    frame: frameRef,
    logo: logoRef,
    lockup: lockupRef,
    phonesPage: phonesPageRef,
    phoneLeft: phoneLeftRef,
    phoneCenter: phoneCenterRef,
    phoneRight: phoneRightRef,
    phonesCaption: phonesCaptionRef,
  });

  return (
    <section
      ref={sectionRef}
      id="works"
      aria-label="Selected works"
      className="works-stage relative h-dvh min-h-dvh overflow-hidden bg-[#090909] font-serif text-white"
    >
      <CatchbackScene
        lockupRef={lockupRef}
        frameRef={frameRef}
        topRef={topRef}
        bottomRef={bottomRef}
        logoRef={logoRef}
      />
      <CatchbackMobileScene
        pageRef={phonesPageRef}
        phoneLeftRef={phoneLeftRef}
        phoneCenterRef={phoneCenterRef}
        phoneRightRef={phoneRightRef}
        captionRef={phonesCaptionRef}
      />
    </section>
  );
}
