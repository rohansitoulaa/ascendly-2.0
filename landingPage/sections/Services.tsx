"use client";

import Link from "next/link";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { Reveal } from "@/animations/Reveal";
import { TextReveal } from "@/animations/TextReveal";

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

export function Services() {
  return (
    <section id="services" className="relative bg-[#05060A]">
      {/* Preamble */}
      <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-center px-6 py-15 text-center sm:px-10">
        <p className="text-[clamp(1.15rem,1.9vw,1.7rem)] font-medium leading-[1.3] tracking-[-0.02em] text-ink">
          Most teams buy Our Services
        </p>

        <TextReveal
          as="div"
          splitBy="word"
          style="blur-in"
          stagger={0.04}
          className="mt-7 max-w-[22ch] text-[clamp(2.1rem,5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-ink"
        >
          We build systems that generate and convert revenue.
        </TextReveal>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-400 px-6 pb-32 sm:mt-20 sm:px-10 sm:pb-40">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {services.map((service, index) => {
            const accentLine = `linear-gradient(90deg, ${service.gradient.from}, ${service.gradient.to})`;

            return (
              <Reveal
                key={service.number}
                delay={0.12 + index * 0.1}
                direction="up"
                distance={48}
                amount={0.15}
                className="h-full"
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-hairline/8 bg-surface/1.5 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-hairline/[0.14] sm:p-10 lg:p-12">
                  {/* Single top accent line — the only color hit */}
                  <span
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: accentLine }}
                    aria-hidden
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-ink/42">
                      Service / {service.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-[clamp(1.6rem,2.8vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
                    {service.title}
                  </h3>

                  <p className="mt-5 max-w-[38ch] text-[clamp(0.98rem,1.2vw,1.08rem)] leading-[1.72] text-ink/60">
                    {service.subtext}
                  </p>

                  <ul className="mt-8 space-y-4">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-[0.96rem] leading-[1.65] text-ink/75"
                      >
                        <span className="mt-[0.35rem] flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-hairline/20">
                          <FiCheck className="text-[0.58rem] text-ink/60" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex-1" />

                  <blockquote className="border-l-2 border-hairline/20 pl-5 text-[1.05rem] font-medium italic leading-[1.55] tracking-[-0.01em] text-ink/70">
                    &ldquo;{service.bottomLine}&rdquo;
                  </blockquote>

                  <div className="mt-8">
                    <Link
                      href={service.cta.href}
                      className="group/cta inline-flex items-center gap-3 text-[0.95rem] font-medium tracking-[-0.01em] text-ink/80 transition-colors duration-300 hover:text-ink"
                    >
                      <span>{service.cta.label}</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline/15 transition-all duration-500 group-hover/cta:translate-x-1 group-hover/cta:border-hairline/30">
                        <FiArrowUpRight className="text-[1rem] text-ink/70" />
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
