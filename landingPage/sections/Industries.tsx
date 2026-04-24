"use client";

import { motion } from "motion/react";
import {
  FiBriefcase,
  FiCpu,
  FiSettings,
  FiTrendingUp,
} from "react-icons/fi";
import { SectionHeader } from "@/design/SectionHeader";
import { TiltCard } from "@/animations/TiltCard";
import { Reveal } from "@/animations/Reveal";
import { Counter } from "@/animations/Counter";

const INDUSTRIES_SECTION = {
  // Counter duration in seconds for the revenue range. Keep between 1.8 and 3.2 so the finish eases out gradually.
  rangeCounterDuration: 2.6,
  // Reveal delay step in seconds between cards. Keep between 0.03 and 0.12 so the section cascades without feeling sluggish.
  cardRevealStep: 0.05,
} as const;

const industryGroups = [
  {
    icon: <FiTrendingUp />,
    title: "B2B GROWTH & MARKETING (high-ticket segment only)",
    items: [
      "Account-Based Marketing (ABM) Agencies",
      "Performance Creative & Media Buying Firms (enterprise clients)",
      "CRO (Conversion Rate Optimization) Agencies",
      "PR & Earned Media Firms (enterprise positioning)",
    ],
  },
  {
    icon: <FiCpu />,
    title: "TECH + INFRASTRUCTURE",
    items: [
      "Cybersecurity & MSSPs",
      "Cloud Migration & DevOps Firms",
      "ERP / NetSuite Implementation",
      "Data Infrastructure & BI Consulting",
    ],
  },
  {
    icon: <FiSettings />,
    title: "INDUSTRIAL / REAL-WORLD SALES",
    items: [
      "Commercial Solar (C&I)",
      "Industrial Automation & Robotics",
      "Logistics & 3PL Providers",
      "Equipment Leasing / Financing",
    ],
  },
  {
    icon: <FiBriefcase />,
    title: "ADVISORY / HIGH-TICKET SERVICES",
    items: [
      "Fractional CMO / CRO / CFO Firms",
      "Executive Search & Headhunting Firms",
      "R&D Tax Credit Consultants",
      "Corporate Insurance / Benefits Brokers",
    ],
  },
];

function RevenueRange() {
  return (
    <span className="inline-flex items-baseline whitespace-nowrap font-semibold text-white">
      <Counter
        to={30}
        prefix="$"
        suffix="k"
        duration={INDUSTRIES_SECTION.rangeCounterDuration}
        className="tabular-nums"
      />
      <span aria-hidden>–</span>
      <Counter
        to={3}
        prefix="$"
        suffix="M+"
        duration={INDUSTRIES_SECTION.rangeCounterDuration}
        className="tabular-nums"
      />
    </span>
  );
}

export function Industries() {
  return (
    <section id="industries" className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
        <SectionHeader
          title="Industries we serve"
          highlight="(Revenue Automation Service)"
          subtitle=""
          align="left"
          size="lg"
        />

        <div className="mt-6 max-w-[76ch] space-y-4 text-[0.98rem] leading-8 text-white/62 sm:mt-8 sm:text-[1.04rem]">
          <p>
            Built for B2B companies where each customer is worth <RevenueRange />
          </p>
          <p>
            Typically involves multi-step sales cycles, multiple stakeholders,
            and follow-up beyond the first call.
          </p>
          <p className="font-medium text-white/82">
            Not designed for transactional or low-ticket sales.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-20 lg:grid-cols-2">
          {industryGroups.map((group, index) => (
            <Reveal
              key={group.title}
              direction="up"
              delay={index * INDUSTRIES_SECTION.cardRevealStep}
            >
              <TiltCard max={5} className="h-full rounded-[24px]">
                <div className="relative h-full overflow-hidden rounded-[24px] border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-7 backdrop-blur-xl sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-[1.1rem] text-cyan-200">
                      {group.icon}
                    </span>
                    <h3 className="max-w-[26ch] text-[0.9rem] font-semibold leading-6 tracking-[0.18em] text-white/88 sm:text-[0.96rem]">
                      {group.title}
                    </h3>
                  </div>

                  <ul className="mt-7 space-y-3.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80"
                        />
                        <span className="text-[0.95rem] leading-7 text-white/64 sm:text-[1rem]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0.2 }}
                    whileHover={{ opacity: 0.5 }}
                    className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-cyan-400/12 blur-[90px]"
                  />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Industries;
