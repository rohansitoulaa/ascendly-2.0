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

gsap.registerPlugin(ScrollTrigger);

/* ── Data ─────────────────────────────────────────────────── */

interface IndustryCategory {
  title: string;
  icon: IconType;
  accentBorder: string;
  accentHover: string;
  iconShellClass: string;
  dotClass: string;
  items: string[];
}

const industries: IndustryCategory[] = [
  {
    title: "B2B Growth & Marketing",
    icon: FiBarChart2,
    accentBorder: "border-cyan-500/[0.08]",
    accentHover: "hover:border-cyan-500/[0.18]",
    iconShellClass: "bg-cyan-500/10 text-cyan-300",
    dotClass: "bg-cyan-400/40",
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
    accentHover: "hover:border-sky-500/[0.18]",
    iconShellClass: "bg-sky-500/10 text-sky-300",
    dotClass: "bg-sky-400/40",
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
    accentHover: "hover:border-emerald-500/[0.18]",
    iconShellClass: "bg-emerald-500/10 text-emerald-300",
    dotClass: "bg-emerald-400/40",
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
    accentHover: "hover:border-violet-500/[0.18]",
    iconShellClass: "bg-violet-500/10 text-violet-300",
    dotClass: "bg-violet-400/40",
    items: [
      "Fractional CMO / CRO / CFO Firms",
      "Executive Search & Headhunting Firms",
      "R&D Tax Credit Consultants",
      "Corporate Insurance / Benefits Brokers",
    ],
  },
];

/* ── Component ────────────────────────────────────────────── */

export function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      /* heading reveal */
      const headings = gsap.utils.toArray<HTMLElement>(
        "[data-ind-heading]",
      );
      headings.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      /* card stagger — cascade from left to right */
      const cards = gsap.utils.toArray<HTMLElement>("[data-ind-card]");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 36, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
            delay: index * 0.12,
            scrollTrigger: {
              trigger: section.querySelector("[data-ind-grid]"),
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      /* list items reveal within each visible card */
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
            delay: 0.3 + idx * 0.025,
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
        "[data-ind-heading], [data-ind-card], [data-ind-item]",
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
      className="relative overflow-hidden bg-[#06090d] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32"
    >
      {/* ── top divider line ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[1360px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* ── ambient glow ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-violet-500/[0.03] blur-[130px]" />
        <div className="absolute right-0 top-2/3 h-[340px] w-[340px] rounded-full bg-emerald-500/[0.03] blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1360px]">
        {/* ── section header ── */}
        <div className="max-w-3xl">
          <span
            data-ind-heading=""
            className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400"
          >
            Industries We Serve
          </span>

          <h2
            data-ind-heading=""
            className="mt-6 text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-white"
          >
            Revenue Automation Service
          </h2>

          <p
            data-ind-heading=""
            className="mt-5 max-w-[62ch] text-[clamp(0.92rem,1.5vw,1.05rem)] leading-7 text-slate-400"
          >
            Built for B2B companies where each customer is worth $30k–$3M+.
            Typically involves multi-step sales cycles, multiple stakeholders,
            and follow-up beyond the first call.
          </p>

          <p
            data-ind-heading=""
            className="mt-3 inline-flex items-center gap-2 text-[0.84rem] font-medium leading-6 text-slate-500"
          >
            <span className="h-px w-4 bg-slate-700" />
            Not designed for transactional or low-ticket sales.
          </p>
        </div>

        {/* ── industry grid ── */}
        <div
          data-ind-grid=""
          className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:mt-18 xl:grid-cols-4 xl:gap-5"
        >
          {industries.map((category) => {
            const Icon = category.icon;

            return (
              <article
                key={category.title}
                data-ind-card=""
                className={`group relative flex flex-col rounded-[clamp(18px,2.5vw,26px)] border bg-white/[0.015] p-6 backdrop-blur-sm transition-all duration-400 hover:bg-white/[0.035] sm:p-7 ${category.accentBorder} ${category.accentHover}`}
              >
                {/* subtle top gradient on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-x-0 top-0 h-24 rounded-t-[inherit] bg-gradient-to-b from-white/[0.025] to-transparent" />
                </div>

                <div className="relative flex flex-col">
                  {/* icon + title */}
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${category.iconShellClass}`}
                    >
                      <Icon className="h-[1.05rem] w-[1.05rem]" />
                    </div>
                    <h3 className="text-[0.95rem] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[1rem]">
                      {category.title}
                    </h3>
                  </div>

                  {/* separator */}
                  <div className="my-5 h-px w-full bg-white/[0.05]" />

                  {/* items */}
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
                        <span className="text-[0.84rem] leading-[1.6] text-slate-400 transition-colors duration-200 group-hover:text-slate-350">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
