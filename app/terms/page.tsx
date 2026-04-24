import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Footer from "@/landingPage/sections/Footer";
import Navbar from "@/landingPage/sections/Navbar";
import { buildMetadata } from "@/lib/seo/metadata";
import { webPageSchema } from "@/lib/seo/schema";

const LAST_UPDATED_LABEL = "April 24, 2026";
const LAST_UPDATED_ISO = "2026-04-24";

const termsSections = [
  {
    title: "How do you accept these Terms?",
    paragraphs: [
      "By accessing or using ascendly.one, booking a call, or engaging Ascendly for services, you agree to be bound by these Terms of Service and any written proposal, statement of work, or agreement that applies to your engagement.",
      "If you do not agree with these Terms, you should not use the website or purchase services from Ascendly.",
    ],
  },
  {
    title: "What services does Ascendly provide?",
    paragraphs: [
      "Ascendly provides B2B revenue system design, outbound pipeline services, automation support, strategic advisory, and related services as described on the website or in a separate client agreement.",
      "Project scope, deliverables, timelines, communication cadence, and any service-specific commitments are defined by the applicable proposal, scope document, or written agreement between Ascendly and the client.",
    ],
  },
  {
    title: "How do payment and refunds work?",
    paragraphs: [
      "Fees, billing schedules, and payment terms are set out in the applicable proposal, invoice, or service agreement. Unless otherwise stated in writing, invoices are due according to the terms shown on the invoice.",
      "Refunds are not provided unless they are expressly promised in writing, required by law, or approved by Ascendly in its sole discretion. Delayed payment may result in paused work, withheld deliverables, or suspension of access to related services until the account is brought current.",
    ],
  },
  {
    title: "What rules apply to your use of the site and services?",
    paragraphs: [
      "You agree to use the website and services lawfully, provide accurate information, maintain the confidentiality of any credentials you control, and avoid conduct that could disrupt the website, interfere with service delivery, or violate the rights of Ascendly or third parties.",
      "You may not copy, reverse engineer, scrape, or misuse Ascendly materials, systems, or proprietary methods except as expressly permitted in writing.",
    ],
  },
  {
    title: "What warranties and disclaimers apply?",
    paragraphs: [
      "Ascendly will perform services with reasonable care and skill. Except where a written agreement says otherwise, the website, materials, and services are provided on an as available and as is basis.",
      "Ascendly does not guarantee uninterrupted availability, error-free operation, or any specific commercial outcome, revenue result, pipeline volume, close rate, or return on investment unless a written agreement expressly states otherwise.",
    ],
  },
  {
    title: "How is liability limited?",
    paragraphs: [
      "To the fullest extent permitted by law, Ascendly is not liable for indirect, incidental, special, consequential, punitive, or lost profit damages arising out of or related to the website or services.",
      "If liability cannot be excluded, Ascendly's total liability for any claim related to a service engagement will be limited to the amount you paid to Ascendly for the services directly giving rise to the claim during the three months before the claim arose.",
    ],
  },
  {
    title: "When can services be suspended or terminated?",
    paragraphs: [
      "Ascendly may suspend or terminate access to the website or services if you breach these Terms, fail to pay amounts due, misuse the platform, create legal or security risk, or if continued service delivery becomes impractical or unlawful.",
      "You may stop using the website at any time. Termination of a paid engagement is governed by the relevant proposal or agreement, including any notice period, fees due for work performed, and post-termination obligations.",
    ],
  },
  {
    title: "What law governs these Terms?",
    paragraphs: [
      "Unless a separate written agreement states otherwise, these Terms are governed by the laws of the jurisdiction in which Ascendly is organized, without regard to conflict of law principles.",
      "Any dispute relating to these Terms or the services will be resolved in the courts or dispute forum with authority in that jurisdiction, unless the parties agree in writing to a different forum.",
    ],
  },
] as const;

export const metadata: Metadata = buildMetadata({
  pathname: "/terms",
  title: "Terms of Service | Ascendly",
  description:
    "Read the Ascendly Terms of Service covering acceptance of terms, services, payments, refunds, liability limits, termination, and governing law.",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        schema={webPageSchema({
          pathname: "/terms",
          title: "Terms of Service | Ascendly",
          description:
            "Read the Ascendly Terms of Service covering acceptance of terms, services, payments, refunds, liability limits, termination, and governing law.",
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
                Terms of Service
              </span>
            </nav>

            <div className="max-w-4xl">
              <p className="mb-4 text-[0.76rem] uppercase tracking-[0.24em] text-cyan-300/75">
                Legal
              </p>
              <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] font-semibold tracking-[-0.04em] text-white">
                Terms of Service
              </h1>
              <p className="mt-5 max-w-3xl text-[1rem] leading-[1.85] text-white/65 sm:text-[1.05rem]">
                These Terms of Service explain the rules that govern your use of
                the Ascendly website and any services you purchase from us.
              </p>
              <p className="mt-6 text-sm text-white/45">
                Last updated: {LAST_UPDATED_LABEL}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto flex w-full max-w-[1220px] flex-col gap-6 px-6 sm:px-8 lg:px-10">
            {termsSections.map((section) => (
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
