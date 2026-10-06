"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import {
  CLOCK_TIME_PLACEHOLDER,
  CLOCKS,
  detectVisitorTimeZone,
  formatClockTime,
  instantToDate,
  isTimeResponse,
  type TimeAnchor,
} from "@/lib/clocks";

const PAPER = "#F5F5F5";
const INK = "#111111";
const LOGO_INK_NUDGE = 0.12;

const percentClass =
  "block whitespace-nowrap pt-[0.65em] text-[clamp(2.85rem,5.8vw,5.4rem)] leading-[0.85] tracking-[-0.02em] [font-family:var(--font-ghosthey)] [font-synthesis:none] [text-rendering:geometricPrecision]";

const logoClass =
  "whitespace-nowrap text-[clamp(4.4rem,21vw,17rem)] leading-[0.8] [font-family:var(--font-ghosthey)] [font-synthesis:none] [text-rendering:geometricPrecision]";

const REVEAL_DURATION = 2.1;
const REVEAL_EASE = "power3.inOut";
const PERCENT_EXIT_DURATION = 0.9;

function clockZone(name: string, timezone: string) {
  return name === "Local Time" ? "local" : timezone;
}

function ClockTime({ timeZone }: { timeZone: string }) {
  const time = CLOCK_TIME_PLACEHOLDER;
  return (
    <span
      data-timezone={timeZone}
      aria-hidden="true"
      suppressHydrationWarning
      className="t-digit-group mt-[0.35rem] font-sans text-[clamp(0.75rem,1.55vw,1.15rem)] leading-none text-white tabular-nums"
    >
      {time.split("").map((char, index) => (
        <span
          key={index}
          className="t-digit tracking-[-0.03em]"
          suppressHydrationWarning
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function paintClock(node: HTMLElement, time: string) {
  const digits = node.querySelectorAll<HTMLElement>(".t-digit");
  const changed: HTMLElement[] = [];
  let hourOrMinuteChanged = false;

  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];
    const char = time.charAt(i);
    if (digit.textContent === char) continue;
    digit.textContent = char;
    changed.push(digit);
    if (i < 5) hourOrMinuteChanged = true;
  }

  if (changed.length === 0) return;

  const label = node.previousElementSibling?.textContent?.trim();
  node.closest("li")?.setAttribute("aria-label", label ? `${label}, ${time}` : time);
  if (!hourOrMinuteChanged) return;

  for (let i = 0; i < changed.length; i++) {
    const digit = changed[i];
    digit.classList.remove("is-animating");
    digit.style.setProperty("--digit-i", String(i));
    if (i === 0) digit.removeAttribute("data-stagger");
    else digit.dataset.stagger = String(i);
  }

  void node.offsetWidth;

  for (let i = 0; i < changed.length; i++) {
    changed[i].classList.add("is-animating");
  }
}

function HomeLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const darkWrapRef = useRef<HTMLDivElement>(null);
  const lightWrapRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLSpanElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const clocksRef = useRef<HTMLDivElement>(null);
  const safeTopRef = useRef<HTMLSpanElement>(null);
  const safeBottomRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const sheet = sheetRef.current;
    const darkWrap = darkWrapRef.current;
    const lightWrap = lightWrapRef.current;
    const dark = darkRef.current;
    const light = lightRef.current;
    const logo = logoRef.current;
    const clocks = clocksRef.current;
    if (!root || !sheet || !darkWrap || !lightWrap || !dark || !light || !logo || !clocks) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
      overscroll: html.style.overscrollBehavior,
    };
    const scrollbarGap = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    if (scrollbarGap > 0) body.style.paddingRight = `${scrollbarGap}px`;

    const inerted: HTMLElement[] = [];
    document.querySelectorAll("body > *").forEach((node) => {
      if (!(node instanceof HTMLElement) || node.id === "portfolio-loader") return;
      node.inert = true;
      inerted.push(node);
    });

    const metrics = { vh: 0, textH: 1, padTop: 24, padBottom: 24 };
    const measure = () => {
      const rem = Number.parseFloat(getComputedStyle(html).fontSize) || 16;
      const inset = Math.min(3.25 * rem, Math.max(1.5 * rem, root.clientHeight * 0.055));
      const safeTop = safeTopRef.current?.offsetHeight ?? 0;
      const safeBottom = safeBottomRef.current?.offsetHeight ?? 0;
      metrics.vh = root.clientHeight;
      metrics.textH = Math.max(darkWrap.offsetHeight, 1);
      metrics.padTop = Math.max(inset, safeTop + 1.5 * rem);
      metrics.padBottom = Math.max(inset, safeBottom + rem);
    };

    const wraps = [darkWrap, lightWrap];
    let shown = -1;
    let lastP = 0;
    let tracking = true;

    const render = (progress: number) => {
      const p = gsap.utils.clamp(0, 1, progress);
      lastP = p;
      const { vh, textH, padTop, padBottom } = metrics;
      const waterline = (1 - p) * vh;
      const minY = padTop;
      const maxY = Math.max(minY, vh - textH - padBottom);
      const y = gsap.utils.clamp(minY, maxY, waterline - textH / 2);

      gsap.set(wraps, { y });

      const edge = waterline - y;
      const overlaps = edge > 0 && edge < textH;
      gsap.set(sheet, { y: overlaps ? waterline - 1 : waterline });

      const insetPx = gsap.utils.clamp(0, textH, overlaps ? edge - 1 : edge);
      gsap.set(light, {
        clipPath:
          insetPx <= 0 ? "none" : `inset(${(insetPx / textH) * 100}% 0 0 0)`,
      });

      const label = Math.round(p * 100);
      if (label === shown) return;
      shown = label;
      const text = `${label}%`;
      dark.textContent = text;
      light.textContent = text;
      root.setAttribute("aria-valuenow", String(label));
    };

    const centerLogo = () => {
      const height = logo.offsetHeight || 0;
      return (root.clientHeight - height) / 2 + height * LOGO_INK_NUDGE;
    };

    let localZone = detectVisitorTimeZone();
    let timeAnchor: TimeAnchor | null = null;
    let source: "pending" | "api" | "error" = "pending";

    const paintTimes = () => {
      const date = source === "api" ? instantToDate(timeAnchor) : new Date();
      clocks.dataset.timeSource = source;
      const nodes = root.querySelectorAll<HTMLElement>("[data-timezone]");
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const zone = node.dataset.timezone;
        if (!zone) continue;
        if (source === "pending") {
          paintClock(node, CLOCK_TIME_PLACEHOLDER);
          continue;
        }
        const timeZone = zone === "local" ? localZone : zone;
        paintClock(node, formatClockTime(timeZone, date));
      }
    };
    paintTimes();
    const clockTimer = window.setInterval(paintTimes, 1000);

    const abort = new AbortController();
    const failTime = () => {
      if (source === "api") return;
      source = "error";
      paintTimes();
    };
    const syncTime = async () => {
      try {
        const response = await fetch(`/api/time?local=${encodeURIComponent(localZone)}`, {
          signal: abort.signal,
        });
        if (!response.ok) {
          failTime();
          return;
        }
        const body: unknown = await response.json();
        if (!isTimeResponse(body)) {
          failTime();
          return;
        }
        const localClock = body.clocks.find((clock) => clock.name === "Local Time");
        if (localClock) localZone = localClock.timezone;
        timeAnchor = { instant: body.instant, receivedAt: Date.now() };
        source = "api";
        paintTimes();
      } catch {
        if (abort.signal.aborted) return;
        failTime();
      }
    };
    void syncTime();

    let settled = false;
    let released = false;
    const percentExitY = () => -(metrics.textH + 48);
    const placeFinal = () => {
      gsap.set(sheet, { y: 0 });
      gsap.set(wraps, { y: percentExitY(), autoAlpha: 0 });
      gsap.set(logo, { yPercent: 0, y: centerLogo() });
      gsap.set(clocks, { y: 0 });
    };

    const releaseScroll = () => {
      if (released) return;
      released = true;

      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.overscroll;
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.bodyPaddingRight;
      inerted.forEach((node) => {
        node.inert = false;
      });
      root.classList.remove("touch-none");

      html.dataset.loaderSettled = "true";
      window.dispatchEvent(new CustomEvent("portfolio-loader:settled"));
    };

    const settleReducedMotion = () => {
      root.dataset.reducedMotion = "true";
      html.dataset.loaderReduced = "true";
      root.classList.remove("fixed");
      root.style.position = "relative";
      root.style.height = "100dvh";
      releaseScroll();
    };

    const ctx = gsap.context(() => {
      gsap.set(wraps, { top: 0, bottom: "auto" });
      measure();
      render(0);
      gsap.set(logo, { yPercent: -120, y: 0 });
      gsap.set(clocks, { y: root.clientHeight });

      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

      const onResize = () => {
        if (!root.isConnected) return;
        measure();
        if (motion.matches || settled) {
          placeFinal();
          return;
        }
        if (tracking) render(lastP);
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        tracking = false;
        settled = true;
        placeFinal();
        root.setAttribute("role", "region");
        root.setAttribute("aria-label", "YKSH");
        root.removeAttribute("aria-valuemin");
        root.removeAttribute("aria-valuemax");
        root.removeAttribute("aria-valuenow");
        settleReducedMotion();
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const proxy = { p: 0 };
        const tl = gsap.timeline();

        tl.to(proxy, {
          p: 1,
          duration: 2.6,
          ease: "power2.inOut",
          onUpdate: () => render(proxy.p),
          onComplete: () => render(1),
        });

        tl.add("hold", "+=0.42");
        tl.add(() => {
          tracking = false;
        }, "hold");

        tl.to(
          wraps,
          {
            y: percentExitY,
            duration: PERCENT_EXIT_DURATION,
            ease: "power2.inOut",
            onComplete: () => gsap.set(wraps, { autoAlpha: 0 }),
          },
          "hold",
        );

        tl.add("reveal", "hold");

        tl.fromTo(
          logo,
          { yPercent: -120, y: 0 },
          {
            yPercent: 0,
            y: centerLogo,
            duration: REVEAL_DURATION,
            ease: REVEAL_EASE,
            immediateRender: false,
          },
          "reveal",
        );

        tl.fromTo(
          clocks,
          { y: () => root.clientHeight },
          {
            y: 0,
            duration: REVEAL_DURATION,
            ease: REVEAL_EASE,
            immediateRender: false,
          },
          "reveal",
        );

        tl.add(() => {
          settled = true;
          root.setAttribute("role", "region");
          root.setAttribute("aria-label", "YKSH");
          root.removeAttribute("aria-valuemin");
          root.removeAttribute("aria-valuemax");
          root.removeAttribute("aria-valuenow");
          releaseScroll();
        }, `reveal+=${REVEAL_DURATION}`);
      });

      window.addEventListener("resize", onResize);
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(root);
      document.fonts.ready.then(onResize).catch(() => undefined);

      return () => {
        window.removeEventListener("resize", onResize);
        resizeObserver.disconnect();
      };
    }, root);

    return () => {
      abort.abort();
      window.clearInterval(clockTimer);
      if (!released) {
        html.style.overflow = previous.htmlOverflow;
        html.style.overscrollBehavior = previous.overscroll;
        body.style.overflow = previous.bodyOverflow;
        body.style.paddingRight = previous.bodyPaddingRight;
        inerted.forEach((node) => {
          node.inert = false;
        });
      }
      ctx.revert();
    };
  }, []);

  const anchor = "absolute will-change-transform";
  const anchorStyle = {
    left: "clamp(1.35rem, 4.6vw, 3.15rem)",
    bottom: "max(clamp(1.5rem, 5.5dvh, 3.25rem), env(safe-area-inset-bottom, 0px))",
  };

  return (
    <div
      ref={rootRef}
      id="portfolio-loader"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      aria-label="Loading"
      className="fixed top-0 left-0 z-[200] h-dvh w-full touch-none overflow-hidden select-none"
      style={{ backgroundColor: PAPER }}
    >
      <span
        ref={safeTopRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 block h-[env(safe-area-inset-top,0px)] w-px"
      />
      <span
        ref={safeBottomRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 block h-[env(safe-area-inset-bottom,0px)] w-px"
      />
      <div aria-hidden="true" className="absolute inset-0">
        <div ref={darkWrapRef} className={`z-10 ${anchor}`} style={anchorStyle}>
          <span ref={darkRef} className={percentClass} style={{ color: INK }}>
            0%
          </span>
        </div>
        <div
          ref={sheetRef}
          className="absolute inset-0 z-20 will-change-transform"
          style={{ backgroundColor: INK, transform: "translate3d(0, 100%, 0)" }}
        />
        <div ref={lightWrapRef} className={`z-30 ${anchor}`} style={anchorStyle}>
          <span
            ref={lightRef}
            className={percentClass}
            style={{ color: PAPER, clipPath: "inset(100% 0 0 0)" }}
          >
            0%
          </span>
        </div>
      </div>
      <div
        ref={logoRef}
        className="absolute top-0 left-0 z-40 flex w-full justify-center will-change-transform"
        style={{ transform: "translate3d(0, -120%, 0)" }}
      >
        <p className={`m-0 ${logoClass}`} style={{ color: PAPER }}>
          YKSH
        </p>
      </div>
      <div
        ref={clocksRef}
        className="absolute right-0 left-0 z-40 flex justify-center px-[clamp(0.75rem,3vw,2rem)] will-change-transform"
        style={{
          bottom: "max(clamp(2.75rem, 14vh, 9.5rem), env(safe-area-inset-bottom, 0px))",
          transform: "translate3d(0, 100vh, 0)",
        }}
      >
        <ul className="m-0 flex w-full max-w-[44rem] list-none items-stretch justify-center gap-[clamp(0.3rem,0.85vw,0.7rem)] p-0">
          {CLOCKS.map((clock) => {
            const zone = clockZone(clock.name, clock.timezone);
            return (
              <li
                key={clock.name}
                aria-label={`${clock.name}, ${CLOCK_TIME_PLACEHOLDER}`}
                className="yksh-clock flex min-w-0 flex-1 flex-col items-center justify-center rounded-[14px] border border-white/[0.16] px-[clamp(0.25rem,0.7vw,0.75rem)] py-[clamp(0.55rem,1.15vw,0.85rem)] text-center backdrop-blur-xl"
              >
                <span
                  aria-hidden="true"
                  className="font-sans text-[clamp(0.5rem,1.15vw,0.78rem)] leading-tight whitespace-nowrap text-white/60"
                >
                  {clock.name}
                </span>
                <ClockTime timeZone={zone} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** The intro belongs to the home page only. Other routes (case studies) load straight in. */
export function PortfolioLoader() {
  return usePathname() === "/" ? <HomeLoader /> : null;
}
