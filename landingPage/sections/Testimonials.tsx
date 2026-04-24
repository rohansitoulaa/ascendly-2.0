"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type Transition,
} from "motion/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { SectionHeader } from "@/design/SectionHeader";
import { GlassCard } from "@/design/GlassCard";
import { TextHighlighter } from "@/design/TextHighlighter";
import clientReviews, { type Review } from "@/landingPage/lib/clientReviews";

type ReviewAccent = "cyan" | "violet" | "emerald" | "rose" | "amber";

const REVIEW_ACCENTS: readonly ReviewAccent[] = [
  "cyan",
  "violet",
  "emerald",
  "amber",
  "rose",
];

const REVIEW_HIGHLIGHT = {
  // Highlight sweep duration in seconds. Keep between 0.45 and 1.1 so the emphasis feels deliberate, not flashy.
  duration: 0.82,
  // Viewport share required before an emphasized phrase animates. Keep between 0.1 and 0.45 so highlights only fire once the card is readable.
  inViewAmount: 0.28,
} as const;

const REVIEW_HIGHLIGHT_TRANSITION: Transition = {
  type: "spring",
  duration: REVIEW_HIGHLIGHT.duration,
  bounce: 0,
};

const REVIEW_HIGHLIGHT_COLORS: Record<ReviewAccent, string> = {
  cyan: "rgba(125, 211, 252, 0.24)",
  violet: "rgba(196, 181, 253, 0.22)",
  emerald: "rgba(110, 231, 183, 0.22)",
  amber: "rgba(253, 224, 71, 0.22)",
  rose: "rgba(253, 164, 175, 0.22)",
};

const TESTIMONIAL_CAROUSEL = {
  // Number of duplicated review sets used to keep the loop seamless. Keep between 3 and 5.
  duplicateCopies: 3,
  // Baseline autoplay speed in pixels per second while the page is idle. Keep between 18 and 48.
  baseSpeed: 24,
  // Extra autoplay speed added per vertical pixel scrolled. Keep between 0.2 and 0.8.
  scrollBoostMultiplier: 0.42,
  // Maximum extra speed granted by scroll interaction, in pixels per second. Keep between 80 and 220.
  maxScrollBoost: 150,
  // Decay rate applied to the scroll boost every second. Keep between 1.5 and 5.
  scrollBoostDecay: 2.8,
  // Horizontal distance moved by each arrow tap, expressed as a share of the visible track width. Keep between 0.5 and 0.95.
  arrowStepViewportRatio: 0.74,
  // Speed used to animate arrow-triggered track movement, in pixels per second. Keep between 420 and 1400 so the slide feels smooth without lagging.
  arrowSlideSpeed: 920,
  // Remaining-slide threshold used to treat manual navigation as finished. Keep between 0.2 and 2 so float rounding does not block the next tap.
  arrowSlideCompletionThreshold: 0.5,
  // Temporary speed bump applied after manual navigation, in pixels per second. Keep between 20 and 90.
  arrowBoost: 42,
} as const;

const renderRichReview = (review: string, accent: ReviewAccent) =>
  review.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <TextHighlighter
          key={`${part}-${index}`}
          as="span"
          triggerType="inView"
          transition={REVIEW_HIGHLIGHT_TRANSITION}
          useInViewOptions={{
            once: true,
            initial: false,
            amount: REVIEW_HIGHLIGHT.inViewAmount,
          }}
          highlightColor={REVIEW_HIGHLIGHT_COLORS[accent]}
          className="rounded-[0.34em] px-[0.16em] font-semibold text-white"
        >
          {part.slice(2, -2)}
        </TextHighlighter>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });

function normalizeOffset(offset: number, loopWidth: number) {
  if (loopWidth <= 0) return offset;

  let nextOffset = offset;

  while (nextOffset <= -loopWidth * 2) {
    nextOffset += loopWidth;
  }

  while (nextOffset > 0) {
    nextOffset -= loopWidth;
  }

  return nextOffset;
}

function ReviewCard({
  review,
  accent,
}: {
  review: Review;
  accent: ReviewAccent;
}) {
  return (
    <GlassCard accent={accent} tilt={false} className="h-full min-h-[28rem] sm:min-h-[30rem]">
      <article className="flex h-full flex-col gap-8 p-7 sm:p-9 lg:p-10">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[20px] border border-white/12 bg-white/[0.04] sm:h-20 sm:w-20">
            <img
              src={review.image}
              alt={`${review.name} headshot`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="min-w-0">
            <div className="text-[1.12rem] font-semibold tracking-[-0.03em] text-white sm:text-[1.3rem]">
              {review.name}
            </div>
            <div className="mt-1 text-sm leading-6 text-white/58 sm:text-[0.98rem]">
              {review.position}
            </div>
            <div className="mt-1 text-sm font-medium leading-6 text-white/82 sm:text-[0.98rem]">
              {review.company}
            </div>
          </div>
        </div>

        <div className="text-[clamp(1.04rem,1.55vw,1.24rem)] leading-[1.82] tracking-[-0.018em] text-white/76">
          {renderRichReview(review.review, accent)}
        </div>
      </article>
    </GlassCard>
  );
}

export function Testimonials() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const xRef = useRef(0);
  const loopWidthRef = useRef(0);
  const boostRef = useRef(0);
  const manualShiftRemainingRef = useRef(0);
  const initializedRef = useRef(false);
  const lastScrollYRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const repeatedReviews = useMemo(
    () =>
      Array.from({ length: TESTIMONIAL_CAROUSEL.duplicateCopies }, (_, copyIndex) =>
        clientReviews.map((review, reviewIndex) => ({
          accent: REVIEW_ACCENTS[reviewIndex % REVIEW_ACCENTS.length],
          key: `${copyIndex}-${review.name}-${review.company}`,
          review,
        })),
      ).flat(),
    [],
  );

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = lastScrollYRef.current;
    lastScrollYRef.current = current;

    if (previous === null || prefersReducedMotion) return;

    const delta = Math.abs(current - previous);
    if (delta <= 0) return;

    boostRef.current = Math.min(
      TESTIMONIAL_CAROUSEL.maxScrollBoost,
      boostRef.current + delta * TESTIMONIAL_CAROUSEL.scrollBoostMultiplier,
    );
  });

  useEffect(() => {
    const measureTrack = () => {
      const track = trackRef.current;
      if (!track) return;

      const nextLoopWidth = track.scrollWidth / TESTIMONIAL_CAROUSEL.duplicateCopies;
      if (!Number.isFinite(nextLoopWidth) || nextLoopWidth <= 0) return;

      loopWidthRef.current = nextLoopWidth;

      if (!initializedRef.current) {
        xRef.current = -nextLoopWidth;
        initializedRef.current = true;
      } else {
        xRef.current = normalizeOffset(xRef.current, nextLoopWidth);
      }

      x.set(xRef.current);
    };

    measureTrack();

    const track = trackRef.current;
    const resizeObserver =
      typeof ResizeObserver !== "undefined" && track
        ? new ResizeObserver(measureTrack)
        : null;

    if (track && resizeObserver) {
      resizeObserver.observe(track);
    }

    window.addEventListener("resize", measureTrack);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureTrack);
    };
  }, [x]);

  useAnimationFrame((_, delta) => {
    const loopWidth = loopWidthRef.current;
    if (loopWidth <= 0) return;

    const decay = Math.exp(
      (-TESTIMONIAL_CAROUSEL.scrollBoostDecay * delta) / 1000,
    );
    boostRef.current *= decay;

    let nextOffset = xRef.current;

    if (!prefersReducedMotion) {
      const speed = Math.min(
        TESTIMONIAL_CAROUSEL.baseSpeed + boostRef.current,
        TESTIMONIAL_CAROUSEL.baseSpeed + TESTIMONIAL_CAROUSEL.maxScrollBoost,
      );

      nextOffset -= (speed * delta) / 1000;

      if (manualShiftRemainingRef.current !== 0) {
        const maxSlideStep =
          (TESTIMONIAL_CAROUSEL.arrowSlideSpeed * delta) / 1000;
        const manualStep =
          Math.sign(manualShiftRemainingRef.current) *
          Math.min(Math.abs(manualShiftRemainingRef.current), maxSlideStep);

        nextOffset += manualStep;
        manualShiftRemainingRef.current -= manualStep;

        if (
          Math.abs(manualShiftRemainingRef.current) <
          TESTIMONIAL_CAROUSEL.arrowSlideCompletionThreshold
        ) {
          manualShiftRemainingRef.current = 0;
        }
      }
    }

    xRef.current = normalizeOffset(nextOffset, loopWidth);
    x.set(xRef.current);
  });

  const moveTrack = (direction: "left" | "right") => {
    const viewport = viewportRef.current;
    const loopWidth = loopWidthRef.current;

    if (!viewport || loopWidth <= 0) return;

    const distance =
      viewport.clientWidth * TESTIMONIAL_CAROUSEL.arrowStepViewportRatio;
    const directionMultiplier = direction === "left" ? 1 : -1;

    if (prefersReducedMotion) {
      xRef.current = normalizeOffset(
        xRef.current + directionMultiplier * distance,
        loopWidth,
      );
      x.set(xRef.current);
    } else {
      if (
        Math.abs(manualShiftRemainingRef.current) >=
        TESTIMONIAL_CAROUSEL.arrowSlideCompletionThreshold
      ) {
        return;
      }

      manualShiftRemainingRef.current = directionMultiplier * distance;
    }

    boostRef.current = Math.min(
      TESTIMONIAL_CAROUSEL.maxScrollBoost,
      boostRef.current + TESTIMONIAL_CAROUSEL.arrowBoost,
    );
  };

  return (
    <section id="proof" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            title="What our Existing"
            highlight="Clients Says"
            subtitle="Client from different Countries and Industries Trust on us."
            align="left"
            size="lg"
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Show previous client reviews"
              onClick={() => moveTrack("left")}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/72 transition-all duration-300 hover:-translate-x-0.5 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <FiArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Show next client reviews"
              onClick={() => moveTrack("right")}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/72 transition-all duration-300 hover:translate-x-0.5 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <FiArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="relative mt-14 overflow-hidden px-6 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] sm:mt-20 sm:px-8"
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-stretch gap-6 will-change-transform sm:gap-7"
        >
          {repeatedReviews.map(({ accent, key, review }) => (
            <div
              key={key}
              className="w-[92vw] shrink-0 sm:w-[640px] lg:w-[760px] xl:w-[820px]"
            >
              <ReviewCard review={review} accent={accent} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
