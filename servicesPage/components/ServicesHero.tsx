"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/landingPage/components/Button";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll<HTMLElement>("[data-word]");
        gsap.set(words, { opacity: 0, y: 40, rotateX: -15 });
        tl.to(words, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.06,
        });
      }

      if (subRef.current) {
        gsap.set(subRef.current, { opacity: 0, y: 24 });
        tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");
      }

      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 18 });
        tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
      }
    });

    mm.add("(max-width: 767px)", () => {
      if (headlineRef.current) {
        headlineRef.current.querySelectorAll<HTMLElement>("[data-word]").forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }
      if (subRef.current) {
        subRef.current.style.opacity = "1";
        subRef.current.style.transform = "none";
      }
      if (ctaRef.current) {
        ctaRef.current.style.opacity = "1";
        ctaRef.current.style.transform = "none";
      }
    });

    return () => mm.revert();
  }, []);

  const headlineWords = "We build revenue systems that generate and convert pipeline.".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[92vh] items-center overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40 md:pt-48 lg:px-8"
    >
      {/* Subtle ambient light */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1360px]">
        <div className="max-w-4xl">
          {/* Kicker */}
          <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-white/50 backdrop-blur-sm sm:mb-8">
            Revenue Systems
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-[clamp(2.2rem,5.8vw,5.4rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-white [perspective:800px]"
          >
            {headlineWords.map((word, i) => (
              <span key={i} data-word="" className="mr-[0.28em] inline-block will-change-transform last:mr-0">
                {word}
              </span>
            ))}
          </h1>

          {/* Sub-copy */}
          <div ref={subRef} className="mt-6 max-w-2xl sm:mt-8">
            <p className="text-[clamp(0.95rem,1.8vw,1.2rem)] leading-[1.7] text-white/55">
              Outbound alone doesn&rsquo;t scale. Tools alone don&rsquo;t fix pipeline.
            </p>
            <p className="mt-2 text-[clamp(0.95rem,1.8vw,1.2rem)] leading-[1.7] text-white/70">
              We design and operate your full revenue engine  from lead capture to deal conversion.
            </p>
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="mt-10 flex flex-col items-start gap-4 sm:mt-12 sm:flex-row sm:items-center">
            <Button
              variant="primary"
              className="pl-6 pr-3 py-3 md:pl-7 md:pr-3.5 md:py-3.5"
              trailingAdornmentClassName="ml-1"
              trailingAdornment={<FiArrowUpRight className="text-base" />}
            >
              Book Strategy Call
            </Button>
            <span className="text-sm text-white/40">
              30-minute call · No commitment
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
