/**
 * Centralised metadata factory for the Next.js 15 App Router.
 *
 * Usage in any page.tsx:
 *   export const metadata = buildMetadata({ pathname: '/services' });
 *
 * Or with per-page overrides:
 *   export const metadata = buildMetadata({
 *     pathname: '/services',
 *     title: 'Custom Title',
 *     description: 'Custom description.',
 *     ogImage: '/og/services.png',
 *   });
 */

import type { Metadata } from "next";
import { keywordMap } from "./keywords";

const SITE_URL = "https://ascendly.one";
const SITE_NAME = "Ascendly";
const DEFAULT_OG_IMAGE = "/og/default.png";

/** Twitter / X handle  update when account is created. */
const TWITTER_HANDLE = "@AscendlyHQ";

interface BuildMetadataOptions {
  /** Next.js route pathname, e.g. "/" or "/services" */
  pathname: string;
  /** Override the auto-generated title (omit to use keyword-driven default). */
  title?: string;
  /** Override the auto-generated description. */
  description?: string;
  /** Override OG image path (relative to /public). */
  ogImage?: string;
  /** Set to false on utility pages you don't want indexed (e.g. /thank-you). */
  index?: boolean;
}

/**
 * Per-page default titles and descriptions derived from the site's content.
 * These are the human-authored, SEO-tuned versions.
 */
const PAGE_DEFAULTS: Record<
  string,
  { title: string; description: string; ogImage: string }
> = {
  "/": {
    title: "B2B Revenue Systems That Generate & Convert Pipeline | Ascendly",
    description:
      "Ascendly engineers end-to-end revenue systems for high-ticket B2B companies  inbound capture, outbound pipeline, AI follow-up, and full ROI tracking. Predictable growth, not just activity.",
    ogImage: "/og/home.png",
  },
  "/aboutus": {
    title: "About Ascendly  The Revenue Systems Agency Built for Conversion",
    description:
      "We don't run campaigns. We build revenue systems. Learn how Ascendly turns pipeline into predictable growth for B2B companies with $30k+ deal sizes.",
    ogImage: "/og/about.png",
  },
  "/services": {
    title: "Revenue Automation & Outbound Pipeline Services | Ascendly",
    description:
      "End-to-end revenue automation: outbound engine, inbound capture, AI-powered deal follow-up, and live pipeline visibility. Built for B2B teams that need pipeline that converts.",
    ogImage: "/og/services.png",
  },
  "/testimonials": {
    title: "Client Testimonials  Real Pipeline Results | Ascendly",
    description:
      "Read what clients say after their pipeline starts converting. Featured reviews from Matt Leta, Michael Won, Steve Paganelli, Peter Brand, and more B2B revenue leaders.",
    ogImage: "/og/testimonials.png",
  },
};

/**
 * Builds a fully-populated Next.js Metadata object for a given page.
 * Merges site-wide defaults, keyword data, and per-call overrides.
 */
export function buildMetadata({
  pathname,
  title,
  description,
  ogImage,
  index = true,
}: BuildMetadataOptions): Metadata {
  const defaults = PAGE_DEFAULTS[pathname] ?? {
    title: `${SITE_NAME} | Predictable Revenue Systems`,
    description:
      "Ascendly designs and operates premium revenue systems that turn pipeline activity into predictable growth.",
    ogImage: DEFAULT_OG_IMAGE,
  };

  const resolvedTitle = title ?? defaults.title;
  const resolvedDescription = description ?? defaults.description;
  const resolvedOgImage = ogImage ?? defaults.ogImage;
  const canonicalUrl = `${SITE_URL}${pathname === "/" ? "" : pathname}`;

  const keywords = keywordMap[pathname];
  const keywordString = keywords
    ? [keywords.primary, ...keywords.lsi].join(", ")
    : undefined;

  return {
    /**
     * Title template: inner pages show "Page Name | Ascendly".
     * The root layout defines the template; page.tsx can set just the segment.
     * Here we provide the full resolved title for maximum control.
     */
    title: resolvedTitle,
    description: resolvedDescription,
    ...(keywordString && { keywords: keywordString }),

    /** Canonical prevents duplicate-content penalties. */
    alternates: {
      canonical: canonicalUrl,
    },

    /** Robots: noindex utility pages, index everything else. */
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true } }
      : { index: false, follow: false },

    /** Open Graph  controls link previews on LinkedIn, Facebook, Slack, etc. */
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [
        {
          url: `${SITE_URL}${resolvedOgImage}`,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },

    /** Twitter / X Card  shows rich preview when shared. */
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [`${SITE_URL}${resolvedOgImage}`],
    },
  };
}
