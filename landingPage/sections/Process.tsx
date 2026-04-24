"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  FiTarget,
  FiInbox,
  FiSend,
  FiCheckCircle,
  FiTrendingUp,
  FiSettings,
  FiDatabase,
  FiLayers,
  FiActivity,
  FiEye,
} from "react-icons/fi";
import { SectionHeader } from "@/design/SectionHeader";

type Side = "left" | "right";

interface Step {
  n: string;
  side: Side;
  title: string;
  copy: string;
  icon: React.ReactNode;
  // viewBox-space anchor (top-left of card), within 0..1200 x 0..1500
  x: number;
  y: number;
  // gentle float seed
  float: number;
}

interface Arrow {
  d: string;
  // Where in scroll progress (0..1) this arrow draws
  start: number;
  end: number;
  dashed?: boolean;
  width?: number;
}

interface ProcessMapData {
  side: Side;
  steps: Step[];
  arrows: Arrow[];
}

const CARD_W = 380;
const CARD_H = 152;
const VB_W = 1200;
const VB_H = 1520;

const MAP_LABELS: Record<Side, string> = {
  left: "Layer",
  right: "Outcome",
};

const MAP_META: Record<
  Side,
  {
    badgeClassName: string;
    glowClassName: string;
  }
> = {
  left: {
    badgeClassName: "border-violet-400/20 bg-violet-400/10 text-violet-200/80",
    glowClassName: "bg-violet-500/10",
  },
  right: {
    badgeClassName: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200/80",
    glowClassName: "bg-cyan-500/10",
  },
};

const MAP_ORDER: readonly Side[] = ["left", "right"];

const MAP_LAYOUT = {
  // Horizontal padding in viewBox units. Keep between 80 and 220 so cards stay centered and unclipped.
  horizontalPadding: 140,
  // Vertical padding in viewBox units. Keep between 60 and 180 to preserve breathing room at the map edges.
  verticalPadding: 96,
  // Connector bend in viewBox units. Keep between 60 and 180 for readable curves between cards.
  connectorCurve: 110,
  // Connector lift in viewBox units. Keep between 24 and 120 to avoid flat or overly dramatic paths.
  connectorLift: 56,
} as const;

const MAP_ANIMATION = {
  // Connector draw start in scroll progress. Keep between 0 and 0.25 so arrows begin after the map enters view.
  connectorStart: 0.12,
  // Total connector stagger span in scroll progress. Keep between 0.4 and 0.7 for even distribution.
  connectorSpan: 0.56,
  // Individual connector draw duration in scroll progress. Keep between 0.12 and 0.24 for smooth tracing.
  connectorDuration: 0.18,
} as const;

// Cards intentionally placed off-grid to feel organic, not diagrammatic.
const steps: Step[] = [
  {
    n: "01",
    side: "left",
    title: "System Setup",
    copy: "Infrastructure, routing logic, and qualification framework built around your ICP.",
    icon: <FiSettings />,
    x: 30,
    y: 60,
    float: 0,
  },
  {
    n: "01",
    side: "right",
    title: "Align",
    copy: "We define your ICP, qualification criteria, and what a real opportunity looks like.",
    icon: <FiTarget />,
    x: 790,
    y: 130,
    float: 1,
  },
  {
    n: "02",
    side: "left",
    title: "Signal & Data Layer",
    copy: "Leads enriched, verified, and scored before any outreach or booking.",
    icon: <FiDatabase />,
    x: 90,
    y: 380,
    float: 2,
  },
  {
    n: "02",
    side: "right",
    title: "Capture",
    copy: "Inbound sources go live \u2014 every lead is captured, enriched, and routed automatically.",
    icon: <FiInbox />,
    x: 740,
    y: 430,
    float: 3,
  },
  {
    n: "03",
    side: "left",
    title: "Multi-Channel Execution",
    copy: "Email + LinkedIn + inbound working together \u2014 not in silos.",
    icon: <FiLayers />,
    x: 10,
    y: 700,
    float: 4,
  },
  {
    n: "03",
    side: "right",
    title: "Generate",
    copy: "Outbound activates to create additional pipeline alongside inbound demand.",
    icon: <FiSend />,
    x: 820,
    y: 740,
    float: 5,
  },
  {
    n: "04",
    side: "left",
    title: "Deal Intelligence Layer",
    copy: "Call insights, intent signals, and follow-ups automated after every interaction.",
    icon: <FiActivity />,
    x: 100,
    y: 1020,
    float: 6,
  },
  {
    n: "04",
    side: "right",
    title: "Convert",
    copy: "Every meeting is followed up automatically. No deal goes cold. Opportunities are worked until outcome.",
    icon: <FiCheckCircle />,
    x: 770,
    y: 1060,
    float: 7,
  },
  {
    n: "05",
    side: "left",
    title: "Pipeline Visibility",
    copy: "Every deal, stage, and next step tracked \u2014 full transparency.",
    icon: <FiEye />,
    x: 50,
    y: 1340,
    float: 8,
  },
  {
    n: "05",
    side: "right",
    title: "Close & Scale",
    copy: "Deals convert. Pipeline becomes predictable. System keeps compounding.",
    icon: <FiTrendingUp />,
    x: 800,
    y: 1330,
    float: 9,
  },
];

function remapStepsForStandaloneMap(group: Step[]): Step[] {
  const xValues = group.map((step) => step.x);
  const yValues = group.map((step) => step.y);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const xSpan = Math.max(maxX - minX, 1);
  const ySpan = Math.max(maxY - minY, 1);

  return group.map((step, index) => ({
    ...step,
    x:
      MAP_LAYOUT.horizontalPadding +
      ((step.x - minX) / xSpan) *
        (VB_W - MAP_LAYOUT.horizontalPadding * 2 - CARD_W),
    y:
      MAP_LAYOUT.verticalPadding +
      ((step.y - minY) / ySpan) *
        (VB_H - MAP_LAYOUT.verticalPadding * 2 - CARD_H),
    float: index,
  }));
}

function buildStandaloneArrows(group: Step[]): Arrow[] {
  const connectionCount = group.length - 1;
  if (connectionCount < 1) return [];

  const staggerDenominator = Math.max(connectionCount - 1, 1);

  return group.slice(0, -1).map((step, index) => {
    const nextStep = group[index + 1];
    const startX = step.x + CARD_W / 2;
    const startY = step.y + CARD_H;
    const endX = nextStep.x + CARD_W / 2;
    const endY = nextStep.y;
    const bendDirection = endX >= startX ? 1 : -1;
    const controlY = (startY + endY) / 2;
    const start =
      MAP_ANIMATION.connectorStart +
      (index / staggerDenominator) * MAP_ANIMATION.connectorSpan;

    return {
      d: `M ${startX} ${startY} C ${startX + bendDirection * MAP_LAYOUT.connectorCurve} ${
        controlY - MAP_LAYOUT.connectorLift
      }, ${endX + bendDirection * MAP_LAYOUT.connectorCurve} ${
        controlY + MAP_LAYOUT.connectorLift
      }, ${endX} ${endY}`,
      start,
      end: Math.min(start + MAP_ANIMATION.connectorDuration, 0.98),
      dashed: index % 2 === 1,
      width: 1.25,
    };
  });
}

const PROCESS_MAPS: ProcessMapData[] = MAP_ORDER.map((side) => {
  const mapSteps = remapStepsForStandaloneMap(
    steps.filter((step) => step.side === side),
  );
  return {
    side,
    steps: mapSteps,
    arrows: buildStandaloneArrows(mapSteps),
  };
});

function AnimatedArrow({
  d,
  scrollProgress,
  start,
  end,
  dashed,
  gradientId,
  markerId,
  width = 1.4,
}: {
  d: string;
  scrollProgress: MotionValue<number>;
  start: number;
  end: number;
  dashed?: boolean;
  gradientId: string;
  markerId: string;
  width?: number;
}) {
  const pathLength = useTransform(scrollProgress, [start, end], [0, 1]);
  const opacity = useTransform(
    scrollProgress,
    [start, start + 0.02, end],
    [0, 1, 1],
  );

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={`url(#${gradientId})`}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? "4 6" : undefined}
      style={{ pathLength, opacity }}
      markerEnd={`url(#${markerId})`}
    />
  );
}

interface MapCardProps {
  step: Step;
}

function MapCard({ step }: MapCardProps) {
  const isRight = step.side === "right";
  const accent = isRight
    ? "from-cyan-300/70 via-sky-300/40 to-transparent"
    : "from-violet-300/60 via-fuchsia-300/30 to-transparent";
  const iconTint = isRight ? "text-cyan-200" : "text-violet-200";
  const labelTint = isRight ? "text-cyan-200/70" : "text-violet-200/70";

  const drift = step.float;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${(step.x / VB_W) * 100}%`,
        top: `${(step.y / VB_H) * 100}%`,
        width: `${(CARD_W / VB_W) * 100}%`,
      }}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.7,
        delay: drift * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        whileHover={{
          y: -4,
          scale: 1.02,
          transition: { type: "spring", stiffness: 240, damping: 18 },
        }}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/6 to-white/1.5 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
        style={{ minHeight: CARD_H }}
      >
        <span
          aria-hidden
          className={`absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b ${accent}`}
        />
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${
            isRight ? "bg-cyan-400/30" : "bg-violet-400/30"
          }`}
        />

        <div className="relative flex items-start gap-3">
          <div
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[1.05rem] ${iconTint}`}
          >
            {step.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center">
              <span
                className={`font-mono text-[0.65rem] tracking-[0.24em] uppercase ${labelTint}`}
              >
                {step.n}
              </span>
            </div>
            <h3 className="mt-1 text-[1.05rem] font-semibold tracking-[-0.02em] text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-[0.84rem] leading-[1.55] text-white/55">
              {step.copy}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProcessMapSection({ map }: { map: ProcessMapData }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mapRef,
    offset: ["start 85%", "end 30%"],
  });
  const arrowGradientId = `${map.side}-arrow-grad`;
  const arrowHeadId = `${map.side}-arrow-head`;
  const mapMeta = MAP_META[map.side];

  return (
    <div className="space-y-6">
      <div>
        <span
          className={`inline-flex rounded-full border px-5 py-2 text-[0.95rem] font-semibold uppercase tracking-[0.24em] ${mapMeta.badgeClassName}`}
        >
          {MAP_LABELS[map.side]}
        </span>
      </div>

      <div
        ref={mapRef}
        className="relative hidden lg:block"
        style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] ${mapMeta.glowClassName}`}
        />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <linearGradient
              id={arrowGradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(167,139,250,0.55)" />
              <stop offset="50%" stopColor="rgba(125,211,252,0.55)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0.55)" />
            </linearGradient>
            <marker
              id={arrowHeadId}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(125,211,252,0.85)" />
            </marker>
          </defs>

          {map.arrows.map((arrow) => (
            <AnimatedArrow
              key={arrow.d}
              d={arrow.d}
              scrollProgress={scrollYProgress}
              start={arrow.start}
              end={arrow.end}
              dashed={arrow.dashed}
              gradientId={arrowGradientId}
              markerId={arrowHeadId}
              width={arrow.width}
            />
          ))}
        </svg>

        {map.steps.map((step) => (
          <MapCard key={`${step.side}-${step.n}`} step={step} />
        ))}
      </div>

      <div className="grid gap-5 lg:hidden sm:grid-cols-2">
        {map.steps.map((step) => (
          <MobileCard key={`${step.side}-${step.n}`} step={step} />
        ))}
      </div>
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="relative py-28 sm:py-36">
      <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
        <SectionHeader
          title="HOW IT "
          highlight="WORKS"
          subtitle="From first touch to closed deal - 2 Continue Pipeline."
          align="left"
          size="lg"
        />

        <div className="mt-16 space-y-12 sm:mt-20 sm:space-y-16">
          {PROCESS_MAPS.map((map) => (
            <ProcessMapSection key={map.side} map={map} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileCard({ step }: { step: Step }) {
  const isRight = step.side === "right";
  const iconTint = isRight ? "text-cyan-200" : "text-violet-200";
  const labelTint = isRight ? "text-cyan-200/70" : "text-violet-200/70";
  const accent = isRight
    ? "from-cyan-300/70 via-sky-300/40 to-transparent"
    : "from-violet-300/60 via-fuchsia-300/30 to-transparent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.015] p-5 backdrop-blur-xl"
    >
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b ${accent}`}
      />
      <div className="flex items-start gap-3">
        <div
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${iconTint}`}
        >
          {step.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center">
            <span
              className={`font-mono text-[0.65rem] uppercase tracking-[0.24em] ${labelTint}`}
            >
              {step.n}
            </span>
          </div>
          <h3 className="mt-1 text-[1.05rem] font-semibold tracking-[-0.02em] text-white">
            {step.title}
          </h3>
          <p className="mt-2 text-[0.86rem] leading-[1.6] text-white/55">
            {step.copy}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Process;
