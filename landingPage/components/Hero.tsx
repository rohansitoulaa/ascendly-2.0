"use client";

import type { RefObject } from "react";
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
  return (
    <section className="relative z-10 flex flex-1 items-center px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 md:pt-14">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col items-center text-center">
        <h1 className="max-w-[22ch] text-[clamp(2.2rem,6vw,6.25rem)] font-semibold tracking-[-0.06em] text-white leading-[1.05]">
          Turn your pipeline into a{" "}
          <span className="bg-linear-to-r from-white via-white to-white/62 bg-clip-text text-transparent">
            predictable revenue system.
          </span>
        </h1>

        <p className="mt-5 max-w-3xl text-balance text-[clamp(0.875rem,2vw,1.25rem)] leading-7 text-white/72 sm:mt-7 sm:leading-8">
          We design and run end-to-end revenue systems, from lead capture to
          deal conversion, so every qualified opportunity has a cleaner path to
          closed-won.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row">
          <HeroCtaButton
            iconAnchorRef={ctaPlaneAnchorRef}
            isPlaneDocked={isPlaneDocked}
            planeVisualRef={planeVisualRef}
          />
          <p className="max-w-xs text-sm leading-6 text-white/50">
            Built for premium SaaS, service businesses, and modern B2B teams.
          </p>
        </div>
      </div>
    </section>
  );
}
