import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Footer from "@/landingPage/sections/Footer";
import Navbar from "@/landingPage/sections/Navbar";
import { buildMetadata } from "@/lib/seo/metadata";
import { webPageSchema } from "@/lib/seo/schema";

const LAST_UPDATED_LABEL = "April 24, 2026";
const LAST_UPDATED_ISO = "2026-04-24";

const privacySections = [
  {
    title: "What data do we collect?",
    paragraphs: [
      "Ascendly may collect personal and business information you provide directly, including your name, work email address, company name, role, phone number, billing details, and any information you share when booking a call or discussing a project.",
      "We also collect technical and usage information such as IP address, browser type, device information, referring pages, pages viewed, timestamps, and cookie identifiers when you interact with ascendly.one.",
    ],
  },
  {
    title: "How do we use personal information?",
    paragraphs: [
      "We use personal information to respond to inquiries, evaluate fit, deliver services, manage client relationships, process invoices, improve the website, protect the security of our systems, and comply with legal obligations.",
      "We may also use information to send service updates, operational notices, and relevant business communications related to Ascendly's offerings. You can opt out of non-essential marketing communications at any time.",
    ],
  },
  {
    title: "How do we store and protect data?",
    paragraphs: [
      "Ascendly stores information only for as long as it is reasonably necessary for the purposes described in this Privacy Policy, including service delivery, recordkeeping, dispute resolution, and legal compliance.",
      "We use reasonable administrative, technical, and organizational safeguards to protect personal information from unauthorized access, loss, misuse, alteration, or disclosure. No transmission or storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "When do we share data with third parties?",
    paragraphs: [
      "Ascendly may share information with carefully selected service providers that support hosting, scheduling, analytics, communications, payment processing, or other business operations. These providers are expected to process data only as needed to perform services for us.",
      "We may also disclose information when required by law, to respond to lawful requests, to enforce our agreements, to protect our rights or safety, or in connection with a merger, acquisition, financing, or sale of all or part of our business.",
    ],
  },
  {
    title: "How do cookies and similar technologies work?",
    paragraphs: [
      "Ascendly uses cookies and similar technologies to keep the website functioning, understand traffic and performance, remember preferences, and support marketing or campaign measurement where applicable.",
      "You can read more about how cookies work and how to manage them in our Cookie Policy.",
    ],
    links: [{ href: "/cookies", label: "Read the Cookie Policy" }],
  },
  {
    title: "What rights do you have under GDPR and CCPA?",
    paragraphs: [
      "Depending on where you live, you may have rights to request access to personal information, correction of inaccurate information, deletion, restriction of processing, portability, withdrawal of consent, or objection to certain processing.",
      "Residents covered by the California Consumer Privacy Act may also have the right to know what categories of personal information are collected, disclosed, or shared, and to request deletion or correction. Where legally required, Ascendly will honor verified requests within the applicable time frame.",
    ],
  },
  {
    title: "How long do we keep information?",
    paragraphs: [
      "We retain information only for as long as there is a legitimate business or legal need to do so. Retention periods may vary based on the type of information, the services provided, contractual requirements, and applicable law.",
    ],
  },
  {
    title: "How can you contact us?",
    paragraphs: [
      "If you have a privacy question or want to exercise a legal right, contact Ascendly using the contact options available at https://ascendly.one or schedule time with us at https://calendly.com/ascendly. Please include enough detail for us to verify and respond to your request.",
    ],
  },
] as const;

export const metadata: Metadata = buildMetadata({
  pathname: "/privacy",
  title: "Privacy Policy | Ascendly",
  description:
    "Read the Ascendly Privacy Policy covering data collection, use, storage, cookies, third-party sharing, and privacy rights under GDPR and CCPA.",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        schema={webPageSchema({
          pathname: "/privacy",
          title: "Privacy Policy | Ascendly",
          description:
            "Read the Ascendly Privacy Policy covering data collection, use, storage, cookies, third-party sharing, and privacy rights under GDPR and CCPA.",
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
                Privacy Policy
              </span>
            </nav>

            <div className="max-w-4xl">
              <p className="mb-4 text-[0.76rem] uppercase tracking-[0.24em] text-cyan-300/75">
                Legal
              </p>
              <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] font-semibold tracking-[-0.04em] text-white">
                Privacy Policy
              </h1>
              <p className="mt-5 max-w-3xl text-[1rem] leading-[1.85] text-white/65 sm:text-[1.05rem]">
                This Privacy Policy explains what information Ascendly collects,
                how we use it, when we share it, how we protect it, and what
                rights you may have under applicable privacy laws.
              </p>
              <p className="mt-6 text-sm text-white/45">
                Last updated: {LAST_UPDATED_LABEL}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto flex w-full max-w-[1220px] flex-col gap-6 px-6 sm:px-8 lg:px-10">
            {privacySections.map((section) => (
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
