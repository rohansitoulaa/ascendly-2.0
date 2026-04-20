"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/landingPage/components/Button";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(content, { autoAlpha: 0, y: 28 });
      gsap.to(content, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      if (content) gsap.set(content, { autoAlpha: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.05),transparent_55%)]" />

      {/* Top subtle border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div ref={contentRef} className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-white">
          Let&rsquo;s build your{" "}
          <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
            revenue system.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-[clamp(0.95rem,1.6vw,1.1rem)] leading-7 text-white/45 sm:mt-8 sm:leading-8">
          Stop buying campaigns. Start building systems that compound. Book a strategy call and we&rsquo;ll map your revenue engine together.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:mt-12 sm:flex-row sm:justify-center">
          <Button
            variant="primary"
            className="pl-6 pr-3 py-3 md:pl-7 md:pr-3.5 md:py-3.5"
            trailingAdornmentClassName="ml-1"
            trailingAdornment={<FiArrowUpRight className="text-base" />}
          >
            Book Strategy Call
          </Button>
          <span className="text-sm text-white/35">
            30-minute call · No commitment · Revenue-first approach
          </span>
        </div>
      </div>
    </section>
  );
}
