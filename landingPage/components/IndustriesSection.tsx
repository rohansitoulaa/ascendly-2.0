"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import {
  FiBarChart2,
  FiBriefcase,
  FiCpu,
  FiTruck,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { Reveal } from "@/animations/Reveal";
import HorizontalScroll from "@/animations/HorizontalScroll";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ─────────────────────────────────────────────────── */

interface IndustryCategory {
  title: string;
  icon: IconType;
  accentBorder: string;
  accentHover: string;
  iconShellClass: string;
  dotClass: string;
  glowClass: string;
  items: string[];
}

const industries: IndustryCategory[] = [
  {
    title: "B2B Growth & Marketing",
    icon: FiBarChart2,
    accentBorder: "border-cyan-500/[0.08]",
    accentHover: "hover:border-cyan-500/[0.22]",
    iconShellClass: "bg-cyan-500/10 text-cyan-300",
    dotClass: "bg-cyan-400/50",
    glowClass: "from-cyan-500/[0.10] via-transparent to-transparent",
    items: [
      "Account-Based Marketing (ABM) Agencies",
      "Performance Creative & Media Buying Firms",
      "CRO (Conversion Rate Optimization) Agencies",
      "PR & Earned Media Firms",
    ],
  },
  {
    title: "Tech + Infrastructure",
    icon: FiCpu,
    accentBorder: "border-sky-500/[0.08]",
    accentHover: "hover:border-sky-500/[0.22]",
    iconShellClass: "bg-sky-500/10 text-sky-300",
    dotClass: "bg-sky-400/50",
    glowClass: "from-sky-500/[0.10] via-transparent to-transparent",
    items: [
      "Cybersecurity & MSSPs",
      "Cloud Migration & DevOps Firms",
      "ERP / NetSuite Implementation",
      "Data Infrastructure & BI Consulting",
    ],
  },
  {
    title: "Industrial / Real-World Sales",
    icon: FiTruck,
    accentBorder: "border-emerald-500/[0.08]",
    accentHover: "hover:border-emerald-500/[0.22]",
    iconShellClass: "bg-emerald-500/10 text-emerald-300",
    dotClass: "bg-emerald-400/50",
    glowClass: "from-emerald-500/[0.10] via-transparent to-transparent",
    items: [
      "Commercial Solar (C&I)",
      "Industrial Automation & Robotics",
      "Logistics & 3PL Providers",
      "Equipment Leasing / Financing",
    ],
  },
  {
    title: "Advisory / High-Ticket Services",
    icon: FiBriefcase,
    accentBorder: "border-violet-500/[0.08]",
    accentHover: "hover:border-violet-500/[0.22]",
    iconShellClass: "bg-violet-500/10 text-violet-300",
    dotClass: "bg-violet-400/50",
    glowClass: "from-violet-500/[0.10] via-transparent to-transparent",
    items: [
      "Fractional CMO / CRO / CFO Firms",
      "Executive Search & Headhunting Firms",
      "R&D Tax Credit Consultants",
      "Corporate Insurance / Benefits Brokers",
    ],
  },
];

/* ── Card ─────────────────────────────────────────────────── */

function IndustryCard({ category, index }: { category: IndustryCategory; index: number }) {
  const Icon = category.icon;
  return (
    <article
      data-ind-card=""
      className={`group relative flex h-[420px] w-[clamp(260px,32vw,380px)] shrink-0 flex-col overflow-hidden rounded-[clamp(18px,2.5vw,26px)] border bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-400 hover:bg-white/[0.045] hover:-translate-y-1 sm:p-7 ${category.accentBorder} ${category.accentHover}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b ${category.glowClass} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-24 rounded-t-[inherit] bg-gradient-to-b from-white/[0.04] to-transparent" />
      </div>

      <div className="relative flex flex-col">
        <div className="flex items-center gap-3.5">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${category.iconShellClass}`}
          >
            <Icon className="h-[1.15rem] w-[1.15rem]" />
          </div>
          <div>
            <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/40">
              Industry {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-1 text-[1rem] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[1.08rem]">
              {category.title}
            </h3>
          </div>
        </div>

        <div className="my-5 h-px w-full bg-white/[0.06]" />

        <ul className="flex flex-col gap-3.5">
          {category.items.map((item) => (
            <li
              key={item}
              data-ind-item=""
              className="flex items-start gap-3"
            >
              <span
                className={`mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full ${category.dotClass}`}
              />
              <span className="text-[0.86rem] leading-[1.6] text-slate-300/80 transition-colors duration-200 group-hover:text-slate-200">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-6">
        <div
          className={`inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/50 transition-colors group-hover:text-white/80`}
        >
          <span>Explore</span>
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </article>
  );
}

/* ── Main Component ───────────────────────────────────────── */

export function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-ind-item]");
      items.forEach((item, idx) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.3 + (idx % 4) * 0.06,
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              once: true,
            },
          },
        );
      });
    });

    mm.add("(max-width: 767px)", () => {
      const els = gsap.utils.toArray<HTMLElement>(
        "[data-ind-card], [data-ind-item]",
      );
      els.forEach((el) => {
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="section-perf-skip relative overflow-hidden bg-[#06090d]"
    >
      {/* ── top divider line ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[1360px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* ── ambient glow ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-violet-500/[0.04] blur-[130px]" />
        <div className="absolute right-0 top-2/3 h-[340px] w-[340px] rounded-full bg-emerald-500/[0.04] blur-[110px]" />
      </div>

      <div className="relative z-10 px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-[1360px]">
          <Reveal direction="up" distance={28} className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
              Industries We Serve
            </span>
          </Reveal>

          <Reveal direction="up" distance={36} delay={0.08} className="max-w-3xl">
            <h2 className="mt-6 text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-white">
              Revenue Automation{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
                Service
              </span>
            </h2>
          </Reveal>

          <Reveal direction="up" distance={24} delay={0.16} className="max-w-3xl">
            <p className="mt-5 max-w-[62ch] text-[clamp(0.92rem,1.5vw,1.05rem)] leading-7 text-slate-400">
              Built for B2B companies where each customer is worth $30k–$3M+.
              Typically involves multi-step sales cycles, multiple stakeholders,
              and follow-up beyond the first call.
            </p>
          </Reveal>

          <Reveal direction="up" distance={20} delay={0.24} className="max-w-3xl">
            <p className="mt-3 inline-flex items-center gap-2 text-[0.84rem] font-medium leading-6 text-slate-500">
              <span className="h-px w-4 bg-slate-700" />
              Not designed for transactional or low-ticket sales. Scroll →
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Pinned horizontal scroll (desktop) / flex on mobile ── */}
      <div className="mt-12 hidden sm:block">
        <HorizontalScroll
          scrollMultiplier={1.1}
          sectionClassName="py-20 lg:py-28"
          className="items-stretch px-[max(1rem,calc((100vw-1360px)/2))]"
        >
          {industries.map((category, i) => (
            <IndustryCard key={category.title} category={category} index={i} />
          ))}
        </HorizontalScroll>
      </div>

      {/* Mobile: simple vertical stack */}
      <div className="mt-10 flex flex-col gap-4 px-4 pb-20 sm:hidden">
        {industries.map((category, i) => (
          <IndustryCard key={category.title} category={category} index={i} />
        ))}
      </div>
    </section>
  );
}
