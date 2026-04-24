"use client";

import BorderGlow from "@/animations/BorderGlow";
import BrandBar from "@/animations/BrandBar";
import { Reveal } from "@/animations/Reveal";
import clientReviews, { type Review } from "@/landingPage/lib/clientReviews";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useMemo, useRef, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  FiActivity,
  FiAperture,
  FiAward,
  FiBarChart2,
  FiBriefcase,
  FiCheckCircle,
  FiCompass,
  FiDollarSign,
  FiFlag,
  FiGlobe,
  FiGrid,
  FiLayers,
  FiMessageCircle,
  FiMonitor,
  FiPhoneCall,
  FiRefreshCw,
  FiSend,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const FEATURED_NAMES = new Set([
  "Matt Leta",
  "Steve Paganelli",
  "Peter Brand",
  "Michael Won",
]);

const FEATURED_ORDER = [
  "Matt Leta",
  "Steve Paganelli",
  "Peter Brand",
  "Michael Won",
];

const renderRichReview = (review: string) =>
  review.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={`${part}-${index}`}
          className="theme-shift-transition font-semibold text-[color:var(--review-copy-strong)]"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });

interface ReviewBlock {
  featured: Review | null;
  featuredOnLeft: boolean;
  regulars: Review[];
}

interface FloatingToken {
  accentClassName: string;
  icon?: IconType;
  id: string;
  kind: "icon" | "text";
  label?: string;
}

const REGULAR_PATTERN = [1, 3, 2, 1];

const LIGHT_REVIEW_THEME_STYLES = {
  "--review-bg":
    "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(246, 248, 249, 0.92) 18%, #ffffff 34%, #f8fafb 100%)",
  "--review-top-fade":
    "linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(248, 250, 251, 0.9) 62%, #ffffff)",
  "--review-title": "#020617",
  "--review-copy": "#475569",
  "--review-copy-strong": "#0f172a",
  "--review-chip-bg": "rgba(241, 245, 249, 0.94)",
  "--review-chip-border": "rgba(226, 232, 240, 0.95)",
  "--review-chip-text": "#475569",
  "--review-card-bg": "rgba(255, 255, 255, 0.96)",
  "--review-card-border": "rgba(226, 232, 240, 0.9)",
  "--review-badge-bg": "#0f172a",
  "--review-badge-text": "#ffffff",
  "--review-action-bg": "rgba(248, 250, 252, 0.94)",
  "--review-action-border": "rgba(203, 213, 225, 0.9)",
  "--review-action-text": "#334155",
  "--review-action-hover-bg": "#0f172a",
  "--review-action-hover-text": "#ffffff",
} as Record<string, string>;

const FLOATING_TOKENS: FloatingToken[] = [
  {
    accentClassName: "border-violet-200/90 bg-violet-50/84 text-violet-700",
    id: "ascendly",
    kind: "text",
    label: "Ascendly",
  },
  {
    accentClassName: "border-sky-200/90 bg-sky-50/84 text-sky-700",
    id: "leads",
    kind: "text",
    label: "Leads",
  },
  {
    accentClassName: "border-emerald-200/90 bg-emerald-50/84 text-emerald-700",
    id: "revenue",
    kind: "text",
    label: "Revenue",
  },
  {
    accentClassName: "border-amber-200/90 bg-amber-50/84 text-amber-700",
    id: "pipeline",
    kind: "text",
    label: "Pipeline",
  },
  {
    accentClassName: "border-fuchsia-200/90 bg-fuchsia-50/84 text-fuchsia-700",
    id: "outbound",
    kind: "text",
    label: "Outbound",
  },
  {
    accentClassName: "border-cyan-200/90 bg-cyan-50/84 text-cyan-700",
    id: "replies",
    kind: "text",
    label: "Replies",
  },
  {
    accentClassName: "border-indigo-200/90 bg-indigo-50/84 text-indigo-700",
    id: "qualified",
    kind: "text",
    label: "Qualified",
  },
  {
    accentClassName: "border-rose-200/90 bg-rose-50/84 text-rose-700",
    id: "conversions",
    kind: "text",
    label: "Conversions",
  },
  {
    accentClassName: "border-teal-200/90 bg-teal-50/84 text-teal-700",
    id: "meetings",
    kind: "text",
    label: "Meetings",
  },
  {
    accentClassName: "border-slate-200/90 bg-slate-50/84 text-slate-700",
    id: "growth",
    kind: "text",
    label: "Growth",
  },
  {
    accentClassName: "border-cyan-200/90 bg-cyan-50/84 text-cyan-700",
    id: "opportunities",
    kind: "text",
    label: "Opportunities",
  },
  {
    accentClassName: "border-emerald-200/90 bg-emerald-50/84 text-emerald-700",
    id: "roi",
    kind: "text",
    label: "ROI",
  },
  {
    accentClassName: "border-violet-200/90 bg-violet-50/84 text-violet-700",
    id: "demos",
    kind: "text",
    label: "Demos",
  },
  {
    accentClassName: "border-rose-200/90 bg-rose-50/84 text-rose-700",
    id: "bookings",
    kind: "text",
    label: "Bookings",
  },
  {
    accentClassName: "border-teal-200/90 bg-teal-50/84 text-teal-700",
    id: "velocity",
    kind: "text",
    label: "Velocity",
  },
  {
    accentClassName: "border-amber-200/90 bg-amber-50/84 text-amber-700",
    id: "trust",
    kind: "text",
    label: "Trust",
  },
  {
    accentClassName: "border-indigo-200/90 bg-indigo-50/84 text-indigo-700",
    id: "follow-ups",
    kind: "text",
    label: "Follow-ups",
  },
  {
    accentClassName: "border-cyan-200/90 bg-cyan-50/84 text-cyan-700",
    id: "signals",
    kind: "text",
    label: "Signals",
  },
  {
    accentClassName: "border-emerald-200/90 bg-emerald-50/84 text-emerald-700",
    id: "booked",
    kind: "text",
    label: "Booked",
  },
  {
    accentClassName: "border-fuchsia-200/90 bg-fuchsia-50/84 text-fuchsia-700",
    id: "warm-intros",
    kind: "text",
    label: "Warm intros",
  },
  {
    accentClassName: "border-slate-200/90 bg-slate-50/84 text-slate-700",
    id: "deal-flow",
    kind: "text",
    label: "Deal flow",
  },
  {
    accentClassName: "border-sky-200/90 bg-sky-50/84 text-sky-700",
    id: "accounts",
    kind: "text",
    label: "Accounts",
  },
  {
    accentClassName: "border-violet-200/90 bg-violet-50/88 text-violet-700",
    icon: FiZap,
    id: "icon-zap",
    kind: "icon",
  },
  {
    accentClassName: "border-sky-200/90 bg-sky-50/88 text-sky-700",
    icon: FiTrendingUp,
    id: "icon-trending",
    kind: "icon",
  },
  {
    accentClassName: "border-emerald-200/90 bg-emerald-50/88 text-emerald-700",
    icon: FiTarget,
    id: "icon-target",
    kind: "icon",
  },
  {
    accentClassName: "border-cyan-200/90 bg-cyan-50/88 text-cyan-700",
    icon: FiMessageCircle,
    id: "icon-message",
    kind: "icon",
  },
  {
    accentClassName: "border-indigo-200/90 bg-indigo-50/88 text-indigo-700",
    icon: FiBarChart2,
    id: "icon-chart",
    kind: "icon",
  },
  {
    accentClassName: "border-amber-200/90 bg-amber-50/88 text-amber-700",
    icon: FiBriefcase,
    id: "icon-briefcase",
    kind: "icon",
  },
  {
    accentClassName: "border-slate-200/90 bg-slate-50/88 text-slate-700",
    icon: FiCompass,
    id: "icon-compass",
    kind: "icon",
  },
  {
    accentClassName: "border-rose-200/90 bg-rose-50/88 text-rose-700",
    icon: FiSend,
    id: "icon-send",
    kind: "icon",
  },
  {
    accentClassName: "border-teal-200/90 bg-teal-50/88 text-teal-700",
    icon: FiActivity,
    id: "icon-activity",
    kind: "icon",
  },
  {
    accentClassName: "border-fuchsia-200/90 bg-fuchsia-50/88 text-fuchsia-700",
    icon: FiUsers,
    id: "icon-users",
    kind: "icon",
  },
  {
    accentClassName: "border-amber-200/90 bg-amber-50/88 text-amber-700",
    icon: FiAward,
    id: "icon-award",
    kind: "icon",
  },
  {
    accentClassName: "border-emerald-200/90 bg-emerald-50/88 text-emerald-700",
    icon: FiCheckCircle,
    id: "icon-check",
    kind: "icon",
  },
  {
    accentClassName: "border-cyan-200/90 bg-cyan-50/88 text-cyan-700",
    icon: FiDollarSign,
    id: "icon-dollar",
    kind: "icon",
  },
  {
    accentClassName: "border-indigo-200/90 bg-indigo-50/88 text-indigo-700",
    icon: FiGlobe,
    id: "icon-globe",
    kind: "icon",
  },
  {
    accentClassName: "border-fuchsia-200/90 bg-fuchsia-50/88 text-fuchsia-700",
    icon: FiLayers,
    id: "icon-layers",
    kind: "icon",
  },
  {
    accentClassName: "border-sky-200/90 bg-sky-50/88 text-sky-700",
    icon: FiPhoneCall,
    id: "icon-call",
    kind: "icon",
  },
  {
    accentClassName: "border-slate-200/90 bg-slate-50/88 text-slate-700",
    icon: FiShield,
    id: "icon-shield",
    kind: "icon",
  },
  {
    accentClassName: "border-amber-200/90 bg-amber-50/88 text-amber-700",
    icon: FiFlag,
    id: "icon-flag",
    kind: "icon",
  },
  {
    accentClassName: "border-cyan-200/90 bg-cyan-50/88 text-cyan-700",
    icon: FiGrid,
    id: "icon-grid",
    kind: "icon",
  },
  {
    accentClassName: "border-emerald-200/90 bg-emerald-50/88 text-emerald-700",
    icon: FiRefreshCw,
    id: "icon-refresh",
    kind: "icon",
  },
  {
    accentClassName: "border-fuchsia-200/90 bg-fuchsia-50/88 text-fuchsia-700",
    icon: FiAperture,
    id: "icon-aperture",
    kind: "icon",
  },
  {
    accentClassName: "border-indigo-200/90 bg-indigo-50/88 text-indigo-700",
    icon: FiMonitor,
    id: "icon-monitor",
    kind: "icon",
  },
];

const seededUnit = (seed: number) => {
  const raw = Math.sin(seed * 999.97) * 43758.5453123;
  return raw - Math.floor(raw);
};

const getInitialFloatingPlacement = (index: number) => {
  const seed = index + 1;
  const columns = 6;
  const row = Math.floor(index / columns);
  const column = index % columns;
  const totalRows = Math.ceil(FLOATING_TOKENS.length / columns);
  const horizontalStep = 90 / (columns - 1);
  const verticalStep = totalRows > 1 ? 46 / (totalRows - 1) : 0;
  const jitterX = (seededUnit(seed * 1.91) - 0.5) * 8.5;
  const jitterY = (seededUnit(seed * 2.73) - 0.5) * 7.5;
  const left = 5 + column * horizontalStep + jitterX;
  const top = 39 + row * verticalStep + jitterY;

  return {
    left: `${Math.max(3, Math.min(95, left))}%`,
    top: `${Math.max(36, Math.min(89, top))}%`,
  };
};

const getStableHash = (value: string) =>
  value
    .split("")
    .reduce(
      (total, char, index) => total + char.charCodeAt(0) * (index + 1),
      0,
    );

const shuffleRegularReviews = (reviews: Review[]) =>
  [...reviews].sort((left, right) => {
    const leftScore = getStableHash(`${left.name}-${left.company}`);
    const rightScore = getStableHash(`${right.name}-${right.company}`);
    return leftScore - rightScore;
  });

const buildReviewBlocks = (reviews: Review[]): ReviewBlock[] => {
  const featured = FEATURED_ORDER.map((name) =>
    reviews.find((review) => review.name === name),
  ).filter((review): review is Review => Boolean(review));
  const regular = shuffleRegularReviews(
    reviews.filter((review) => !FEATURED_NAMES.has(review.name)),
  );

  const blocks: ReviewBlock[] = [];
  let regularIndex = 0;

  featured.forEach((featuredReview, index) => {
    const remainingRegular = regular.length - regularIndex;
    const remainingFeaturedAfterCurrent = featured.length - index - 1;
    const minimumReserved = Math.max(0, remainingFeaturedAfterCurrent);
    const maximumAvailable = Math.max(1, remainingRegular - minimumReserved);
    const regularCount = Math.min(
      maximumAvailable,
      REGULAR_PATTERN[index % REGULAR_PATTERN.length],
    );

    blocks.push({
      featured: featuredReview,
      featuredOnLeft: index % 2 === 0,
      regulars: regular.slice(regularIndex, regularIndex + regularCount),
    });

    regularIndex += regularCount;
  });

  if (regularIndex < regular.length) {
    blocks.push({
      featured: null,
      featuredOnLeft: false,
      regulars: regular.slice(regularIndex),
    });
  }

  return blocks;
};

const ReviewIdentity = ({
  featured,
  review,
}: {
  featured?: boolean;
  review: Review;
}) => (
  <div className="flex items-start gap-4">
    <div
      aria-label={`Photo of ${review.name}`}
      className={`theme-shift-transition shrink-0 rounded-[22px] border border-[color:var(--review-card-border)] bg-cover bg-center bg-no-repeat shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ${
        featured ? "h-18 w-18 md:h-20 md:w-20" : "h-14 w-14"
      }`}
      role="img"
      style={{ backgroundImage: `url(${review.image})` }}
    />

    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <div
          className={`theme-shift-transition font-semibold tracking-[-0.04em] text-[color:var(--review-title)] ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {review.name}
        </div>

        {featured ? (
          <span className="theme-shift-transition inline-flex rounded-full bg-[var(--review-badge-bg)] px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-[color:var(--review-badge-text)]">
            Featured review
          </span>
        ) : null}
      </div>

      <div className="theme-shift-transition mt-1 text-sm leading-6 text-[color:var(--review-copy)]">
        {review.position}
      </div>
      <div className="theme-shift-transition text-sm font-medium leading-6 text-[color:var(--review-copy-strong)]">
        {review.company}
      </div>
    </div>
  </div>
);

const ReviewActions = ({ review }: { review: Review }) =>
  review.linkedin || review.website ? (
    <div className="mt-6 flex flex-wrap gap-3">
      {review.linkedin ? (
        <a
          className="theme-shift-transition inline-flex rounded-full border border-[color:var(--review-action-border)] bg-[var(--review-action-bg)] px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[color:var(--review-action-text)] hover:bg-[var(--review-action-hover-bg)] hover:text-[color:var(--review-action-hover-text)]"
          href={review.linkedin}
          rel="noreferrer noopener"
          target="_blank"
        >
          LinkedIn
        </a>
      ) : null}

      {review.website ? (
        <a
          className="theme-shift-transition inline-flex rounded-full border border-[color:var(--review-action-border)] bg-[var(--review-action-bg)] px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[color:var(--review-action-text)] hover:bg-[var(--review-action-hover-bg)] hover:text-[color:var(--review-action-hover-text)]"
          href={review.website}
          rel="noreferrer noopener"
          target="_blank"
        >
          Website
        </a>
      ) : null}
    </div>
  ) : null;

const FloatingTokenNode = ({
  accentClassName,
  icon: Icon,
  initialLeft,
  initialTop,
  kind,
  label,
}: FloatingToken & { initialLeft: string; initialTop: string }) => (
  <div
    className="theme-shift-transition absolute hidden opacity-[0.26] will-change-transform md:block"
    data-floating-node=""
    style={{ filter: "none", left: initialLeft, opacity: 0.26, top: initialTop }}
  >
    {kind === "text" ? (
      <span
        className={`inline-flex rounded-full border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] shadow-[0_10px_22px_rgba(15,23,42,0.03)] backdrop-blur-sm ${accentClassName}`}
      >
        {label}
      </span>
    ) : Icon ? (
      <span
        className={`grid h-12 w-12 place-items-center rounded-[18px] border shadow-[0_10px_22px_rgba(15,23,42,0.03)] backdrop-blur-sm ${accentClassName}`}
      >
        <Icon className="h-[1.05rem] w-[1.05rem]" />
      </span>
    ) : null}
  </div>
);

export function ClientProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const blocks = useMemo(() => buildReviewBlocks(clientReviews), []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    // Disable all GSAP animations on mobile  static rendering only
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-review-card]");
      const floatingNodes =
        gsap.utils.toArray<HTMLElement>("[data-floating-node]");

      cards.forEach((card, index) => {
        const speed = Number(card.dataset.speed ?? "1");

        gsap.fromTo(
          card,
          {
            rotate: index % 2 === 0 ? -1 : 1,
            y: 54 * speed,
          },
          {
            ease: "none",
            rotate: 0,
            scrollTrigger: {
              end: "bottom top",
              scrub: true,
              start: "top bottom",
              trigger: section,
            },
            y: -116 * speed,
          },
        );
      });

      floatingNodes.forEach((node, index) => {
        const seed = index + 1;
        const driftX = (seededUnit(seed * 1.17) - 0.5) * 16;
        const driftY = 8 + seededUnit(seed * 2.41) * 18;
        const rotation = (seededUnit(seed * 3.13) - 0.5) * 5;
        const duration = 2.8 + seededUnit(seed * 4.21) * 1.9;
        const delay = seededUnit(seed * 5.07) * 1.4;

        gsap.set(node, {
          autoAlpha: 1,
          force3D: true,
          x: 0,
          y: 0,
        });

        gsap.to(node, {
          delay,
          duration,
          ease: "sine.inOut",
          repeat: -1,
          rotation,
          x: driftX,
          y: -driftY,
          yoyo: true,
        });

        gsap.to(node, {
          delay: delay * 0.6,
          duration: duration * 0.78,
          ease: "sine.inOut",
          repeat: -1,
          scale: 1.035,
          yoyo: true,
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="theme-shift-transition relative z-10 -mt-24 overflow-hidden pt-20 pb-6 sm:-mt-36 sm:pt-32 md:-mt-72 md:pt-60 md:pb-8"
      style={
        {
          ...LIGHT_REVIEW_THEME_STYLES,
          background: "var(--review-bg)",
        } as CSSProperties
      }
    >
      <div
        className="theme-shift-transition pointer-events-none absolute inset-x-0 top-0 h-40 md:h-56"
        style={{ background: "var(--review-top-fade)" }}
      />

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          {FLOATING_TOKENS.map((token, index) => {
            const initialPlacement = getInitialFloatingPlacement(index);

            return (
              <FloatingTokenNode
                key={token.id}
                accentClassName={token.accentClassName}
                icon={token.icon}
                id={token.id}
                initialLeft={initialPlacement.left}
                initialTop={initialPlacement.top}
                kind={token.kind}
                label={token.label}
              />
            );
          })}
        </div>

        <div className="mx-auto max-w-[1360px] px-4 pt-8 sm:px-6 sm:pt-12 md:pt-16">
          <div className="relative z-10 w-full max-w-none">
            <Reveal direction="up" distance={24}>
              <span className="theme-shift-transition inline-flex rounded-full border border-[color:var(--review-chip-border)] bg-[var(--review-chip-bg)] px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[color:var(--review-chip-text)]">
                Client reviews
              </span>
            </Reveal>

            <Reveal direction="up" distance={42} delay={0.08} duration={1}>
              <h2 className="theme-shift-transition mt-4 w-full max-w-none text-[clamp(2rem,6vw,5.75rem)] font-semibold tracking-[-0.07em] text-[color:var(--review-title)] leading-[1.05] sm:mt-6 md:leading-[0.98]">
                10+ happy clients already see better engagement daily.
              </h2>
            </Reveal>

            <Reveal direction="up" distance={28} delay={0.18}>
              <p className="theme-shift-transition mt-4 max-w-[68ch] text-sm leading-7 text-[color:var(--review-copy)] sm:mt-6 sm:text-base sm:leading-8 md:text-[1.05rem]">
                Featured testimonials anchor the section, while regular reviews
                stack opposite and the whole composition drifts with the scroll.
                One featured story per block keeps the rhythm clean.
              </p>
            </Reveal>
          </div>
          <div className="relative z-10 mt-6 sm:mt-8 md:mt-10">
            <BrandBar />
          </div>

          <div className="relative z-10 mt-8 space-y-8 sm:mt-14 sm:space-y-10 md:space-y-12">
            {blocks.map((block, blockIndex) => {
              const featuredCard = block.featured ? (
                <div
                  className={`lg:col-span-7 ${block.featuredOnLeft ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div
                    className="transform-gpu will-change-transform"
                    data-review-card=""
                    data-speed={0.92 + (blockIndex % 2) * 0.08}
                  >
                    <BorderGlow
                      animated={blockIndex < 2}
                      backgroundColor="var(--review-card-bg)"
                      borderRadius={30}
                      className="theme-shift-transition h-full min-h-0 border-[color:var(--review-card-border)] sm:min-h-[28rem]"
                      colors={[
                        "rgba(79,70,229,0.82)",
                        "rgba(14,165,233,0.74)",
                        "rgba(236,72,153,0.72)",
                      ]}
                      edgeSensitivity={18}
                      fillOpacity={0.48}
                      glowColor="228 100 67"
                      glowIntensity={0.92}
                      surface="light"
                    >
                      <div className="flex h-full flex-col p-7 md:p-8">
                        <ReviewIdentity featured review={block.featured} />

                        <div className="theme-shift-transition mt-8 text-[1.04rem] leading-8 text-[color:var(--review-copy)]">
                          {renderRichReview(block.featured.review)}
                        </div>

                        <div className="mt-auto pt-8">
                          <ReviewActions review={block.featured} />
                        </div>
                      </div>
                    </BorderGlow>
                  </div>
                </div>
              ) : null;

              const regularColumn = (
                <div
                  className={`grid gap-5 ${block.featured ? "lg:col-span-5" : "lg:col-span-12 lg:grid-cols-3"} ${block.featuredOnLeft ? "lg:order-2" : "lg:order-1"}`}
                >
                  {block.regulars.map((review, reviewIndex) => (
                    <div
                      key={`${review.name}-${review.company}`}
                      className="transform-gpu will-change-transform"
                      data-review-card=""
                      data-speed={
                        0.72 + ((reviewIndex + blockIndex) % 3) * 0.08
                      }
                    >
                      <BorderGlow
                        animated={blockIndex === 0 && reviewIndex < 2}
                        backgroundColor="var(--review-card-bg)"
                        borderRadius={28}
                        className="theme-shift-transition border-[color:var(--review-card-border)]"
                        colors={[
                          "rgba(56,189,248,0.72)",
                          "rgba(168,85,247,0.66)",
                          "rgba(100,116,139,0.62)",
                        ]}
                        edgeSensitivity={20}
                        fillOpacity={0.42}
                        glowColor="214 96 72"
                        glowIntensity={0.78}
                        surface="light"
                      >
                        <div className="flex h-full flex-col p-6">
                          <ReviewIdentity review={review} />

                          <div className="theme-shift-transition mt-6 text-sm leading-7 text-[color:var(--review-copy)]">
                            {renderRichReview(review.review)}
                          </div>

                          <div className="mt-auto pt-6">
                            <ReviewActions review={review} />
                          </div>
                        </div>
                      </BorderGlow>
                    </div>
                  ))}
                </div>
              );

              return (
                <div
                  key={`review-block-${blockIndex}`}
                  className="grid gap-5 lg:grid-cols-12 lg:gap-6"
                >
                  {featuredCard}
                  {regularColumn}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Smooth multi-stop gradient transition to blend seamlessly into the dark RevenueSystemsSection */}
      <div
        className="theme-shift-transition pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[28rem] sm:h-[36rem] md:h-[48rem]"
        style={{
          opacity: "var(--matte-overlay-opacity, 0)",
          background: `
            radial-gradient(100% 70% at 50% 65%, rgba(51, 65, 85, 0.15) 0%, transparent 80%),
            linear-gradient(
              180deg,
              rgba(248, 250, 251, 0) 0%,
              #f1f5f9 14%,
              #cbd5e1 32%,
              #64748b 58%,
              #0f172a 84%,
              #090b0d 100%
            )
          `,
        }}
        aria-hidden="true"
      />
    </section>
  );
}
