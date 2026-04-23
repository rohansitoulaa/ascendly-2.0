"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  /** Extra scroll distance as a viewport-height multiplier. 1 = ~1 screen of extra vertical scroll. */
  scrub?: number | boolean;
  /** How much extra vertical scroll per horizontal screen. Default 1 screen per horizontal screen. */
  scrollMultiplier?: number;
  /** Outer section className. */
  sectionClassName?: string;
  /** Optional element rendered inside the pinned viewport, above the track (e.g. a header that stays pinned). */
  pinnedOverlay?: ReactNode;
  /** Minimum viewport width (px) for horizontal scroll to activate. Below this, falls back to native horizontal scroll. */
  minViewportWidth?: number;
}

export function HorizontalScroll({
  children,
  className = "",
  sectionClassName = "",
  scrub = 1,
  scrollMultiplier = 1,
  pinnedOverlay,
  minViewportWidth = 768,
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add(`(min-width: ${minViewportWidth}px)`, () => {
      const compute = () => {
        const width = track.scrollWidth;
        const viewport = window.innerWidth;
        const travel = Math.max(0, width - viewport);
        return travel;
      };

      let travel = compute();

      const tween = gsap.to(track, {
        x: () => -travel,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${travel * scrollMultiplier}`,
          pin: true,
          scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const onResize = () => {
        travel = compute();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    mm.add(`(max-width: ${minViewportWidth - 1}px)`, () => {
      // On mobile: enable native horizontal overflow scroll
      gsap.set(track, { x: 0 });
      track.style.overflowX = "auto";
    });

    return () => {
      mm.revert();
    };
  }, [scrub, scrollMultiplier, minViewportWidth]);

  return (
    <div
      ref={sectionRef}
      className={`relative overflow-hidden ${sectionClassName}`}
    >
      {pinnedOverlay && (
        <div className="pointer-events-none absolute inset-0 z-20">
          {pinnedOverlay}
        </div>
      )}
      <div
        ref={trackRef}
        className={`horizontal-scroll-track flex w-max gap-6 md:gap-8 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default HorizontalScroll;
