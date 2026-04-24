/**
 * Dynamic XML sitemap  Next.js App Router convention.
 *
 * Next.js calls this at build time (or on-demand with ISR) and serves the
 * result at /sitemap.xml. Submit this URL to Google Search Console and Bing
 * Webmaster Tools to accelerate crawl discovery.
 *
 * Priority guide used here:
 *  1.0  Homepage  highest commercial intent, most internal links point here
 *  0.9  Services   primary conversion page, direct revenue impact
 *  0.8  About Us   E-E-A-T signal, targets "B2B revenue agency" queries
 *  0.7  Testimonials  social proof, lower search volume but high conversion value
 *
 * changeFrequency reflects how often each page's content actually changes:
 *  "weekly"    homepage headline / CTA copy may update with new campaigns
 *  "monthly"   service descriptions and about copy are more stable
 */

import type { MetadataRoute } from "next";

const SITE_URL = "https://ascendly.one";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2025-07-01"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date("2025-07-01"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/aboutus`,
      lastModified: new Date("2025-07-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/testimonials`,
      lastModified: new Date("2025-07-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
