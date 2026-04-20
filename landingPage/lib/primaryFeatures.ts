export interface LocalPoint {
  x: number;
  y: number;
}

export interface PrimaryFeatureTheme {
  badgeClassName: string;
  cardGlowClassName: string;
  detailClassName: string;
  numberClassName: string;
  orbClassName: string;
  panelClassName: string;
  pillClassName: string;
  ruleClassName: string;
}

export interface PrimaryFeatureItem {
  eyebrow: string;
  signalLabels: string[];
  supportPoints: string[];
  summary: string;
  theme: PrimaryFeatureTheme;
  title: string;
}

export const PRIMARY_FEATURES: PrimaryFeatureItem[] = [
  {
    eyebrow: "Capture",
    signalLabels: ["Forms", "Inbound", "Hand-Raisers"],
    supportPoints: [
      "Unify web forms, inbound campaigns, hand-raisers, and booked calls into one intake layer.",
      "Normalize source data automatically so nothing gets lost between channels or tools.",
      "Create a dependable first touchpoint before pipeline quality starts to drift.",
    ],
    summary:
      "Capture every lead automatically across all channels, with no manual gaps and no missed opportunities.",
    theme: {
      badgeClassName:
        "border-sky-300/20 bg-sky-400/10 text-sky-100/88 shadow-[0_12px_32px_rgba(56,189,248,0.14)]",
      cardGlowClassName:
        "bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.22),transparent_34%),radial-gradient(circle_at_12%_90%,rgba(125,211,252,0.12),transparent_28%)]",
      detailClassName:
        "border-sky-300/14 bg-sky-400/[0.06] text-sky-50/86",
      numberClassName: "text-sky-200/72",
      orbClassName:
        "bg-[radial-gradient(circle_at_30%_30%,rgba(186,230,253,0.92),rgba(14,165,233,0.3)_48%,transparent_72%)]",
      panelClassName:
        "border-sky-300/14 bg-[linear-gradient(180deg,rgba(56,189,248,0.12),rgba(8,47,73,0.08))]",
      pillClassName:
        "border-sky-300/16 bg-sky-400/[0.08] text-sky-100/74",
      ruleClassName: "from-sky-300/0 via-sky-300/28 to-sky-300/0",
    },
    title: "Inbound Capture System",
  },
  {
    eyebrow: "Qualify",
    signalLabels: ["Enrich", "Score", "Filter"],
    supportPoints: [
      "Append the context that matters before a rep ever sees the lead.",
      "Use scoring, enrichment, and filters to protect calendar quality from weak-fit volume.",
      "Surface only the conversations that are worth time, attention, and follow-through.",
    ],
    summary:
      "Every lead is enriched, scored, and filtered before it reaches your calendar, so you only see real opportunities.",
    theme: {
      badgeClassName:
        "border-emerald-300/18 bg-emerald-400/10 text-emerald-100/88 shadow-[0_12px_32px_rgba(52,211,153,0.13)]",
      cardGlowClassName:
        "bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.22),transparent_34%),radial-gradient(circle_at_10%_88%,rgba(110,231,183,0.1),transparent_24%)]",
      detailClassName:
        "border-emerald-300/14 bg-emerald-400/[0.06] text-emerald-50/86",
      numberClassName: "text-emerald-200/72",
      orbClassName:
        "bg-[radial-gradient(circle_at_30%_30%,rgba(209,250,229,0.92),rgba(16,185,129,0.3)_48%,transparent_72%)]",
      panelClassName:
        "border-emerald-300/14 bg-[linear-gradient(180deg,rgba(52,211,153,0.12),rgba(6,46,37,0.08))]",
      pillClassName:
        "border-emerald-300/16 bg-emerald-400/[0.08] text-emerald-100/74",
      ruleClassName: "from-emerald-300/0 via-emerald-300/26 to-emerald-300/0",
    },
    title: "Lead Qualification Framework",
  },
  {
    eyebrow: "Route",
    signalLabels: ["Email", "LinkedIn", "Owner Logic"],
    supportPoints: [
      "Detect intent and route the conversation into the channel most likely to convert.",
      "Keep email, LinkedIn, and sales motions aligned instead of duplicating outreach.",
      "Move qualified interest into the right operator, sequence, or workflow without friction.",
    ],
    summary:
      "High-intent leads go to the right channel, whether email or LinkedIn, maximizing response and conversion.",
    theme: {
      badgeClassName:
        "border-indigo-300/18 bg-indigo-400/10 text-indigo-100/88 shadow-[0_12px_32px_rgba(129,140,248,0.14)]",
      cardGlowClassName:
        "bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.22),transparent_34%),radial-gradient(circle_at_14%_88%,rgba(165,180,252,0.1),transparent_24%)]",
      detailClassName:
        "border-indigo-300/14 bg-indigo-400/[0.06] text-indigo-50/86",
      numberClassName: "text-indigo-200/72",
      orbClassName:
        "bg-[radial-gradient(circle_at_30%_30%,rgba(224,231,255,0.92),rgba(99,102,241,0.32)_48%,transparent_72%)]",
      panelClassName:
        "border-indigo-300/14 bg-[linear-gradient(180deg,rgba(129,140,248,0.12),rgba(30,27,75,0.08))]",
      pillClassName:
        "border-indigo-300/16 bg-indigo-400/[0.08] text-indigo-100/74",
      ruleClassName: "from-indigo-300/0 via-indigo-300/28 to-indigo-300/0",
    },
    title: "Smart Routing Engine",
  },
  {
    eyebrow: "Outbound",
    signalLabels: ["Accounts", "Sequences", "Volume"],
    supportPoints: [
      "Run outbound in parallel so pipeline volume does not rely on inbound timing alone.",
      "Target accounts deliberately instead of chasing random meetings with weak fit.",
      "Give operators a repeatable outbound engine that compounds alongside inbound demand.",
    ],
    summary:
      "Targeted outbound runs in parallel to inbound, adding volume and consistent pipeline, not random meetings.",
    theme: {
      badgeClassName:
        "border-amber-300/18 bg-amber-400/10 text-amber-100/88 shadow-[0_12px_32px_rgba(251,191,36,0.15)]",
      cardGlowClassName:
        "bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_34%),radial-gradient(circle_at_10%_88%,rgba(252,211,77,0.11),transparent_24%)]",
      detailClassName:
        "border-amber-300/14 bg-amber-400/[0.06] text-amber-50/86",
      numberClassName: "text-amber-200/72",
      orbClassName:
        "bg-[radial-gradient(circle_at_30%_30%,rgba(254,243,199,0.92),rgba(245,158,11,0.3)_48%,transparent_72%)]",
      panelClassName:
        "border-amber-300/14 bg-[linear-gradient(180deg,rgba(251,191,36,0.12),rgba(69,26,3,0.08))]",
      pillClassName:
        "border-amber-300/16 bg-amber-400/[0.08] text-amber-100/74",
      ruleClassName: "from-amber-300/0 via-amber-300/28 to-amber-300/0",
    },
    title: "Outbound Pipeline Engine",
  },
  {
    eyebrow: "Follow-Up",
    signalLabels: ["Post-Call", "Reminders", "Next Steps"],
    supportPoints: [
      "Trigger the next touch automatically after every call, demo, or decision point.",
      "Keep deal momentum alive without relying on manual reminders or rep memory.",
      "Continue until the deal closes cleanly or disqualifies with a clear outcome.",
    ],
    summary:
      "Every deal is followed up automatically after every call, until it closes or disqualifies.",
    theme: {
      badgeClassName:
        "border-fuchsia-300/18 bg-fuchsia-400/10 text-fuchsia-100/88 shadow-[0_12px_32px_rgba(232,121,249,0.14)]",
      cardGlowClassName:
        "bg-[radial-gradient(circle_at_top_right,rgba(232,121,249,0.22),transparent_34%),radial-gradient(circle_at_14%_88%,rgba(244,114,182,0.1),transparent_24%)]",
      detailClassName:
        "border-fuchsia-300/14 bg-fuchsia-400/[0.06] text-fuchsia-50/86",
      numberClassName: "text-fuchsia-200/72",
      orbClassName:
        "bg-[radial-gradient(circle_at_30%_30%,rgba(250,232,255,0.92),rgba(217,70,239,0.32)_48%,transparent_72%)]",
      panelClassName:
        "border-fuchsia-300/14 bg-[linear-gradient(180deg,rgba(232,121,249,0.12),rgba(74,4,78,0.08))]",
      pillClassName:
        "border-fuchsia-300/16 bg-fuchsia-400/[0.08] text-fuchsia-100/74",
      ruleClassName: "from-fuchsia-300/0 via-fuchsia-300/28 to-fuchsia-300/0",
    },
    title: "AI-Powered Deal Follow-Up",
  },
  {
    eyebrow: "Reactivate",
    signalLabels: ["Hiring", "Funding", "Intent"],
    supportPoints: [
      "Watch for hiring, funding, usage, and timing signals that change the buying window.",
      "Restart stalled conversations with context, instead of generic check-ins that feel cold.",
      "Bring dormant opportunities back into motion only when the timing becomes real again.",
    ],
    summary:
      "Cold opportunities are automatically re-engaged based on real signals such as timing, hiring, funding, and activity.",
    theme: {
      badgeClassName:
        "border-lime-300/18 bg-lime-400/10 text-lime-100/88 shadow-[0_12px_32px_rgba(163,230,53,0.14)]",
      cardGlowClassName:
        "bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.2),transparent_34%),radial-gradient(circle_at_12%_88%,rgba(190,242,100,0.1),transparent_24%)]",
      detailClassName:
        "border-lime-300/14 bg-lime-400/[0.06] text-lime-50/86",
      numberClassName: "text-lime-200/72",
      orbClassName:
        "bg-[radial-gradient(circle_at_30%_30%,rgba(236,252,203,0.92),rgba(132,204,22,0.32)_48%,transparent_72%)]",
      panelClassName:
        "border-lime-300/14 bg-[linear-gradient(180deg,rgba(163,230,53,0.12),rgba(26,46,5,0.08))]",
      pillClassName:
        "border-lime-300/16 bg-lime-400/[0.08] text-lime-100/74",
      ruleClassName: "from-lime-300/0 via-lime-300/28 to-lime-300/0",
    },
    title: "Stale Deal Reactivation",
  },
  {
    eyebrow: "Visibility",
    signalLabels: ["Stages", "Ownership", "Forecast"],
    supportPoints: [
      "Track every stage, owner, and next step in one shared operating view.",
      "Expose live movement across the pipeline so teams stop working from mismatched versions.",
      "Make deal flow visible enough to spot friction before it compounds into lost revenue.",
    ],
    summary:
      "Track every deal, stage, and next step in real time through a shared system with full transparency.",
    theme: {
      badgeClassName:
        "border-cyan-300/18 bg-cyan-400/10 text-cyan-100/88 shadow-[0_12px_32px_rgba(34,211,238,0.14)]",
      cardGlowClassName:
        "bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.2),transparent_34%),radial-gradient(circle_at_12%_88%,rgba(103,232,249,0.1),transparent_24%)]",
      detailClassName:
        "border-cyan-300/14 bg-cyan-400/[0.06] text-cyan-50/86",
      numberClassName: "text-cyan-200/72",
      orbClassName:
        "bg-[radial-gradient(circle_at_30%_30%,rgba(207,250,254,0.92),rgba(6,182,212,0.32)_48%,transparent_72%)]",
      panelClassName:
        "border-cyan-300/14 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(8,51,68,0.08))]",
      pillClassName:
        "border-cyan-300/16 bg-cyan-400/[0.08] text-cyan-100/74",
      ruleClassName: "from-cyan-300/0 via-cyan-300/28 to-cyan-300/0",
    },
    title: "Live Pipeline Visibility",
  },
  {
    eyebrow: "Attribution",
    signalLabels: ["Pipeline", "Revenue", "ROI"],
    supportPoints: [
      "Connect pipeline creation to revenue outcomes instead of stopping at meetings booked.",
      "See which systems, channels, and campaigns are actually producing commercial impact.",
      "Turn reporting into a decision layer that supports budget, strategy, and next moves.",
    ],
    summary:
      "Know exactly what pipeline and revenue is generated, not just meetings or vanity metrics.",
    theme: {
      badgeClassName:
        "border-rose-300/18 bg-rose-400/10 text-rose-100/88 shadow-[0_12px_32px_rgba(251,113,133,0.14)]",
      cardGlowClassName:
        "bg-[radial-gradient(circle_at_top_right,rgba(251,113,133,0.22),transparent_34%),radial-gradient(circle_at_12%_88%,rgba(253,164,175,0.1),transparent_24%)]",
      detailClassName:
        "border-rose-300/14 bg-rose-400/[0.06] text-rose-50/86",
      numberClassName: "text-rose-200/72",
      orbClassName:
        "bg-[radial-gradient(circle_at_30%_30%,rgba(255,228,230,0.92),rgba(244,63,94,0.32)_48%,transparent_72%)]",
      panelClassName:
        "border-rose-300/14 bg-[linear-gradient(180deg,rgba(251,113,133,0.12),rgba(76,5,25,0.08))]",
      pillClassName:
        "border-rose-300/16 bg-rose-400/[0.08] text-rose-100/74",
      ruleClassName: "from-rose-300/0 via-rose-300/28 to-rose-300/0",
    },
    title: "Revenue Attribution & ROI Tracking",
  },
];

export function getViewportCenter(rect: DOMRect): LocalPoint {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

export function toLocalPoint(
  containerRect: DOMRect,
  point: LocalPoint,
): LocalPoint {
  return {
    x: point.x - containerRect.left,
    y: point.y - containerRect.top,
  };
}
