"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { FiCheck } from "react-icons/fi";
import { SectionHeader } from "@/design/SectionHeader";
import { Reveal } from "@/animations/Reveal";
import { TextReveal } from "@/animations/TextReveal";
import { LenisContext } from "@/landingPage/providers/LenisProvider";

type RevealStyle = "fade-up" | "blur-in" | "mask-sweep" | "wave" | "scale-char";

type ReasonBlock =
  | { type: "text"; value: string }
  | { type: "list"; items: string[] };

interface ReasonGradient {
  from: string;
  via: string;
  to: string;
}

interface Reason {
  number: string;
  title: string;
  hook: string;
  blocks: ReasonBlock[];
  gradient: ReasonGradient;
  hookRevealStyle: RevealStyle;
}

const reasons: Reason[] = [
  {
    number: "01",
    title: "Accountable to Revenue",
    hook: "We’re accountable to revenue, not activity.",
    blocks: [
      { type: "text", value: "Most agencies report:" },
      { type: "list", items: ["emails sent", "replies", "meetings"] },
      { type: "text", value: "We focus on:" },
      {
        type: "text",
        value: "pipeline created, deals progressed, and revenue generated.",
      },
    ],
    gradient: { from: "#22d3ee", via: "#3b82f6", to: "#6366f1" },
    hookRevealStyle: "blur-in",
  },
  {
    number: "02",
    title: "No Deal Left Behind",
    hook: "We don’t stop at meetings.",
    blocks: [
      { type: "text", value: "Most outbound breaks after booking." },
      {
        type: "list",
        items: [
          "track every opportunity",
          "follow up automatically",
          "re-engage stalled deals",
        ],
      },
      {
        type: "text",
        value:
          "No deal is left to die in your pipeline and waste what you’ve invested in.",
      },
    ],
    gradient: { from: "#34d399", via: "#14b8a6", to: "#06b6d4" },
    hookRevealStyle: "fade-up",
  },
  {
    number: "03",
    title: "Systems Over Campaigns",
    hook: "System, not campaigns.",
    blocks: [
      { type: "text", value: "Others run campaigns." },
      {
        type: "list",
        items: [
          "inbound capture",
          "outbound generation",
          "deal follow-up",
          "pipeline tracking",
        ],
      },
      {
        type: "text",
        value: "One system that continuously generates and converts pipeline.",
      },
    ],
    gradient: { from: "#a78bfa", via: "#8b5cf6", to: "#6366f1" },
    hookRevealStyle: "mask-sweep",
  },
  {
    number: "04",
    title: "ROI Before Scale",
    hook: "ROI before scale.",
    blocks: [
      { type: "text", value: "We validate pipeline before scaling engagement." },
      {
        type: "list",
        items: [
          "Start with controlled volume",
          "Prove opportunity flow",
          "Then scale into full system",
        ],
      },
      { type: "text", value: "This sounds:" },
      { type: "list", items: ["credible", "safe", "professional"] },
    ],
    gradient: { from: "#fbbf24", via: "#fb923c", to: "#f43f5e" },
    hookRevealStyle: "scale-char",
  },
  {
    number: "05",
    title: "Built for High-Value Deals",
    hook: "Built for high-value deals.",
    blocks: [
      { type: "text", value: "We’re not designed for:" },
      { type: "list", items: ["low-ticket sales", "transactional funnels"] },
      {
        type: "text",
        value: "This is built for companies where each deal matters.",
      },
    ],
    gradient: { from: "#c084fc", via: "#e879f9", to: "#fb7185" },
    hookRevealStyle: "blur-in",
  },
];

const REASON_COUNT = reasons.length;

const WHY_SCROLL_CONFIG = {
  activationTolerancePx: 8,
  activationZonePx: 120,
  wheelDistanceFactor: 0.78,
  smoothingFactor: 0.065,
  settleThresholdPx: 0.3,
  activeProbeRatio: 0.5,
  trailingViewportRatio: 0.34,
  boundaryTolerancePx: 2,
} as const;

interface ScrollMetrics {
  maxHorizontalOffset: number;
  viewportWidth: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function WhyUs() {
  const lenisRef = useContext(LenisContext);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    );
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const activeIdxRef = useRef(0);
  const currentOffsetRef = useRef(0);
  const targetOffsetRef = useRef(0);
  const isLockedRef = useRef(false);
  const isSnappingRef = useRef(false);
  const releaseDirectionRef = useRef<-1 | 0 | 1>(0);
  const animationFrameRef = useRef<number | null>(null);
  const savedOverflowRef = useRef<{
    htmlOverflow: string;
    bodyOverflow: string;
    bodyTouchAction: string;
    bodyPaddingRight: string;
    htmlPaddingRight: string;
  } | null>(null);
  const scrollMetricsRef = useRef<ScrollMetrics>({
    maxHorizontalOffset: 0,
    viewportWidth: 0,
  });

  useEffect(() => {
    if (!isDesktop) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cancelTrackAnimation = () => {
      if (animationFrameRef.current === null) return;
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    };

    const lockVerticalScroll = () => {
      if (isLockedRef.current) return;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      savedOverflowRef.current = {
        htmlOverflow: document.documentElement.style.overflow,
        bodyOverflow: document.body.style.overflow,
        bodyTouchAction: document.body.style.touchAction,
        bodyPaddingRight: document.body.style.paddingRight,
        htmlPaddingRight: document.documentElement.style.paddingRight,
      };
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      if (scrollbarWidth > 0) {
        document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      lenisRef?.current?.stop();
      isLockedRef.current = true;
    };

    const unlockVerticalScroll = (deltaY?: number) => {
      if (!isLockedRef.current) return;
      if (savedOverflowRef.current) {
        document.documentElement.style.overflow =
          savedOverflowRef.current.htmlOverflow;
        document.body.style.overflow = savedOverflowRef.current.bodyOverflow;
        document.body.style.touchAction =
          savedOverflowRef.current.bodyTouchAction;
        document.documentElement.style.paddingRight =
          savedOverflowRef.current.htmlPaddingRight;
        document.body.style.paddingRight =
          savedOverflowRef.current.bodyPaddingRight;
      } else {
        document.documentElement.style.removeProperty("overflow");
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("touch-action");
        document.documentElement.style.removeProperty("padding-right");
        document.body.style.removeProperty("padding-right");
      }
      savedOverflowRef.current = null;
      lenisRef?.current?.start();
      isLockedRef.current = false;
      if (!deltaY || !Number.isFinite(deltaY)) return;
      const exitDirection = Math.sign(deltaY);
      const exitDistance = window.innerHeight * 0.5;
      isSnappingRef.current = true;
      window.requestAnimationFrame(() => {
        lenisRef?.current?.scrollTo(
          window.scrollY + exitDirection * exitDistance,
          {
            duration: 0.9,
            easing: (t: number) => 1 - Math.pow(1 - t, 4),
            force: true,
            onComplete: () => {
              isSnappingRef.current = false;
            },
          },
        );
      });
    };

    const resolveActiveIdx = (
      horizontalOffset: number,
      viewportWidth: number,
    ) => {
      const probe =
        horizontalOffset + viewportWidth * WHY_SCROLL_CONFIG.activeProbeRatio;
      let closestIdx = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - probe);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIdx = index;
        }
      });
      return closestIdx;
    };

    const renderTrackPosition = (horizontalOffset: number) => {
      track.style.transform = `translate3d(${-horizontalOffset}px, 0, 0)`;
      const { viewportWidth } = scrollMetricsRef.current;
      const nextIdx = resolveActiveIdx(horizontalOffset, viewportWidth);
      if (nextIdx !== activeIdxRef.current) {
        activeIdxRef.current = nextIdx;
      }
    };

    const animateTrack = () => {
      const delta = targetOffsetRef.current - currentOffsetRef.current;
      if (Math.abs(delta) <= WHY_SCROLL_CONFIG.settleThresholdPx) {
        currentOffsetRef.current = targetOffsetRef.current;
        renderTrackPosition(currentOffsetRef.current);
        animationFrameRef.current = null;
        return;
      }
      currentOffsetRef.current += delta * WHY_SCROLL_CONFIG.smoothingFactor;
      renderTrackPosition(currentOffsetRef.current);
      animationFrameRef.current = window.requestAnimationFrame(animateTrack);
    };

    const startTrackAnimation = () => {
      if (animationFrameRef.current !== null) return;
      animationFrameRef.current = window.requestAnimationFrame(animateTrack);
    };

    const isSectionFullyVisible = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const tolerance = WHY_SCROLL_CONFIG.activationTolerancePx;
      return (
        Math.abs(rect.top) <= tolerance &&
        Math.abs(rect.bottom - viewportHeight) <= tolerance
      );
    };

    const isInTakeoverZone = (deltaY: number) => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const zone = WHY_SCROLL_CONFIG.activationZonePx;
      if (deltaY > 0)
        return rect.top <= zone && rect.bottom > viewportHeight * 0.55;
      return (
        rect.bottom >= viewportHeight - zone &&
        rect.top < viewportHeight * 0.45
      );
    };

    const snapSectionIntoView = () => {
      const sectionTop = window.scrollY + section.getBoundingClientRect().top;
      if (Math.abs(window.scrollY - sectionTop) < 2) {
        isSnappingRef.current = false;
        lockVerticalScroll();
        return;
      }
      isSnappingRef.current = true;
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(sectionTop, {
          duration: 0.72,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
          onComplete: () => {
            isSnappingRef.current = false;
            lockVerticalScroll();
          },
        });
        return;
      }
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
      isSnappingRef.current = false;
      lockVerticalScroll();
    };

    const updateLayout = () => {
      const viewportWidth = window.innerWidth;
      const maxHorizontalOffset = Math.max(
        track.scrollWidth - viewportWidth,
        0,
      );
      const clampedOffset = clamp(
        targetOffsetRef.current,
        0,
        maxHorizontalOffset,
      );
      scrollMetricsRef.current = { maxHorizontalOffset, viewportWidth };
      cancelTrackAnimation();
      currentOffsetRef.current = clampedOffset;
      targetOffsetRef.current = clampedOffset;
      renderTrackPosition(clampedOffset);
    };

    const onWheel = (event: WheelEvent) => {
      const { maxHorizontalOffset } = scrollMetricsRef.current;
      if (maxHorizontalOffset <= 0) return;
      const delta = event.deltaMode === 1 ? event.deltaY * 32 : event.deltaY;
      if (!Number.isFinite(delta) || Math.abs(delta) < 0.5) return;
      if (isSnappingRef.current) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return;
      }
      const direction = delta > 0 ? 1 : -1;
      if (
        releaseDirectionRef.current !== 0 &&
        releaseDirectionRef.current !== direction
      ) {
        releaseDirectionRef.current = 0;
      }
      const isAtBoundary =
        direction > 0
          ? targetOffsetRef.current >=
            maxHorizontalOffset - WHY_SCROLL_CONFIG.boundaryTolerancePx
          : targetOffsetRef.current <= WHY_SCROLL_CONFIG.boundaryTolerancePx;
      if (releaseDirectionRef.current === direction && isAtBoundary) return;
      if (!isLockedRef.current && isInTakeoverZone(delta)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        snapSectionIntoView();
        return;
      }
      const shouldTakeOverScroll = isLockedRef.current || isSectionFullyVisible();
      if (!shouldTakeOverScroll) return;
      if (isAtBoundary) {
        releaseDirectionRef.current = direction;
        unlockVerticalScroll(delta);
        return;
      }
      lockVerticalScroll();
      releaseDirectionRef.current = 0;
      const nextOffset = clamp(
        targetOffsetRef.current + delta * WHY_SCROLL_CONFIG.wheelDistanceFactor,
        0,
        maxHorizontalOffset,
      );
      if (nextOffset === targetOffsetRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      targetOffsetRef.current = nextOffset;
      startTrackAnimation();
    };

    updateLayout();
    const layoutRefreshTimeout = window.setTimeout(updateLayout, 0);
    window.addEventListener("resize", updateLayout);
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });

    return () => {
      unlockVerticalScroll();
      cancelTrackAnimation();
      window.clearTimeout(layoutRefreshTimeout);
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("wheel", onWheel, true);
    };
  }, [lenisRef, isDesktop]);

  if (!isDesktop) {
    return (
      <section className="relative py-28 sm:py-36">
        <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
          <SectionHeader
            kicker="Why Ascendly"
            title="Why you should choose"
            highlight="Ascendly:"
            align="left"
            size="lg"
          />

          <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-2">
            {reasons.map((reason, index) => {
              const gradientText = `linear-gradient(120deg, ${reason.gradient.from} 0%, ${reason.gradient.via} 50%, ${reason.gradient.to} 100%)`;
              const gradientSoft = `linear-gradient(135deg, ${reason.gradient.from} 0%, ${reason.gradient.via} 50%, ${reason.gradient.to} 100%)`;
              return (
                <Reveal key={reason.number} direction="up" delay={index * 0.05}>
                  <article className="relative h-full overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.025] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-7">
                    <div
                      className="pointer-events-none absolute -top-20 -left-10 h-56 w-56 rounded-full opacity-30 blur-[90px]"
                      style={{ background: reason.gradient.from }}
                      aria-hidden
                    />
                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-[0.78rem] font-semibold tracking-[0.28em]"
                          style={{
                            backgroundImage: gradientText,
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent",
                          }}
                        >
                          {reason.number}
                        </span>
                        <span
                          className="h-px w-10"
                          style={{ background: gradientSoft }}
                          aria-hidden
                        />
                        <span className="text-[0.62rem] uppercase tracking-[0.32em] text-white/44">
                          {reason.title}
                        </span>
                      </div>

                      <h4 className="mt-5 text-[1.28rem] font-semibold leading-[1.2] tracking-[-0.025em] text-white">
                        {reason.hook}
                      </h4>

                      <div className="mt-4 space-y-3">
                        {reason.blocks.map((block, blockIndex) => {
                          if (block.type === "text") {
                            return (
                              <p
                                key={`${reason.number}-text-${blockIndex}`}
                                className="text-[0.95rem] leading-[1.7] text-white/60"
                              >
                                {block.value}
                              </p>
                            );
                          }
                          return (
                            <ul
                              key={`${reason.number}-list-${blockIndex}`}
                              className="space-y-2.5"
                            >
                              {block.items.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                  <motion.span
                                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border"
                                    style={{
                                      borderColor: `${reason.gradient.via}55`,
                                      background: `${reason.gradient.via}18`,
                                      color: reason.gradient.via,
                                    }}
                                    aria-hidden
                                  >
                                    <FiCheck className="h-3 w-3" strokeWidth={3} />
                                  </motion.span>
                                  <span className="text-[0.95rem] leading-[1.65] text-white/74">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          );
                        })}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#05060a]"
      aria-label="Why Ascendly"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(15,22,38,0.55) 0%, rgba(5,6,10,0.9) 55%, rgba(5,6,10,1) 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
        aria-hidden
      />

      <div className="absolute left-0 right-0 top-0 z-30 px-8 pt-22 sm:px-14">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-1.5 rounded-full bg-cyan-300/80" />
          <span className="text-[0.68rem] uppercase tracking-[0.32em] text-white/42">
            Why Ascendly
          </span>
        </div>
        {/* <h2 className="mt-4 max-w-[24ch] text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white">
          Why you should choose{" "}
          <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-violet-300 bg-clip-text text-transparent">
            Ascendly:
          </span>
        </h2> */}
      </div>

      <div className="absolute inset-0 z-20 overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full w-max items-center gap-0 pb-16 pt-48 will-change-transform sm:pb-20 sm:pt-56"
        >
          {reasons.map((reason, index) => {
            const gradientText = `linear-gradient(120deg, ${reason.gradient.from} 0%, ${reason.gradient.via} 50%, ${reason.gradient.to} 100%)`;
            const gradientSoft = `linear-gradient(135deg, ${reason.gradient.from} 0%, ${reason.gradient.via} 50%, ${reason.gradient.to} 100%)`;

            return (
              <article
                key={reason.number}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className="relative flex h-[min(78vh,44rem)] w-screen shrink-0 flex-col justify-center px-10 sm:px-20 lg:px-32"
              >
                <div
                  className="pointer-events-none absolute -top-[10%] left-[-2%] h-144 w-xl rounded-full opacity-[0.18] blur-[160px]"
                  style={{ background: reason.gradient.from }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute bottom-[-12%] right-[-4%] h-160 w-160 rounded-full opacity-[0.14] blur-[180px]"
                  style={{ background: reason.gradient.to }}
                  aria-hidden
                />

                <div
                  className="pointer-events-none absolute -right-[2%] top-[5%] select-none text-[clamp(20rem,38vw,52rem)] font-semibold leading-[0.75] tracking-[-0.08em] opacity-[0.05]"
                  style={{
                    backgroundImage: gradientText,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                  aria-hidden
                >
                  {reason.number}
                </div>

                <div className="relative max-w-4xl">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[0.78rem] font-semibold tracking-[0.28em]"
                      style={{
                        backgroundImage: gradientText,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {reason.number}
                    </span>
                    <span
                      className="h-px w-12"
                      style={{ background: gradientSoft }}
                      aria-hidden
                    />
                    <span className="text-[0.66rem] uppercase tracking-[0.32em] text-white/44">
                      {reason.title}
                    </span>
                  </div>

                  <TextReveal
                    as="div"
                    splitBy="word"
                    style={reason.hookRevealStyle}
                    className="mt-6 text-[clamp(2.4rem,5.5vw,5.8rem)] font-semibold leading-[0.93] tracking-[-0.065em] text-white"
                  >
                    {reason.hook}
                  </TextReveal>

                  <Reveal delay={0.1} direction="up" amount={0.3}>
                    <div
                      className="mt-8 h-[2px] w-24 rounded-full"
                      style={{ background: gradientSoft }}
                      aria-hidden
                    />
                  </Reveal>

                  <div className="mt-8 max-w-176 space-y-5">
                    {reason.blocks.map((block, blockIndex) => {
                      if (block.type === "text") {
                        return (
                          <Reveal
                            key={`${reason.number}-text-${blockIndex}`}
                            delay={0.14 + blockIndex * 0.06}
                            direction="up"
                            amount={0.22}
                          >
                            <p className="text-[clamp(1rem,1.35vw,1.16rem)] leading-[1.75] text-white/62">
                              {block.value}
                            </p>
                          </Reveal>
                        );
                      }

                      return (
                        <Reveal
                          key={`${reason.number}-list-${blockIndex}`}
                          delay={0.16 + blockIndex * 0.06}
                          direction="up"
                          amount={0.2}
                        >
                          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {block.items.map((item, itemIndex) => (
                              <li
                                key={item}
                                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3"
                                style={{
                                  animationDelay: `${itemIndex * 40}ms`,
                                }}
                              >
                                <motion.span
                                  whileHover={{ scale: 1.12, rotate: 8 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 320,
                                    damping: 20,
                                  }}
                                  className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
                                  style={{
                                    borderColor: `${reason.gradient.via}55`,
                                    background: `${reason.gradient.via}18`,
                                    color: reason.gradient.via,
                                    boxShadow: `0 0 18px ${reason.gradient.via}30`,
                                  }}
                                  aria-hidden
                                >
                                  <FiCheck className="h-3.5 w-3.5" strokeWidth={3} />
                                </motion.span>
                                <span className="text-[0.98rem] leading-[1.55] text-white/74">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>

                {index < REASON_COUNT - 1 ? (
                  <div
                    className="pointer-events-none absolute right-0 top-[20%] bottom-[20%] w-px"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)",
                    }}
                    aria-hidden
                  />
                ) : null}
              </article>
            );
          })}

          <div
            aria-hidden
            className="shrink-0"
            style={{ width: `${WHY_SCROLL_CONFIG.trailingViewportRatio * 100}vw` }}
          />
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
