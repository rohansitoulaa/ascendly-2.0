"use client";

import { type RefObject, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import TextReveal from "@/animations/TextReveal";
import { HeroCtaButton } from "./HeroCtaButton";

interface HeroProps {
  ctaPlaneAnchorRef: RefObject<HTMLSpanElement | null>;
  isPlaneDocked: boolean;
  planeVisualRef?: RefObject<HTMLSpanElement | null>;
}

export default function Hero({
  ctaPlaneAnchorRef,
  isPlaneDocked,
  planeVisualRef,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
  });

  const headingScale = useTransform(progress, [0, 1], [1, 0.86]);
  const headingY = useTransform(progress, [0, 1], [0, -80]);
  const headingOpacity = useTransform(progress, [0, 0.7, 1], [1, 1, 0.2]);
  const bgParallaxSlow = useTransform(progress, [0, 1], [0, 140]);
  const bgParallaxFast = useTransform(progress, [0, 1], [0, 260]);
  const kickerY = useTransform(progress, [0, 1], [0, -40]);

  const motionStyles = prefersReducedMotion
    ? {}
    : {
        scale: headingScale,
        y: headingY,
        opacity: headingOpacity,
      };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex flex-1 items-center px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 md:pt-14"
    >
      {/* Hero parallax backdrop layers  stacked, drift at different speeds */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[30rem] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),transparent_62%)]"
        style={prefersReducedMotion ? undefined : { y: bgParallaxSlow }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-20 -z-10 h-[26rem] bg-[radial-gradient(ellipse_at_80%_40%,rgba(167,139,250,0.1),transparent_60%)]"
        style={prefersReducedMotion ? undefined : { y: bgParallaxFast }}
      />

      <motion.div
        style={motionStyles}
        className="mx-auto flex w-full max-w-[1360px] flex-col items-center text-center [transform-origin:center_top]"
      >
        <motion.span
          style={prefersReducedMotion ? undefined : { y: kickerY }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[0.66rem] font-medium uppercase tracking-[0.32em] text-white/62 backdrop-blur-sm sm:mb-7 sm:text-[0.7rem]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
          Predictable Revenue Systems
        </motion.span>

        <h1 className="max-w-[22ch] text-[clamp(2.2rem,6vw,6.25rem)] font-semibold tracking-[-0.06em] text-white leading-[1.05]">
          <TextReveal
            style="mask-sweep"
            splitBy="word"
            stagger={0.07}
            duration={0.95}
            as="span"
            className="inline-block"
          >
            Turn your pipeline into a
          </TextReveal>{" "}
          <TextReveal
            style="mask-sweep"
            splitBy="word"
            stagger={0.07}
            delay={0.25}
            duration={0.95}
            as="span"
            className="inline-block bg-linear-to-r from-white via-white to-white/62 bg-clip-text text-transparent"
          >
            predictable revenue system.
          </TextReveal>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-3xl text-balance text-[clamp(0.875rem,2vw,1.25rem)] leading-7 text-white/72 sm:mt-7 sm:leading-8"
        >
          We design and run end-to-end revenue systems, from lead capture to
          deal conversion, so every qualified opportunity has a cleaner path to
          closed-won.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row"
        >
          <HeroCtaButton
            iconAnchorRef={ctaPlaneAnchorRef}
            isPlaneDocked={isPlaneDocked}
            planeVisualRef={planeVisualRef}
          />
          <p className="max-w-xs text-sm leading-6 text-white/50">
            Built for premium SaaS, service businesses, and modern B2B teams.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
