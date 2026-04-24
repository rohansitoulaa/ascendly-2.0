/**
 * robots.txt  Next.js App Router convention.
 *
 * Served at /robots.txt. Controls which bots can crawl which paths.
 *
 * Policy:
 *  - Allow all well-behaved bots on all public paths
 *  - Block common AI training scrapers (CCBot, GPTBot used for training data,
 *    not search  unlike ChatGPT's search crawler which uses different UA)
 *  - Explicitly allow AI *search* crawlers that drive referral traffic
 *    (PerplexityBot, ClaudeBot used for Perplexity/Claude web search)
 *  - Reference sitemap so every bot knows where to start crawling
 */

import type { MetadataRoute } from "next";

const SITE_URL = "https://ascendly.one";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Primary rule: allow all well-behaved crawlers on all paths
        userAgent: "*",
        allow: "/",
      },
      {
        // Block Common Crawl  used for AI training datasets, not search
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        // Block OpenAI's training crawler (GPTBot)  distinct from ChatGPT search
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
