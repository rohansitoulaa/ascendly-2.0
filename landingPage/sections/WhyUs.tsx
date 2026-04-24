"use client";

import { motion } from "motion/react";
import { FiCheck } from "react-icons/fi";
import { SectionHeader } from "@/design/SectionHeader";
import { Reveal } from "@/animations/Reveal";
import { GlassCard } from "@/design/GlassCard";

type ReasonBlock =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "list";
      items: string[];
    };

interface Reason {
  title: string;
  blocks: ReasonBlock[];
}

const WHY_US_SECTION = {
  // Reveal delay step in seconds between cards. Keep between 0.03 and 0.12 so the cascade stays crisp.
  cardRevealStep: 0.05,
} as const;

const reasons: Reason[] = [
  {
    title: "1. We’re accountable to revenue, not activity",
    blocks: [
      { type: "text", value: "Most agencies report:" },
      { type: "list", items: ["emails sent", "replies", "meetings"] },
      { type: "text", value: "We focus on:" },
      {
        type: "text",
        value: "pipeline created, deals progressed, and revenue generated",
      },
    ],
  },
  {
    title: "2. We don’t stop at meetings",
    blocks: [
      { type: "text", value: "Most outbound breaks after booking." },
      {
        type: "list",
        items: [
          "track every opportunity",
          "follow up automatically",
          "re-engage stalled deals",
        ],
      },
      {
        type: "text",
        value:
          "No deal is left to die in your pipeline and waste where you have invested in",
      },
    ],
  },
  {
    title: "3. System, not campaigns",
    blocks: [
      { type: "text", value: "Others run campaigns." },
      {
        type: "list",
        items: [
          "inbound capture",
          "outbound generation",
          "deal follow-up",
          "pipeline tracking",
        ],
      },
      {
        type: "text",
        value: "One system that continuously generates and converts pipeline",
      },
    ],
  },
  {
    title: "4. ROI before scale",
    blocks: [
      {
        type: "text",
        value: "We validate pipeline before scaling engagement",
      },
      {
        type: "list",
        items: [
          "Start with controlled volume",
          "Prove opportunity flow",
          "Then scale into full system",
        ],
      },
      { type: "text", value: "This sounds:" },
      {
        type: "list",
        items: ["credible", "safe", "Professional"],
      },
    ],
  },
  {
    title: "5. Built for high-value deals",
    blocks: [
      { type: "text", value: "We’re not designed for:" },
      {
        type: "list",
        items: ["low-ticket sales", "transactional funnels"],
      },
      {
        type: "text",
        value: "This is built for companies where each deal matters.",
      },
    ],
  },
];

export function WhyUs() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
        <SectionHeader
          kicker="Why Ascendly"
          title="Why you should choose"
          highlight="Ascendly:"
          align="left"
          size="lg"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-2">
          {reasons.map((reason, index) => (
            <Reveal
              key={reason.title}
              direction="up"
              delay={index * WHY_US_SECTION.cardRevealStep}
            >
              <GlassCard accent="none" tilt={false} className="h-full">
                <div className="flex h-full items-start gap-5 p-6 sm:p-7">
                  <motion.span
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                    className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-400/10 text-cyan-200 shadow-[0_0_14px_rgba(34,211,238,0.2)]"
                  >
                    <FiCheck className="h-4 w-4" strokeWidth={3} />
                  </motion.span>

                  <div className="flex flex-col">
                    <h4 className="text-[1.08rem] font-semibold tracking-[-0.02em] text-white sm:text-[1.14rem]">
                      {reason.title}
                    </h4>

                    <div className="mt-3 space-y-3">
                      {reason.blocks.map((block, blockIndex) => {
                        if (block.type === "text") {
                          return (
                            <p
                              key={`${reason.title}-text-${blockIndex}`}
                              className="text-[0.95rem] leading-[1.7] text-white/60"
                            >
                              {block.value}
                            </p>
                          );
                        }

                        return (
                          <ul
                            key={`${reason.title}-list-${blockIndex}`}
                            className="space-y-2.5"
                          >
                            {block.items.map((item) => (
                              <li key={item} className="flex items-start gap-3">
                                <span
                                  aria-hidden
                                  className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80"
                                />
                                <span className="text-[0.95rem] leading-[1.7] text-white/74">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
