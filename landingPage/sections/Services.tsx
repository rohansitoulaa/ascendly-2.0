"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/animations/Reveal";
import { TextReveal } from "@/animations/TextReveal";

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
  number: string;
  title: string;
  subtext: string;
  points: string[];
  bottomLine: string;
  cta: { label: string; href: string };
  gradient: { from: string; via: string; to: string };
}

const services: ServiceCard[] = [
  {
    number: "01",
    title: "Revenue Automation System",
    subtext:
      "End-to-end pipeline system, from capturing demand to converting deals.",
    points: [
      "Capture every inbound lead automatically",
      "Enrich, qualify, and route opportunities",
      "Run outbound in parallel to generate pipeline",
      "Follow up on every deal until it closes or disqualifies",
      "Track pipeline, revenue, and ROI in real-time",
    ],
    bottomLine:
      "We don't just generate a pipeline, we make sure it converts.",
    cta: { label: "Book a pipeline audit", href: "/schedule" },
    gradient: { from: "#22d3ee", via: "#6366f1", to: "#a855f7" },
  },
  {
    number: "02",
    title: "Outbound Engine (Standalone)",
    subtext: "For teams that only need consistent pipeline generation.",
    points: [
      "Targeted cold email + LinkedIn outreach",
      "ICP-based prospecting",
      "Reply handling + meeting booking",
      "Runs independently or alongside your internal team",
    ],
    bottomLine: "Adds pipeline. Does not manage conversion.",
    cta: { label: "Learn more", href: "/#services" },
    gradient: { from: "#fbbf24", via: "#fb923c", to: "#f43f5e" },
  },
];

const NBSP = " ";

function splitChars(text: string, gradient?: string) {
  return text.split("").map((ch, i) => {
    const gradientStyle = gradient
      ? {
          backgroundImage: gradient,
          WebkitBackgroundClip: "text" as const,
          backgroundClip: "text" as const,
          color: "transparent",
        }
      : undefined;
    return (
      <span
        key={i}
        data-char=""
        className="inline-block"
        style={{
          willChange: "transform, opacity",
          whiteSpace: "pre",
          ...gradientStyle,
        }}
      >
        {ch === " " ? NBSP : ch}
      </span>
    );
  });
}

const LABEL_GRADIENT =
  "linear-gradient(120deg, #ffffff 0%, #c7d2fe 55%, #a5f3fc 100%)";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const inlineRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const inline = inlineRef.current;
    const label = labelRef.current;
    if (!inline || !label) return;

    const ctx = gsap.context(() => {
      const inlineChars = inline.querySelectorAll<HTMLElement>("[data-char]");
      const labelChars = label.querySelectorAll<HTMLElement>("[data-char]");

      gsap.set(inlineChars, { yPercent: 60, opacity: 0 });
      gsap.set(labelChars, { yPercent: 60, opacity: 0 });

      gsap.to(inlineChars, {
        yPercent: 0,
        opacity: 1,
        ease: "power3.out",
        stagger: 0.022,
        scrollTrigger: {
          trigger: inline,
          start: "top 85%",
          end: "top 50%",
          scrub: 0.8,
        },
      });

      gsap.to(labelChars, {
        yPercent: 0,
        opacity: 1,
        ease: "power3.out",
        stagger: 0.022,
        scrollTrigger: {
          trigger: label,
          start: "top 90%",
          end: "top 60%",
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative bg-[#05060A]">
      {/* Preamble */}
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-28 text-center sm:px-10">
        <p className="text-[clamp(1.15rem,1.9vw,1.7rem)] font-medium leading-[1.3] tracking-[-0.02em] text-white/55">
          Most teams buy{" "}
          <span
            ref={inlineRef}
            className="inline-block font-semibold text-white"
          >
            {splitChars("our services")}
          </span>
          .
        </p>

        <TextReveal
          as="div"
          splitBy="word"
          style="blur-in"
          stagger={0.04}
          className="mt-7 max-w-[22ch] text-[clamp(2.1rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-white"
        >
          We build systems that generate and convert revenue.
        </TextReveal>

        <Reveal delay={0.25} direction="up" amount={0.3}>
          <div className="mt-14 flex flex-col items-center gap-2 text-[0.6rem] uppercase tracking-[0.4em] text-white/28">
            <span>Scroll</span>
            <span className="h-10 w-px bg-linear-to-b from-white/30 to-transparent" />
          </div>
        </Reveal>
      </div>

      {/* Shared section label */}
      <div className="relative mx-auto max-w-336 px-6 pt-8 text-center sm:px-10 sm:pt-12">
        <div
          ref={labelRef}
          className="inline-block text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-none tracking-[-0.055em]"
        >
          {splitChars("Our Services", LABEL_GRADIENT)}
        </div>
        <div
          aria-hidden
          className="mx-auto mt-5 h-px w-24"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Cards */}
      <div className="relative mx-auto mt-14 max-w-336 px-6 pb-32 sm:mt-20 sm:px-10 sm:pb-40">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {services.map((service, index) => {
            const gradientText = `linear-gradient(120deg, ${service.gradient.from} 0%, ${service.gradient.via} 50%, ${service.gradient.to} 100%)`;

            return (
              <Reveal
                key={service.number}
                delay={0.12 + index * 0.1}
                direction="up"
                distance={48}
                amount={0.15}
                className="h-full"
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/8 bg-white/1.5 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-white/[0.14] sm:p-10 lg:p-12">
                  <div
                    className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 rounded-full opacity-[0.22] blur-[120px] transition-opacity duration-700 group-hover:opacity-[0.35]"
                    style={{ background: service.gradient.from }}
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -bottom-24 -right-20 h-96 w-96 rounded-full opacity-[0.16] blur-[140px] transition-opacity duration-700 group-hover:opacity-[0.28]"
                    style={{ background: service.gradient.to }}
                    aria-hidden
                  />

                  <div className="relative flex items-center justify-between">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-white/42">
                      Service / {service.number}
                    </span>
                    <span
                      className="h-px w-16"
                      style={{ background: gradientText }}
                      aria-hidden
                    />
                  </div>

                  <h3
                    className="relative mt-8 text-[clamp(1.6rem,2.8vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
                    style={{
                      backgroundImage: gradientText,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {service.title}
                  </h3>

                  <p className="relative mt-5 max-w-[38ch] text-[clamp(0.98rem,1.2vw,1.08rem)] leading-[1.72] text-white/60">
                    {service.subtext}
                  </p>

                  <ul className="relative mt-8 space-y-4">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-[0.96rem] leading-[1.65] text-white/75"
                      >
                        <span
                          className="mt-[0.35rem] flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                          style={{ background: gradientText }}
                          aria-hidden
                        >
                          <FiCheck className="text-[0.62rem] text-black/80" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-10 flex-1" />

                  <blockquote
                    className="relative border-l-2 pl-5 text-[1.05rem] font-medium italic leading-[1.55] tracking-[-0.01em] text-white/85"
                    style={{
                      borderImage: `${gradientText} 1`,
                    }}
                  >
                    &ldquo;{service.bottomLine}&rdquo;
                  </blockquote>

                  <div className="relative mt-8">
                    <Link
                      href={service.cta.href}
                      className="group/cta inline-flex items-center gap-3 text-[0.95rem] font-medium tracking-[-0.01em] text-white"
                    >
                      <span
                        className="transition-colors duration-500"
                        style={{
                          backgroundImage: gradientText,
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        {service.cta.label}
                      </span>
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover/cta:translate-x-1 group-hover/cta:border-white/30"
                        style={{ background: `${service.gradient.from}14` }}
                      >
                        <FiArrowUpRight className="text-[1rem] text-white/85" />
                      </span>
                    </Link>
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

export default Services;
