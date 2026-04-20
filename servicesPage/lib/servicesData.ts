import type { IconType } from "react-icons";
import {
  FiActivity,
  FiBarChart2,
  FiCpu,
  FiDatabase,
  FiFilter,
  FiGitMerge,
  FiMail,
  FiMonitor,
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";

/* ── Pain points (Section 2) ───────────────────────────────── */

export interface PainPoint {
  label: string;
  detail: string;
}

export const painPoints: PainPoint[] = [
  {
    label: "Leads don't convert",
    detail: "You generate interest but can't turn it into revenue.",
  },
  {
    label: "CRM is messy",
    detail: "Deals stall because nothing is tracked or routed properly.",
  },
  {
    label: "Follow-ups are inconsistent",
    detail: "Prospects go cold while your team juggles manual tasks.",
  },
  {
    label: "Pipeline leaks everywhere",
    detail: "Opportunities slip through the cracks with no system to catch them.",
  },
];

/* ── Revenue automation flow (Section 3) ───────────────────── */

export interface FlowNode {
  title: string;
  description: string;
  icon: IconType;
  accentClass: string;
  iconBgClass: string;
}

export const flowNodes: FlowNode[] = [
  {
    title: "Outbound",
    description: "Generates pipeline through precision prospecting and multi-channel outreach.",
    icon: FiMail,
    accentClass: "border-sky-500/20",
    iconBgClass: "bg-sky-500/10 text-sky-400",
  },
  {
    title: "Inbound",
    description: "Captures demand from every channel and routes it instantly.",
    icon: FiFilter,
    accentClass: "border-emerald-500/20",
    iconBgClass: "bg-emerald-500/10 text-emerald-400",
  },
  {
    title: "CRM",
    description: "Tracks, scores, and routes every opportunity through your pipeline.",
    icon: FiDatabase,
    accentClass: "border-violet-500/20",
    iconBgClass: "bg-violet-500/10 text-violet-400",
  },
  {
    title: "Automation",
    description: "Ensures nothing drops — every lead followed up, every deal pushed forward.",
    icon: FiCpu,
    accentClass: "border-amber-500/20",
    iconBgClass: "bg-amber-500/10 text-amber-400",
  },
];

/* ── Core system gears (Section 4) ─────────────────────────── */

export interface GearCard {
  title: string;
  subtitle: string;
  points: string[];
  accentColor: string;
  borderClass: string;
  iconBgClass: string;
  glowClass: string;
}

export const gearCards: GearCard[] = [
  {
    title: "Outbound Engine",
    subtitle: "Generate pipeline consistently",
    points: [
      "ICP sourcing & list building",
      "Precision multi-channel outreach",
      "Calendar pipeline — meetings booked directly",
    ],
    accentColor: "sky",
    borderClass: "border-sky-500/15",
    iconBgClass: "bg-sky-500/10 text-sky-400",
    glowClass: "bg-sky-500/8",
  },
  {
    title: "Revenue Engine",
    subtitle: "Convert pipeline into revenue",
    points: [
      "CRM optimization & deal routing",
      "AI-powered follow-up sequences",
      "Pipeline tracking & forecasting",
      "Deal acceleration systems",
    ],
    accentColor: "emerald",
    borderClass: "border-emerald-500/15",
    iconBgClass: "bg-emerald-500/10 text-emerald-400",
    glowClass: "bg-emerald-500/8",
  },
];

/* ── What we build — 8 boxes (Section 5) ───────────────────── */

export interface ServiceBox {
  title: string;
  description: string;
  icon: IconType;
  accentClass: string;
}

export const serviceBoxes: ServiceBox[] = [
  {
    title: "Revenue Infrastructure Setup",
    description: "The foundation: CRM, tracking, routing, and reporting configured properly from day one.",
    icon: FiDatabase,
    accentClass: "text-sky-400",
  },
  {
    title: "ICP & Targeting System",
    description: "Data-driven ideal customer profiles with enriched prospect lists built to convert.",
    icon: FiTarget,
    accentClass: "text-violet-400",
  },
  {
    title: "Multi-Channel Outreach Engine",
    description: "Cold email, LinkedIn, and paid channels orchestrated into a single pipeline machine.",
    icon: FiMail,
    accentClass: "text-emerald-400",
  },
  {
    title: "Inbound Capture & Routing",
    description: "Every lead captured, qualified, and routed to the right person in under 60 seconds.",
    icon: FiFilter,
    accentClass: "text-amber-400",
  },
  {
    title: "CRM Optimization",
    description: "Clean data, smart stages, automated workflows — a CRM that actually drives revenue.",
    icon: FiGitMerge,
    accentClass: "text-cyan-400",
  },
  {
    title: "AI Follow-Up Systems",
    description: "Intelligent sequences that adapt to prospect behavior and never let a deal go cold.",
    icon: FiCpu,
    accentClass: "text-rose-400",
  },
  {
    title: "Pipeline Tracking Dashboard",
    description: "Real-time visibility into pipeline health, velocity, and conversion at every stage.",
    icon: FiMonitor,
    accentClass: "text-indigo-400",
  },
  {
    title: "Revenue Leak Detection",
    description: "Find and fix the gaps where deals drop off — before they cost you revenue.",
    icon: FiSearch,
    accentClass: "text-fuchsia-400",
  },
];

/* ── Timeline milestones (Section 6) ──────────────────────── */

export interface Milestone {
  week: string;
  title: string;
  description: string;
  icon: IconType;
}

export const milestones: Milestone[] = [
  {
    week: "Week 1–2",
    title: "Onboarding + System Setup",
    description: "We audit your current stack, configure your CRM, and build targeting lists.",
    icon: FiDatabase,
  },
  {
    week: "Week 2",
    title: "Inbound Live",
    description: "Capture forms, routing rules, and lead qualification go live.",
    icon: FiFilter,
  },
  {
    week: "Week 3",
    title: "Outbound Live",
    description: "Multi-channel outreach sequences launch against your ICP.",
    icon: FiMail,
  },
  {
    week: "Week 4–8",
    title: "Pipeline Builds",
    description: "Meetings book, pipeline grows, and data starts flowing into your dashboard.",
    icon: FiTrendingUp,
  },
  {
    week: "Week 7–10",
    title: "Deals Close",
    description: "Follow-ups convert pipeline to revenue. System optimizes based on real data.",
    icon: FiZap,
  },
];

/* ── Proof metrics (Section 7) ─────────────────────────────── */

export interface ProofMetric {
  metric: string;
  label: string;
  description: string;
  attribution: string;
}

export const proofMetrics: ProofMetric[] = [
  {
    metric: "$2.4M",
    label: "Pipeline Created",
    description: "New qualified pipeline generated within 90 days of system launch for a B2B SaaS client.",
    attribution: "B2B SaaS · Series A",
  },
  {
    metric: "3.2×",
    label: "Conversion Improved",
    description: "Lead-to-close conversion rate improved by rebuilding CRM workflows and follow-up sequences.",
    attribution: "Professional Services Firm",
  },
  {
    metric: "$840K",
    label: "Revenue Impact",
    description: "Closed revenue directly attributed to outbound engine in the first two quarters.",
    attribution: "Agency · 40-person team",
  },
];

/* ── Who this is for (Section 8) ──────────────────────────── */

export interface AudienceItem {
  title: string;
  description: string;
  icon: IconType;
}

export const audienceItems: AudienceItem[] = [
  {
    title: "High-ticket B2B",
    description: "$30K+ average customer value. Long sales cycles where every opportunity matters.",
    icon: FiBarChart2,
  },
  {
    title: "Agencies, SaaS & Consultants",
    description: "Service firms and software companies that need predictable, scalable pipeline.",
    icon: FiUsers,
  },
  {
    title: "Teams with a Sales Process",
    description: "You already sell. You need a system to capture, track, and convert at scale.",
    icon: FiActivity,
  },
];

/* ── Why us (Section 9) ───────────────────────────────────── */

export interface Differentiator {
  headline: string;
  description: string;
}

export const differentiators: Differentiator[] = [
  {
    headline: "We build systems, not campaigns",
    description: "Campaigns end. Systems compound. We design infrastructure that generates revenue long after onboarding is done.",
  },
  {
    headline: "Revenue-first approach",
    description: "We don't optimize for vanity metrics. Every decision is measured against pipeline created and deals closed.",
  },
  {
    headline: "No vanity metrics",
    description: "No reports full of impressions and open rates. We track meetings booked, pipeline created, and revenue generated.",
  },
];

/* ── FAQ (Section 10) ─────────────────────────────────────── */

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "How is this different from hiring an SDR team?",
    answer: "SDRs execute. We build the system they execute inside. Without the right infrastructure — targeting, sequencing, CRM routing, follow-up automation — even great SDRs underperform. We build the machine that makes every rep more effective.",
  },
  {
    question: "Do you replace our CRM?",
    answer: "No. We work inside your existing CRM (HubSpot, Salesforce, Pipedrive, etc.) and optimize it. We fix data hygiene, automate stage transitions, build reporting dashboards, and configure routing rules so your CRM actually drives revenue instead of collecting dust.",
  },
  {
    question: "How fast do we see results?",
    answer: "Most clients see inbound leads routed properly within Week 2, outbound pipeline building by Week 3, and qualified meetings on their calendar by Week 4. Closed deals typically start appearing between Week 7–10 depending on your sales cycle length.",
  },
  {
    question: "What's the minimum engagement?",
    answer: "We typically work in 90-day engagements. The first 30 days are system setup and launch; the remaining 60 are optimization, scaling, and handoff if needed. We don't do month-to-month retainers — systems take time to compound.",
  },
  {
    question: "Can we start with just outbound?",
    answer: "Yes. Our standalone Outbound Engine works independently. However, most clients upgrade to the full Revenue Automation System within 60 days once they see the pipeline it generates — because converting that pipeline requires the rest of the system.",
  },
  {
    question: "What industries do you work with?",
    answer: "We specialize in high-ticket B2B: SaaS, agencies, professional services, consulting firms, and managed service providers. If your average deal value is $30K+ and you have a sales process, we can help.",
  },
  {
    question: "Do you guarantee results?",
    answer: "We guarantee the system will be built and operational. We don't guarantee specific revenue numbers because your close rate, offer strength, and market fit matter. That said — every client who's run the system for 90+ days has generated measurable pipeline.",
  },
];
