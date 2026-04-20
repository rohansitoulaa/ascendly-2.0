"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { proofMetrics } from "@/servicesPage/lib/servicesData";
import BorderGlow from "@/animations/BorderGlow";
import ScrollFloat from "@/animations/ScrollFloat";

gsap.registerPlugin(ScrollTrigger);

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-proof-card]");
      gsap.set(cards, { autoAlpha: 0, y: 30 });

      cards.forEach((card, i) => {
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-proof-card]");
      cards.forEach((el) => gsap.set(el, { autoAlpha: 1, y: 0 }));
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
    >
      {/* Subtle top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1360px]">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollFloat
            containerClassName="my-0 text-center"
            textClassName="text-[clamp(1.1rem,1.8vw,1.4rem)] font-medium tracking-[-0.02em] text-white/50"
          >
            Measured impact
          </ScrollFloat>
          <h2 className="mt-4 text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-white">
            Not meetings booked.{" "}
            <span className="text-white/50">Revenue generated.</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:mt-20 md:grid-cols-3">
          {proofMetrics.map((proof, i) => (
            <div key={proof.label} data-proof-card="">
              <BorderGlow
                animated={i === 0}
                backgroundColor="rgba(7,17,28,0.82)"
                borderRadius={24}
                className="h-full border-white/[0.06]"
                colors={
                  i === 0
                    ? ["rgba(56,189,248,0.6)", "rgba(14,165,233,0.5)", "rgba(100,116,139,0.4)"]
                    : i === 1
                    ? ["rgba(168,85,247,0.5)", "rgba(139,92,246,0.45)", "rgba(100,116,139,0.4)"]
                    : ["rgba(16,185,129,0.5)", "rgba(52,211,153,0.45)", "rgba(100,116,139,0.4)"]
                }
                edgeSensitivity={22}
                fillOpacity={0.2}
                glowColor={i === 0 ? "200 80 60" : i === 1 ? "270 70 55" : "160 70 55"}
                glowIntensity={0.7}
                surface="dark"
              >
                <div className="flex h-full flex-col p-6 sm:p-7">
                  {/* Attribution tag */}
                  <span className="inline-flex self-start rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[0.58rem] font-medium uppercase tracking-[0.24em] text-white/35">
                    {proof.attribution}
                  </span>

                  {/* Big metric */}
                  <div className="mt-6 text-[clamp(2.4rem,5vw,3.6rem)] font-bold leading-none tracking-[-0.06em] text-white sm:mt-8">
                    {proof.metric}
                  </div>
                  <div className="mt-2 text-base font-semibold tracking-[-0.02em] text-white/70">
                    {proof.label}
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-6 text-white/40">
                    {proof.description}
                  </p>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
