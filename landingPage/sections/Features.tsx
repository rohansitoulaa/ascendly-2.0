"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Reveal } from "@/animations/Reveal";
import { TextReveal } from "@/animations/TextReveal";

const ScrollStack = dynamic(
  () => import("@/landingPage/components/ScrollStack"),
  { ssr: false },
);

type RevealStyle = "fade-up" | "blur-in" | "mask-sweep" | "wave" | "scale-char";

interface FeatureGradient {
  from: string;
  via: string;
  to: string;
}

interface Metric {
  label: string;
  value: string;
  trend: number[];
}

interface Feature {
  number: string;
  title: string;
  hook: string;
  paragraphs: string[];
  focusLine?: string;
  proofLine?: string;
  gradient: FeatureGradient;
  hookRevealStyle: RevealStyle;
  surface: {
    base: string;
    accent: string;
    ring: string;
  };
  metrics: [Metric, Metric, Metric];
}

const features: Feature[] = [
  {
    number: "01",
    title: "Inbound Capture System",
    hook: "Never miss a high-intent lead again",
    paragraphs: [
      "Your best leads are already interacting with your business. Visiting your site, checking your pricing, engaging on LinkedIn. Most companies never see this in time.",
      "We build a system that identifies those people, enriches them, and routes them into outreach automatically. Within minutes, not days.",
      "By the time someone else is manually checking forms or inboxes, you've already reached out.",
    ],
    focusLine: "Small gap. Big difference.",
    proofLine:
      "Website visitors are identified and routed into your system within ~15 minutes.",
    gradient: { from: "#22d3ee", via: "#3b82f6", to: "#6366f1" },
    hookRevealStyle: "blur-in",
    surface: {
      base: "linear-gradient(160deg, rgba(9,22,36,0.92) 0%, rgba(6,12,22,0.96) 55%, rgba(4,8,14,0.98) 100%)",
      accent: "rgba(59,130,246,0.08)",
      ring: "rgba(99,102,241,0.22)",
    },
    metrics: [
      { label: "Time to Reach", value: "~15m", trend: [40, 38, 34, 28, 22, 18, 15] },
      { label: "Match Rate", value: "84%", trend: [52, 58, 63, 69, 74, 79, 84] },
      { label: "Intent Lift", value: "3.4×", trend: [1, 1.4, 1.9, 2.3, 2.7, 3.1, 3.4] },
    ],
  },
  {
    number: "02",
    title: "Lead Qualification Framework",
    hook: "More meetings doesn't fix pipeline. Better meetings do.",
    paragraphs: [
      "Most pipelines are inflated with low-quality calls that were never going to close.",
      "We filter that out before it ever hits your calendar.",
      "Every lead is enriched with context. Company size, role relevance, buying signals. Then it's scored and prioritised so you only speak to people who actually make sense.",
    ],
    focusLine: "This is where conversion starts, not after the call.",
    gradient: { from: "#a78bfa", via: "#d946ef", to: "#ec4899" },
    hookRevealStyle: "fade-up",
    surface: {
      base: "linear-gradient(160deg, rgba(24,10,32,0.92) 0%, rgba(14,6,22,0.96) 55%, rgba(8,4,14,0.98) 100%)",
      accent: "rgba(217,70,239,0.08)",
      ring: "rgba(236,72,153,0.22)",
    },
    metrics: [
      { label: "Noise Filtered", value: "62%", trend: [20, 28, 35, 44, 50, 56, 62] },
      { label: "ICP Fit", value: "91%", trend: [60, 67, 73, 78, 84, 88, 91] },
      { label: "Show Rate", value: "78%", trend: [48, 53, 58, 64, 70, 74, 78] },
    ],
  },
  {
    number: "03",
    title: "Smart Routing Engine",
    hook: "Some prospects reply to email. Others ignore it completely but respond instantly on LinkedIn.",
    paragraphs: [
      "Instead of guessing, we run both in parallel and let the system do the work.",
      "Email sequences and LinkedIn touchpoints are coordinated, not separate. Leads are routed based on behaviour, profile, and engagement.",
    ],
    focusLine: "That alone lifts response rates without increasing volume.",
    proofLine:
      "3-step email + 4-touch LinkedIn sequences running together, not in isolation.",
    gradient: { from: "#38bdf8", via: "#6366f1", to: "#a855f7" },
    hookRevealStyle: "mask-sweep",
    surface: {
      base: "linear-gradient(160deg, rgba(10,18,36,0.92) 0%, rgba(8,10,28,0.96) 55%, rgba(5,6,18,0.98) 100%)",
      accent: "rgba(99,102,241,0.08)",
      ring: "rgba(168,85,247,0.22)",
    },
    metrics: [
      { label: "Email Reply", value: "6.8%", trend: [2, 2.8, 3.6, 4.4, 5.2, 6.0, 6.8] },
      { label: "LI Accept", value: "54%", trend: [28, 32, 38, 43, 47, 51, 54] },
      { label: "Multi-Touch Lift", value: "2.1×", trend: [1, 1.2, 1.4, 1.6, 1.8, 2.0, 2.1] },
    ],
  },
  {
    number: "04",
    title: "Outbound Pipeline Engine",
    hook: "This is where consistency comes from",
    paragraphs: [
      "Outbound fails when it's treated like a campaign. It works when it's treated like infrastructure.",
      "We don't send blasts. We build a system that runs every day.",
      "Lists are enriched continuously. Signals are monitored. Outreach is personalised and sequenced properly. Replies are handled instantly.",
    ],
    focusLine: "The result is simple. Pipeline doesn't spike. It flows.",
    proofLine:
      "Positive replies are responded to with booking links in ~60 seconds.",
    gradient: { from: "#34d399", via: "#14b8a6", to: "#06b6d4" },
    hookRevealStyle: "scale-char",
    surface: {
      base: "linear-gradient(160deg, rgba(6,28,28,0.92) 0%, rgba(5,18,22,0.96) 55%, rgba(3,10,14,0.98) 100%)",
      accent: "rgba(20,184,166,0.08)",
      ring: "rgba(6,182,212,0.22)",
    },
    metrics: [
      { label: "Reply Speed", value: "~60s", trend: [320, 260, 210, 170, 130, 90, 60] },
      { label: "Daily Touches", value: "480", trend: [120, 180, 240, 300, 360, 420, 480] },
      { label: "Pipeline / Mo", value: "+37%", trend: [10, 14, 19, 24, 28, 33, 37] },
    ],
  },
  {
    number: "05",
    title: "AI-Powered Deal Follow-Up",
    hook: "The deal doesn't end when the call does",
    paragraphs: [
      "Most teams lose deals in the gap between conversations.",
      "One follow-up. Then nothing.",
      "We remove that gap completely.",
      "Every call is recorded and analysed. Interest level, objections, timeline, next steps. Then a personalised follow-up is drafted within minutes, based on the actual conversation.",
    ],
    focusLine: "Nothing generic. Nothing forgotten.",
    proofLine: "Follow-up is ready within ~2 minutes of the call ending.",
    gradient: { from: "#fbbf24", via: "#fb923c", to: "#f43f5e" },
    hookRevealStyle: "blur-in",
    surface: {
      base: "linear-gradient(160deg, rgba(32,14,8,0.92) 0%, rgba(22,10,8,0.96) 55%, rgba(14,6,6,0.98) 100%)",
      accent: "rgba(251,146,60,0.08)",
      ring: "rgba(244,63,94,0.22)",
    },
    metrics: [
      { label: "Draft Time", value: "~2m", trend: [18, 15, 12, 9, 6, 4, 2] },
      { label: "Reply Uplift", value: "+48%", trend: [12, 18, 24, 30, 36, 42, 48] },
      { label: "Deal Recall", value: "100%", trend: [62, 70, 78, 84, 90, 96, 100] },
    ],
  },
  {
    number: "06",
    title: "Stale Deal Reactivation",
    hook: "Most deals don't say no. They just disappear.",
    paragraphs: [
      "That's usually where revenue is lost.",
      "We track every open deal daily. When something changes, hiring, funding, activity, the system triggers re-engagement automatically.",
      "The timing is what matters. Not the message.",
    ],
    focusLine: "Deals you thought were gone come back into play.",
    gradient: { from: "#60a5fa", via: "#818cf8", to: "#c084fc" },
    hookRevealStyle: "fade-up",
    surface: {
      base: "linear-gradient(160deg, rgba(10,16,34,0.92) 0%, rgba(8,10,26,0.96) 55%, rgba(5,6,18,0.98) 100%)",
      accent: "rgba(129,140,248,0.08)",
      ring: "rgba(192,132,252,0.22)",
    },
    metrics: [
      { label: "Signals / Day", value: "210", trend: [60, 90, 120, 150, 180, 200, 210] },
      { label: "Reactivated", value: "22%", trend: [4, 7, 10, 13, 16, 19, 22] },
      { label: "Cycle Time", value: "−31%", trend: [0, 6, 11, 17, 22, 27, 31] },
    ],
  },
  {
    number: "07",
    title: "Live Pipeline Visibility",
    hook: "You shouldn't have to ask what's going on",
    paragraphs: [
      "Everything sits in one place. Every deal, every stage, every next step.",
      "Calls update the pipeline automatically. Follow-ups are logged. Status changes happen in real time.",
      "No chasing updates. No fragmented tools.",
    ],
    focusLine: "Just a clear view of what's moving and what's stuck.",
    proofLine: "Shared Notion pipeline with full visibility across all deals.",
    gradient: { from: "#c084fc", via: "#e879f9", to: "#fb7185" },
    hookRevealStyle: "mask-sweep",
    surface: {
      base: "linear-gradient(160deg, rgba(26,10,30,0.92) 0%, rgba(18,8,22,0.96) 55%, rgba(10,5,14,0.98) 100%)",
      accent: "rgba(232,121,249,0.08)",
      ring: "rgba(251,113,133,0.22)",
    },
    metrics: [
      { label: "Update Lag", value: "<1m", trend: [18, 14, 10, 6, 3, 2, 1] },
      { label: "Stages Tracked", value: "11", trend: [4, 5, 6, 7, 9, 10, 11] },
      { label: "Clarity Score", value: "9.4", trend: [6, 6.6, 7.2, 7.8, 8.4, 9.0, 9.4] },
    ],
  },
  {
    number: "08",
    title: "Revenue Attribution & ROI Tracking",
    hook: "Most agencies report activity. Emails sent. Replies. Meetings.",
    paragraphs: [
      "That's not what matters.",
      "We track what those meetings turn into. Pipeline created. Deals progressed. Revenue generated.",
      "You can see exactly what this system is producing, not just what it's doing.",
    ],
    focusLine: "And that changes how you make decisions.",
    gradient: { from: "#fde047", via: "#fb923c", to: "#dc2626" },
    hookRevealStyle: "blur-in",
    surface: {
      base: "linear-gradient(160deg, rgba(34,16,6,0.92) 0%, rgba(24,12,6,0.96) 55%, rgba(14,8,6,0.98) 100%)",
      accent: "rgba(251,146,60,0.08)",
      ring: "rgba(220,38,38,0.22)",
    },
    metrics: [
      { label: "Attribution", value: "98%", trend: [50, 60, 68, 76, 84, 92, 98] },
      { label: "ROI Signal", value: "4.2×", trend: [1, 1.6, 2.2, 2.7, 3.2, 3.7, 4.2] },
      { label: "Forecast Err.", value: "<7%", trend: [28, 24, 20, 16, 12, 9, 7] },
    ],
  },
];

const FEATURE_COUNT = features.length;

interface SparklineProps {
  id: string;
  values: number[];
  color: string;
}

function Sparkline({ id, values, color }: SparklineProps) {
  const { path, area, width, height } = useMemo(() => {
    const w = 132;
    const h = 40;
    if (!values.length) return { path: "", area: "", width: w, height: h };
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const step = values.length > 1 ? w / (values.length - 1) : w;
    const points = values.map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    });
    const p = `M ${points.join(" L ")}`;
    const a = `${p} L ${w},${h} L 0,${h} Z`;
    return { path: p, area: a, width: w, height: h };
  }, [values]);

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.32" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spark-${id})`} />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
  total: number;
}

function FeatureCard({ feature, index, total }: FeatureCardProps) {
  const gradientText = `linear-gradient(120deg, ${feature.gradient.from} 0%, ${feature.gradient.via} 50%, ${feature.gradient.to} 100%)`;
  const gradientSoft = `linear-gradient(135deg, ${feature.gradient.from} 0%, ${feature.gradient.via} 50%, ${feature.gradient.to} 100%)`;

  return (
    <article
      className="scroll-stack-card relative box-border w-full origin-top overflow-hidden rounded-[clamp(22px,3vw,36px)] border border-white/10 will-change-transform"
      style={{
        background: feature.surface.base,
        boxShadow: `0 40px 120px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px ${feature.surface.ring} inset`,
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="pointer-events-none absolute -top-40 -left-28 h-[22rem] w-[22rem] rounded-full opacity-40 blur-[110px]"
        style={{ background: feature.gradient.from }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-36 -right-24 h-[24rem] w-[24rem] rounded-full opacity-25 blur-[130px]"
        style={{ background: feature.gradient.to }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 82%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)]" />

      <div className="relative z-10 grid h-full min-h-[30rem] grid-rows-[auto_1fr_auto] gap-6 p-6 sm:p-8 md:min-h-0 md:h-[34rem] lg:h-[36rem] lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:grid-rows-[auto_1fr] lg:gap-12 lg:p-12">
        <div className="flex items-center justify-between gap-4 lg:col-span-2">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="text-[0.78rem] font-semibold tracking-[0.3em]"
              style={{
                backgroundImage: gradientText,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {feature.number}
            </span>
            <span
              className="h-px w-10 shrink-0"
              style={{ background: gradientSoft }}
              aria-hidden
            />
            <span className="truncate text-[0.62rem] uppercase tracking-[0.32em] text-white/44">
              {feature.title}
            </span>
          </div>
          <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.3em] text-white/32">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="flex min-h-0 flex-col">
          <TextReveal
            as="div"
            splitBy="word"
            style={feature.hookRevealStyle}
            amount={0.15}
            className="max-w-[30ch] text-[clamp(1.55rem,3.1vw,2.65rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-white"
          >
            {feature.hook}
          </TextReveal>

          <Reveal delay={0.1} direction="up" amount={0.2}>
            <div
              className="mt-5 h-[2px] w-20 rounded-full"
              style={{ background: gradientSoft }}
              aria-hidden
            />
          </Reveal>

          <div className="mt-6 max-w-[54ch] space-y-3">
            {feature.paragraphs.slice(0, 3).map((paragraph, paragraphIndex) => (
              <Reveal
                key={`${feature.number}-p-${paragraphIndex}`}
                delay={0.14 + paragraphIndex * 0.05}
                direction="up"
                amount={0.18}
              >
                <p className="text-[clamp(0.9rem,1.05vw,1rem)] leading-[1.7] text-white/58">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {feature.focusLine ? (
            <Reveal delay={0.32} direction="up" amount={0.2} className="mt-5">
              <p
                className="text-[clamp(1.05rem,1.45vw,1.28rem)] font-medium leading-[1.25] tracking-[-0.03em]"
                style={{
                  backgroundImage: gradientText,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {feature.focusLine}
              </p>
            </Reveal>
          ) : null}
        </div>

        <div className="flex min-h-0 flex-col gap-4 lg:justify-between">
          <div
            className="rounded-2xl border border-white/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            style={{ background: feature.surface.accent }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[0.56rem] font-medium uppercase tracking-[0.3em] text-white/40">
                Signal Layer
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.56rem] font-medium uppercase tracking-[0.24em]"
                style={{
                  borderColor: `${feature.gradient.via}55`,
                  color: feature.gradient.via,
                  background: `${feature.gradient.via}11`,
                }}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: feature.gradient.via }}
                />
                Live
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {feature.metrics.map((metric, metricIdx) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-white/8 bg-white/[0.02] p-2.5 sm:p-3"
                >
                  <div className="text-[0.52rem] uppercase tracking-[0.26em] text-white/36">
                    {metric.label}
                  </div>
                  <div
                    className="mt-1 text-[clamp(0.98rem,1.15vw,1.15rem)] font-semibold tracking-[-0.04em]"
                    style={{
                      backgroundImage: gradientText,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {metric.value}
                  </div>
                  <div className="mt-2">
                    <Sparkline
                      id={`${feature.number}-${metricIdx}`}
                      values={metric.trend}
                      color={feature.gradient.via}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {feature.proofLine ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-3">
                <span
                  className="mt-[0.44rem] h-[2px] w-8 shrink-0 rounded-full"
                  style={{ background: gradientSoft }}
                  aria-hidden
                />
                <div>
                  <p
                    className="text-[0.54rem] font-medium uppercase tracking-[0.32em]"
                    style={{
                      backgroundImage: gradientText,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Grounded Proof
                  </p>
                  <p className="mt-1.5 text-[0.84rem] leading-[1.55] text-white/55">
                    {feature.proofLine}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden rounded-2xl border border-dashed border-white/5 p-4 lg:block" />
          )}
        </div>
      </div>
    </article>
  );
}

export function Features() {
  return (
    <section
      id="systems"
      className="relative bg-[#05060a]"
      aria-label="Primary Features"
    >
      <div className="pointer-events-none sticky top-0 z-0 h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, rgba(15,22,38,0.55) 0%, rgba(5,6,10,0.9) 55%, rgba(5,6,10,1) 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          }}
          aria-hidden
        />
        <div
          className="absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full opacity-[0.18] blur-[160px]"
          style={{ background: "#3b82f6" }}
          aria-hidden
        />
        <div
          className="absolute -right-40 bottom-1/4 h-[28rem] w-[28rem] rounded-full opacity-[0.14] blur-[160px]"
          style={{ background: "#a855f7" }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 -mt-[100vh]">
        <div className="mx-auto w-full max-w-[1320px] px-6 pt-24 sm:px-10 md:pt-28 lg:pt-32">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-[0.68rem] uppercase tracking-[0.32em] text-white/42">
              Primary Features
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/32">
              01 / {String(FEATURE_COUNT).padStart(2, "0")}
            </span>
          </div>
          <Reveal direction="up" amount={0.2}>
            <h2 className="mt-5 max-w-[22ch] text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white">
              A stack of systems that compound into revenue.
            </h2>
          </Reveal>
        </div>

        <ScrollStack
          useWindowScroll
          disableOnMobile
          baseScale={0.9}
          itemScale={0.012}
          itemStackDistance={22}
          itemDistance={180}
          stackPosition="18%"
          scaleEndPosition="8%"
          blurAmount={1.4}
          releaseDistance={200}
          releaseOpacity={0.2}
          className="mx-auto w-full max-w-[1320px]"
          innerClassName="px-6 pt-10 pb-24 sm:px-10 md:pt-[8vh] md:pb-[34rem]"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.number}
              feature={feature}
              index={index}
              total={FEATURE_COUNT}
            />
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}

export default Features;
