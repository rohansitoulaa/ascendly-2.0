"use client";

import { type ReactNode } from "react";
import { FiGlobe, FiLinkedin } from "react-icons/fi";
import { Reveal } from "@/animations/Reveal";
import { GlassCard } from "@/design/GlassCard";
import { TextHighlighter } from "@/design/TextHighlighter";
import Navbar from "@/landingPage/sections/Navbar";
import clientReviews, { type Review } from "@/landingPage/lib/clientReviews";
import dynamic from "next/dynamic";

const Grainient = dynamic(() => import("@/testimonialsPage/components/Grainient"), { ssr: false });

type ReviewAccent = "cyan" | "violet" | "emerald" | "amber" | "rose";

const TESTIMONIAL_PAGE_LAYOUT = {
  // Delay step between featured card reveals in seconds. Keep between 0.04 and 0.12 so the top collage settles quickly.
  featuredRevealStep: 0.07,
  // Delay step between regular wall cards in seconds. Keep between 0.02 and 0.08 so later cards do not lag too far behind.
  regularRevealStep: 0.04,
  // Delay cycling window for regular cards. Keep between 4 and 8 so large walls stay responsive while still cascading.
  regularRevealModulo: 6,
  // Minimum height for featured cards. Keep between 26rem and 36rem so long reviews fit without collapsing the collage.
  featuredCardMinHeight: "30rem",
  // Minimum height for regular cards. Keep between 18rem and 26rem so the wall feels dense but readable.
  regularCardMinHeight: "22rem",
} as const;

const TESTIMONIAL_HIGHLIGHT = {
  // Highlight sweep duration in seconds. Keep between 0.45 and 1.1 so bold phrases read clearly.
  duration: 0.8,
  // Viewport share required before the in-card highlight triggers. Keep between 0.1 and 0.35 to avoid firing too early.
  inViewAmount: 0.24,
} as const;

const TESTIMONIAL_BACKGROUND = {
  // Shader opacity. Keep between 0.55 and 0.95 so the cards remain the focus.
  shaderOpacityClassName: "opacity-[0.9]",
  // Top vignette opacity. Keep between 0.55 and 0.9 so the page stays dark across the full surface.
  overlayClassName:
    "bg-[linear-gradient(180deg,rgba(5,6,10,0.52)_0%,rgba(5,6,10,0.74)_30%,rgba(5,6,10,0.9)_100%)]",
} as const;

const FEATURED_REVIEW_NAMES = [
  "Matt Leta",
  "Michael Won",
  "Steve Paganelli",
  "Peter Brand",
] as const;

const FEATURED_CARD_LAYOUTS = [
  "xl:col-span-7 xl:row-span-2",
  "xl:col-span-5",
  "xl:col-span-5",
  "xl:col-span-7",
] as const;

const REGULAR_WALL_OFFSET_CLASSES = [
  "",
  "md:mt-10",
  "xl:mt-4",
  "md:mt-6 xl:mt-12",
  "",
  "md:mt-12",
] as const;

const REVIEW_ACCENTS: readonly ReviewAccent[] = [
  "cyan",
  "violet",
  "emerald",
  "amber",
  "rose",
];

const REVIEW_HIGHLIGHT_COLORS: Record<ReviewAccent, string> = {
  cyan: "rgba(125, 211, 252, 0.24)",
  violet: "rgba(196, 181, 253, 0.22)",
  emerald: "rgba(110, 231, 183, 0.22)",
  amber: "rgba(253, 224, 71, 0.22)",
  rose: "rgba(253, 164, 175, 0.22)",
};

const featuredReviewNameSet = new Set<string>(FEATURED_REVIEW_NAMES);

const featuredReviews = FEATURED_REVIEW_NAMES.map((name) =>
  clientReviews.find((review) => review.name === name),
).filter((review): review is Review => Boolean(review));

const regularReviews = clientReviews.filter(
  (review) => !featuredReviewNameSet.has(review.name),
);

function getAccent(index: number): ReviewAccent {
  return REVIEW_ACCENTS[index % REVIEW_ACCENTS.length];
}

function hasUrl(value?: string) {
  return typeof value === "string" && value.trim().length > 0;
}

function SectionKicker({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-cyan-300/70">
      <span className="h-px w-8 bg-cyan-300/35" />
      <span>{children}</span>
    </div>
  );
}

function renderRichReview(review: string, accent: ReviewAccent) {
  return review.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <TextHighlighter
          key={`${part}-${index}`}
          as="span"
          triggerType="inView"
          transition={{
            type: "spring",
            duration: TESTIMONIAL_HIGHLIGHT.duration,
            bounce: 0,
          }}
          useInViewOptions={{
            once: true,
            initial: false,
            amount: TESTIMONIAL_HIGHLIGHT.inViewAmount,
          }}
          highlightColor={REVIEW_HIGHLIGHT_COLORS[accent]}
          className="rounded-[0.34em] px-[0.16em] font-semibold text-white"
        >
          {part.slice(2, -2)}
        </TextHighlighter>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function ReviewLinks({
  review,
  featured,
}: {
  review: Review;
  featured: boolean;
}) {
  const links = [
    hasUrl(review.website)
      ? {
          href: review.website as string,
          icon: FiGlobe,
          label: "Website",
        }
      : null,
    hasUrl(review.linkedin)
      ? {
          href: review.linkedin as string,
          icon: FiLinkedin,
          label: "LinkedIn",
        }
      : null,
  ].filter(
    (
      value,
    ): value is { href: string; icon: typeof FiGlobe; label: string } =>
      Boolean(value),
  );

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="mt-auto flex flex-wrap gap-2 pt-2">
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={`${review.name}-${label}`}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={[
            "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] text-white/68 transition-colors duration-300 hover:border-white/18 hover:bg-white/[0.08] hover:text-white",
            featured ? "px-4 py-2 text-[0.78rem]" : "px-3 py-1.5 text-[0.74rem]",
          ].join(" ")}
        >
          <Icon className={featured ? "h-4 w-4" : "h-3.5 w-3.5"} />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  accent,
  featured,
}: {
  review: Review;
  accent: ReviewAccent;
  featured: boolean;
}) {
  return (
    <GlassCard
      accent={accent}
      tilt={!featured}
      className="h-full"
      innerClassName="h-full"
    >
      <article
        className={[
          "flex h-full flex-col",
          featured ? "gap-8 p-8 sm:p-10" : "gap-6 p-6 sm:p-7",
        ].join(" ")}
        style={{
          minHeight: featured
            ? TESTIMONIAL_PAGE_LAYOUT.featuredCardMinHeight
            : TESTIMONIAL_PAGE_LAYOUT.regularCardMinHeight,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4 sm:gap-5">
            <div
              className={[
                "shrink-0 overflow-hidden rounded-[22px] border border-white/12 bg-white/[0.04]",
                featured
                  ? "h-20 w-20 sm:h-24 sm:w-24"
                  : "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]",
              ].join(" ")}
            >
              <img
                src={review.image}
                alt={`${review.name} portrait`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="min-w-0">
              {featured ? (
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-white/52">
                  Featured review
                </div>
              ) : null}
              <div
                className={[
                  "mt-3 font-semibold tracking-[-0.03em] text-white",
                  featured ? "text-[1.5rem] sm:text-[1.75rem]" : "text-[1.12rem] sm:text-[1.24rem]",
                ].join(" ")}
              >
                {review.name}
              </div>
              <div
                className={[
                  "mt-1 leading-6 text-white/60",
                  featured ? "text-[0.98rem]" : "text-[0.9rem]",
                ].join(" ")}
              >
                {review.position}
              </div>
              <div
                className={[
                  "mt-1 font-medium leading-6 text-white/82",
                  featured ? "text-[1rem]" : "text-[0.92rem]",
                ].join(" ")}
              >
                {review.company}
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className={[
              "shrink-0 font-light leading-none text-white/10",
              featured ? "text-[4.75rem]" : "text-[3.5rem]",
            ].join(" ")}
          >
            "
          </div>
        </div>

        <div
          className={[
            "tracking-[-0.018em] text-white/76",
            featured
              ? "text-[1.04rem] leading-[1.9] sm:text-[1.12rem]"
              : "text-[0.96rem] leading-[1.82]",
          ].join(" ")}
        >
          {renderRichReview(review.review, accent)}
        </div>

        <ReviewLinks review={review} featured={featured} />
      </article>
    </GlassCard>
  );
}

export default function TestimonialsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05060A] text-white">
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-0 ${TESTIMONIAL_BACKGROUND.shaderOpacityClassName}`}
      >
        <Grainient className="h-full w-full" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_78%_16%,rgba(99,102,241,0.16),transparent_28%),radial-gradient(circle_at_50%_42%,rgba(8,145,178,0.08),transparent_34%)]"
      />
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-[2] ${TESTIMONIAL_BACKGROUND.overlayClassName}`}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[3]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 18%, transparent 24%, rgba(5, 6, 10, 0.36) 60%, rgba(5, 6, 10, 0.82) 100%)",
        }}
      />

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="relative z-10 pb-24">
        <section className="mx-auto w-full max-w-[1320px] px-6 pt-36 sm:px-8 sm:pt-44">
          <Reveal direction="up" distance={18}>
            <SectionKicker>Testimonials - Client Proof</SectionKicker>
          </Reveal>

          <Reveal direction="up" distance={24} delay={0.05}>
            <div className="mt-8 max-w-5xl">
              <h1 className="text-balance text-[2.8rem] font-light leading-[1.02] tracking-[-0.04em] text-white sm:text-[4.2rem] lg:text-[5.5rem]">
                A full wall of what clients say once the pipeline starts converting.
              </h1>
            </div>
          </Reveal>

          <Reveal direction="up" distance={18} delay={0.14}>
            <p className="mt-8 max-w-[62ch] text-[1.02rem] leading-[1.82] text-white/64 sm:text-[1.1rem]">
              Every testimonial from our current review set lives here. The four
              anchor reviews stay oversized, and the rest build the surrounding
              collage instead of disappearing into a slider.
            </p>
          </Reveal>

          <Reveal direction="up" distance={14} delay={0.22}>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.74rem] font-medium uppercase tracking-[0.18em] text-white/56">
                {clientReviews.length} client reviews
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.74rem] font-medium uppercase tracking-[0.18em] text-white/56">
                {featuredReviews.length} featured anchors
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto mt-16 w-full max-w-[1320px] px-6 sm:px-8">
          <div className="grid gap-6 xl:auto-rows-[minmax(17rem,auto)] xl:grid-cols-12">
            {featuredReviews.map((review, index) => (
              <Reveal
                key={review.name}
                className={FEATURED_CARD_LAYOUTS[index] ?? "xl:col-span-6"}
                direction="up"
                distance={28}
                delay={index * TESTIMONIAL_PAGE_LAYOUT.featuredRevealStep}
                amount={0.14}
              >
                <ReviewCard
                  review={review}
                  accent={getAccent(index)}
                  featured
                />
              </Reveal>
            ))}
          </div>

          <Reveal direction="up" distance={16} delay={0.12}>
            <div className="mt-16 flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/44">
              <span className="h-px w-8 bg-white/18" />
              <span>Full Wall</span>
            </div>
          </Reveal>

          <div className="mt-8 columns-1 [column-gap:1.5rem] md:columns-2 xl:columns-3">
            {regularReviews.map((review, index) => (
              <Reveal
                key={review.name}
                className={[
                  "mb-6 break-inside-avoid",
                  REGULAR_WALL_OFFSET_CLASSES[
                    index % REGULAR_WALL_OFFSET_CLASSES.length
                  ],
                ]
                  .filter(Boolean)
                  .join(" ")}
                direction="up"
                distance={22}
                delay={
                  (index % TESTIMONIAL_PAGE_LAYOUT.regularRevealModulo) *
                  TESTIMONIAL_PAGE_LAYOUT.regularRevealStep
                }
                amount={0.12}
              >
                <ReviewCard
                  review={review}
                  accent={getAccent(index + featuredReviews.length)}
                  featured={false}
                />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
