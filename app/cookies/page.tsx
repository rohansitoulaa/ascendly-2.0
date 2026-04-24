import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Footer from "@/landingPage/sections/Footer";
import Navbar from "@/landingPage/sections/Navbar";
import { buildMetadata } from "@/lib/seo/metadata";
import { webPageSchema } from "@/lib/seo/schema";

const LAST_UPDATED_LABEL = "April 24, 2026";
const LAST_UPDATED_ISO = "2026-04-24";

const cookieSections = [
  {
    title: "What are cookies?",
    paragraphs: [
      "Cookies are small text files placed on your device when you visit a website. They help the site remember information about your visit, keep core features working, understand performance, and support measurement of campaigns and interactions.",
    ],
  },
  {
    title: "Which cookies does Ascendly use?",
    paragraphs: [
      "Ascendly may use essential, analytics, and marketing cookies depending on the page, campaign, or tool in use. Some cookies are set directly by Ascendly, while others may be set by trusted third-party providers that help us operate the site and understand performance.",
    ],
  },
  {
    title: "How do essential cookies work?",
    paragraphs: [
      "Essential cookies support core site functionality such as navigation, security, form handling, and session continuity. Without these cookies, some parts of the website may not function correctly.",
    ],
  },
  {
    title: "How do analytics cookies work?",
    paragraphs: [
      "Analytics cookies help us understand how visitors use ascendly.one, which pages are visited, how traffic arrives, and where the site can be improved. We use this information to monitor performance and improve the visitor experience.",
    ],
  },
  {
    title: "How do marketing cookies work?",
    paragraphs: [
      "Marketing cookies may be used to measure campaign performance, understand interest in Ascendly services, and help make future advertising or remarketing more relevant. Where these cookies are used, they may be set by Ascendly or by marketing partners acting on our behalf.",
    ],
  },
  {
    title: "How can you opt out or manage cookies?",
    paragraphs: [
      "You can control or delete cookies through your browser settings, block third-party cookies, clear stored cookies, and use device or browser privacy controls to limit tracking. You may also use platform-specific ad settings and analytics opt-out tools where available.",
      "Please note that disabling essential cookies can affect how the site works and may limit certain features or forms.",
    ],
  },
  {
    title: "How does this relate to the Privacy Policy?",
    paragraphs: [
      "This Cookie Policy should be read together with the Ascendly Privacy Policy, which explains how personal information collected through cookies and similar technologies may be used, stored, shared, and protected.",
    ],
    links: [{ href: "/privacy", label: "Read the Privacy Policy" }],
  },
  {
    title: "How do we update this Cookie Policy?",
    paragraphs: [
      "Ascendly may update this Cookie Policy from time to time to reflect changes in the website, legal requirements, or the tools we use. The Last updated date at the top of this page shows when the current version became effective.",
    ],
  },
] as const;

export const metadata: Metadata = buildMetadata({
  pathname: "/cookies",
  title: "Cookie Policy | Ascendly",
  description:
    "Read the Ascendly Cookie Policy to understand what cookies are, which cookie categories we use, and how to manage or opt out of them.",
});

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd
        schema={webPageSchema({
          pathname: "/cookies",
          title: "Cookie Policy | Ascendly",
          description:
            "Read the Ascendly Cookie Policy to understand what cookies are, which cookie categories we use, and how to manage or opt out of them.",
          dateModified: LAST_UPDATED_ISO,
        })}
      />
      <Navbar />
      <main className="min-h-screen bg-[#05060A] text-white">
        <section className="relative overflow-hidden border-b border-white/[0.06] pt-32 pb-14 sm:pt-36 sm:pb-18">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-[340px] w-[620px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[140px]" />
          <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8 lg:px-10">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-white/45"
            >
              <Link href="/" className="transition-colors hover:text-white/80">
                Home
              </Link>
              <span className="text-white/20">/</span>
              <span aria-current="page" className="text-white/65">
                Cookie Policy
              </span>
            </nav>

            <div className="max-w-4xl">
              <p className="mb-4 text-[0.76rem] uppercase tracking-[0.24em] text-cyan-300/75">
                Legal
              </p>
              <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] font-semibold tracking-[-0.04em] text-white">
                Cookie Policy
              </h1>
              <p className="mt-5 max-w-3xl text-[1rem] leading-[1.85] text-white/65 sm:text-[1.05rem]">
                This Cookie Policy explains what cookies are, how Ascendly uses
                them, and the controls available to you.
              </p>
              <p className="mt-4 text-[0.98rem] leading-[1.85] text-white/60">
                You can also review the related privacy notice here:{" "}
                <Link
                  href="/privacy"
                  className="text-cyan-300 transition-colors hover:text-cyan-200"
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <p className="mt-6 text-sm text-white/45">
                Last updated: {LAST_UPDATED_LABEL}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto flex w-full max-w-[1220px] flex-col gap-6 px-6 sm:px-8 lg:px-10">
            {cookieSections.map((section) => (
              <article
                key={section.title}
                className="rounded-[28px] border border-white/[0.08] bg-white/[0.03] px-6 py-7 shadow-[0_20px_70px_rgba(0,0,0,0.22)] sm:px-8 sm:py-8"
              >
                <h2 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-white sm:text-[1.35rem]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-[0.98rem] leading-[1.9] text-white/68">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {"links" in section &&
                    section.links?.map((link) => (
                      <p key={link.href}>
                        <Link
                          href={link.href}
                          className="text-cyan-300 transition-colors hover:text-cyan-200"
                        >
                          {link.label}
                        </Link>
                      </p>
                    ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
