"use client";

import { useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Reveal } from "@/animations/Reveal";
import { TextReveal } from "@/animations/TextReveal";
import { LenisContext } from "@/landingPage/providers/LenisProvider";

const Particles = dynamic(() => import("@/landingPage/components/Particles"), {
  ssr: false,
});

type RevealStyle = "fade-up" | "blur-in" | "mask-sweep" | "wave" | "scale-char";

interface FeatureGradient {
  from: string;
  via: string;
  to: string;
}

interface Feature {
  number: string;
  title: string;
  hook: string;
  paragraphs: string[];
  focusLine?: string;
  proofLine?: string;
  gradient: FeatureGradient;
  hookRevealStyle: RevealStyle;
}

const features: Feature[] = [
  {
    number: "01",
    title: "Inbound Capture System",
    hook: "Never miss a high-intent lead again",
    paragraphs: [
      "Your best leads are already interacting with your business. Visiting your site, checking your pricing, engaging on LinkedIn. Most companies never see this in time.",
      "We build a system that identifies those people, enriches them, and routes them into outreach automatically. Within minutes, not days.",
      "By the time someone else is manually checking forms or inboxes, you've already reached out.",
    ],
    focusLine: "Small gap. Big difference.",
    proofLine:
      "Website visitors are identified and routed into your system within ~15 minutes.",
    gradient: { from: "#22d3ee", via: "#3b82f6", to: "#6366f1" },
    hookRevealStyle: "blur-in",
  },
  {
    number: "02",
    title: "Lead Qualification Framework",
    hook: "More meetings doesn't fix pipeline. Better meetings do.",
    paragraphs: [
      "Most pipelines are inflated with low-quality calls that were never going to close.",
      "We filter that out before it ever hits your calendar.",
      "Every lead is enriched with context. Company size, role relevance, buying signals. Then it's scored and prioritised so you only speak to people who actually make sense.",
    ],
    focusLine: "This is where conversion starts, not after the call.",
    gradient: { from: "#a78bfa", via: "#d946ef", to: "#ec4899" },
    hookRevealStyle: "fade-up",
  },
  {
    number: "03",
    title: "Smart Routing Engine",
    hook: "Some prospects reply to email. Others ignore it completely but respond instantly on LinkedIn.",
    paragraphs: [
      "Instead of guessing, we run both in parallel and let the system do the work.",
      "Email sequences and LinkedIn touchpoints are coordinated, not separate. Leads are routed based on behaviour, profile, and engagement.",
    ],
    focusLine: "That alone lifts response rates without increasing volume.",
    proofLine:
      "3-step email + 4-touch LinkedIn sequences running together, not in isolation.",
    gradient: { from: "#38bdf8", via: "#6366f1", to: "#a855f7" },
    hookRevealStyle: "mask-sweep",
  },
  {
    number: "04",
    title: "Outbound Pipeline Engine",
    hook: "This is where consistency comes from",
    paragraphs: [
      "Outbound fails when it's treated like a campaign. It works when it's treated like infrastructure.",
      "We don't send blasts. We build a system that runs every day.",
      "Lists are enriched continuously. Signals are monitored. Outreach is personalised and sequenced properly. Replies are handled instantly.",
    ],
    focusLine: "The result is simple. Pipeline doesn't spike. It flows.",
    proofLine:
      "Positive replies are responded to with booking links in ~60 seconds.",
    gradient: { from: "#34d399", via: "#14b8a6", to: "#06b6d4" },
    hookRevealStyle: "scale-char",
  },
  {
    number: "05",
    title: "AI-Powered Deal Follow-Up",
    hook: "The deal doesn't end when the call does",
    paragraphs: [
      "Most teams lose deals in the gap between conversations.",
      "One follow-up. Then nothing.",
      "We remove that gap completely.",
      "Every call is recorded and analysed. Interest level, objections, timeline, next steps. Then a personalised follow-up is drafted within minutes, based on the actual conversation.",
    ],
    focusLine: "Nothing generic. Nothing forgotten.",
    proofLine: "Follow-up is ready within ~2 minutes of the call ending.",
    gradient: { from: "#fbbf24", via: "#fb923c", to: "#f43f5e" },
    hookRevealStyle: "blur-in",
  },
  {
    number: "06",
    title: "Stale Deal Reactivation",
    hook: "Most deals don't say no. They just disappear.",
    paragraphs: [
      "That's usually where revenue is lost.",
      "We track every open deal daily. When something changes, hiring, funding, activity, the system triggers re-engagement automatically.",
      "The timing is what matters. Not the message.",
    ],
    focusLine: "Deals you thought were gone come back into play.",
    gradient: { from: "#60a5fa", via: "#818cf8", to: "#c084fc" },
    hookRevealStyle: "fade-up",
  },
  {
    number: "07",
    title: "Live Pipeline Visibility",
    hook: "You shouldn't have to ask what's going on",
    paragraphs: [
      "Everything sits in one place. Every deal, every stage, every next step.",
      "Calls update the pipeline automatically. Follow-ups are logged. Status changes happen in real time.",
      "No chasing updates. No fragmented tools.",
    ],
    focusLine: "Just a clear view of what's moving and what's stuck.",
    proofLine: "Shared Notion pipeline with full visibility across all deals.",
    gradient: { from: "#c084fc", via: "#e879f9", to: "#fb7185" },
    hookRevealStyle: "mask-sweep",
  },
  {
    number: "08",
    title: "Revenue Attribution & ROI Tracking",
    hook: "Most agencies report activity. Emails sent. Replies. Meetings.",
    paragraphs: [
      "That's not what matters.",
      "We track what those meetings turn into. Pipeline created. Deals progressed. Revenue generated.",
      "You can see exactly what this system is producing, not just what it's doing.",
    ],
    focusLine: "And that changes how you make decisions.",
    gradient: { from: "#fde047", via: "#fb923c", to: "#dc2626" },
    hookRevealStyle: "blur-in",
  },
];

const FEATURE_COUNT = features.length;

const FEATURES_SCROLL_CONFIG = {
  activationTolerancePx: 8,
  activationZonePx: 120,
  wheelDistanceFactor: 0.78,
  smoothingFactor: 0.065,
  settleThresholdPx: 0.3,
  activeProbeRatio: 0.5,
  trailingViewportRatio: 0.34,
  boundaryTolerancePx: 2,
  releaseNudgePx: 12,
} as const;

interface ScrollMetrics {
  maxHorizontalOffset: number;
  viewportWidth: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function Features() {
  const lenisRef = useContext(LenisContext);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
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
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
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
        document.documentElement.style.overflow = savedOverflowRef.current.htmlOverflow;
        document.body.style.overflow = savedOverflowRef.current.bodyOverflow;
        document.body.style.touchAction = savedOverflowRef.current.bodyTouchAction;
        document.documentElement.style.paddingRight = savedOverflowRef.current.htmlPaddingRight;
        document.body.style.paddingRight = savedOverflowRef.current.bodyPaddingRight;
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

    const resolveActiveIdx = (horizontalOffset: number, viewportWidth: number) => {
      const probe = horizontalOffset + viewportWidth * FEATURES_SCROLL_CONFIG.activeProbeRatio;
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
      if (Math.abs(delta) <= FEATURES_SCROLL_CONFIG.settleThresholdPx) {
        currentOffsetRef.current = targetOffsetRef.current;
        renderTrackPosition(currentOffsetRef.current);
        animationFrameRef.current = null;
        return;
      }
      currentOffsetRef.current += delta * FEATURES_SCROLL_CONFIG.smoothingFactor;
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
      const tolerance = FEATURES_SCROLL_CONFIG.activationTolerancePx;
      return Math.abs(rect.top) <= tolerance && Math.abs(rect.bottom - viewportHeight) <= tolerance;
    };

    const isInTakeoverZone = (deltaY: number) => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const zone = FEATURES_SCROLL_CONFIG.activationZonePx;
      if (deltaY > 0) return rect.top <= zone && rect.bottom > viewportHeight * 0.55;
      return rect.bottom >= viewportHeight - zone && rect.top < viewportHeight * 0.45;
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
      const maxHorizontalOffset = Math.max(track.scrollWidth - viewportWidth, 0);
      const clampedOffset = clamp(targetOffsetRef.current, 0, maxHorizontalOffset);
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
      if (releaseDirectionRef.current !== 0 && releaseDirectionRef.current !== direction) {
        releaseDirectionRef.current = 0;
      }
      const isAtBoundary =
        direction > 0
          ? targetOffsetRef.current >= maxHorizontalOffset - FEATURES_SCROLL_CONFIG.boundaryTolerancePx
          : targetOffsetRef.current <= FEATURES_SCROLL_CONFIG.boundaryTolerancePx;
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
        targetOffsetRef.current + delta * FEATURES_SCROLL_CONFIG.wheelDistanceFactor,
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
      <section
        id="systems"
        className="section-perf-skip relative overflow-hidden bg-[#05060a] py-24"
      >
        <div className="relative mx-auto w-full max-w-[1220px] px-6 sm:px-8">
          <span className="text-[0.68rem] uppercase tracking-[0.32em] text-white/38">
            Primary Features
          </span>
          <div className="mt-10 space-y-16">
            {features.map((feature) => {
              const gradientText = `linear-gradient(120deg, ${feature.gradient.from} 0%, ${feature.gradient.via} 50%, ${feature.gradient.to} 100%)`;
              const gradientSoft = `linear-gradient(135deg, ${feature.gradient.from} 0%, ${feature.gradient.via} 50%, ${feature.gradient.to} 100%)`;
              return (
                <article key={feature.number} className="relative">
                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-[1rem] font-semibold tracking-[0.2em]"
                      style={{
                        backgroundImage: gradientText,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {feature.number}
                    </span>
                    <span className="text-[0.72rem] uppercase tracking-[0.28em] text-white/42">
                      {feature.title}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[clamp(1.8rem,6vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                    {feature.hook}
                  </h3>
                  <div
                    className="mt-5 h-[2px] w-16 rounded-full"
                    style={{ background: gradientSoft }}
                    aria-hidden
                  />
                  <div className="mt-5 space-y-4">
                    {feature.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-[1rem] leading-[1.72] text-white/60"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  {feature.focusLine ? (
                    <p
                      className="mt-6 text-[1.1rem] font-medium leading-[1.3] tracking-[-0.02em]"
                      style={{
                        backgroundImage: gradientText,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {feature.focusLine}
                    </p>
                  ) : null}
                  {feature.proofLine ? (
                    <p className="mt-4 text-[0.92rem] leading-[1.6] text-white/50">
                      {feature.proofLine}
                    </p>
                  ) : null}
                </article>
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
      id="systems"
      className="relative h-screen overflow-hidden bg-[#05060a]"
    >
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={90}
          particleSpread={11}
          speed={0.09}
          particleColors={["#475C70", "#7aa3be", "#263E52", "#9ab5c8", "#344f62"]}
          alphaParticles
          particleBaseSize={90}
          sizeRandomness={1.2}
          cameraDistance={22}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(5,6,10,0.35) 0%, rgba(5,6,10,0.85) 60%, rgba(5,6,10,0.98) 100%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
        }}
        aria-hidden
      />

      <div className="absolute left-0 right-0 top-0 z-30 px-8 pt-22 sm:px-14">
        <span className="text-[0.68rem] uppercase tracking-[0.32em] text-white/38">
          Primary Features
        </span>
      </div>

      <div className="absolute inset-0 z-20 overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full w-max items-center gap-0 pb-16 pt-36 will-change-transform sm:pb-20 sm:pt-40"
        >
          {features.map((feature, index) => {
            const gradientText = `linear-gradient(120deg, ${feature.gradient.from} 0%, ${feature.gradient.via} 50%, ${feature.gradient.to} 100%)`;
            const gradientSoft = `linear-gradient(135deg, ${feature.gradient.from} 0%, ${feature.gradient.via} 50%, ${feature.gradient.to} 100%)`;

            return (
              <article
                key={feature.number}
                ref={(node) => { cardRefs.current[index] = node; }}
                className="relative flex h-[min(78vh,44rem)] w-screen shrink-0 flex-col justify-center px-10 sm:px-20 lg:px-32"
              >
                <div
                  className="pointer-events-none absolute -top-[10%] left-[-2%] h-144 w-xl rounded-full opacity-[0.18] blur-[160px]"
                  style={{ background: feature.gradient.from }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute bottom-[-12%] right-[-4%] h-160 w-160 rounded-full opacity-[0.14] blur-[180px]"
                  style={{ background: feature.gradient.to }}
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
                  {feature.number}
                </div>

                <div className="relative max-w-4xl">
                  <TextReveal
                    as="div"
                    splitBy="word"
                    style={feature.hookRevealStyle}
                    className="text-[clamp(2.4rem,5.5vw,5.8rem)] font-semibold leading-[0.93] tracking-[-0.065em] text-white"
                  >
                    {feature.hook}
                  </TextReveal>

                  <Reveal delay={0.1} direction="up" amount={0.3}>
                    <div
                      className="mt-8 h-[2px] w-24 rounded-full"
                      style={{ background: gradientSoft }}
                      aria-hidden
                    />
                  </Reveal>

                  <div className="mt-8 max-w-176 space-y-5">
                    {feature.paragraphs.map((paragraph, paragraphIndex) => (
                      <Reveal
                        key={`${feature.number}-p-${paragraphIndex}`}
                        delay={0.12 + paragraphIndex * 0.06}
                        direction="up"
                        amount={0.22}
                      >
                        <p className="text-[clamp(0.98rem,1.3vw,1.12rem)] leading-[1.78] text-white/55">
                          {paragraph}
                        </p>
                      </Reveal>
                    ))}
                  </div>

                  {feature.focusLine ? (
                    <Reveal delay={0.28} direction="up" amount={0.24} className="mt-8">
                      <p
                        className="text-[clamp(1.3rem,2.2vw,2rem)] font-medium leading-[1.2] tracking-[-0.04em]"
                        style={{
                          backgroundImage: gradientText,
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        {feature.focusLine}
                      </p>
                    </Reveal>
                  ) : null}

                  {feature.proofLine ? (
                    <Reveal delay={0.36} direction="blur" amount={0.18} className="mt-6">
                      <div className="flex max-w-152 items-start gap-4">
                        <span
                          className="mt-[0.58rem] h-[2px] w-10 shrink-0 rounded-full"
                          style={{ background: gradientSoft }}
                        />
                        <div>
                          <p
                            className="text-[0.6rem] uppercase tracking-[0.32em]"
                            style={{
                              backgroundImage: gradientText,
                              WebkitBackgroundClip: "text",
                              backgroundClip: "text",
                              color: "transparent",
                            }}
                          >
                            Grounded Proof
                          </p>
                          <p className="mt-2 text-[0.95rem] leading-[1.7] text-white/50">
                            {feature.proofLine}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ) : null}
                </div>

                {index < FEATURE_COUNT - 1 ? (
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
            style={{ width: `${FEATURES_SCROLL_CONFIG.trailingViewportRatio * 100}vw` }}
          />
        </div>
      </div>
    </section>
  );
}

export default Features;
