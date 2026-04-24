/**
 * FaqSection  semantic FAQ component wired for Google Featured Snippets.
 *
 * Renders a <dl> (description list) with <dt>/<dd> pairs  the HTML structure
 * Google's NLP most reliably associates with Q&A content.
 *
 * Automatically injects FAQPage JSON-LD so you never need to wire up schema
 * separately. Safe to use on any page  just pass your questions array.
 *
 * AEO purpose:
 *  - <dl>/<dt>/<dd> semantic markup → higher extraction confidence for AI crawlers
 *  - id anchors on every question → direct deep-linking from SERPs
 *  - FAQPage JSON-LD → enables Google's FAQ rich result (accordion in SERPs)
 *  - aria-label on the section → accessibility + crawler topic signal
 *
 * Usage:
 *   <FaqSection
 *     heading="Common questions about revenue automation"
 *     faqs={[
 *       { question: "How long does onboarding take?", answer: "Three weeks..." },
 *     ]}
 *   />
 */

import JsonLd from "@/components/JsonLd";
import { faqPageSchema, type FaqItem } from "@/lib/seo/schema";

interface FaqSectionProps {
  faqs: FaqItem[];
  /** Section heading rendered as <h2>  include your primary keyword naturally. */
  heading?: string;
  /** aria-label for the wrapping <section>  describe the topic for crawlers. */
  ariaLabel?: string;
  className?: string;
}

/** Converts a question string to a URL-safe id anchor. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function FaqSection({
  faqs,
  heading = "Frequently Asked Questions",
  ariaLabel,
  className = "",
}: FaqSectionProps) {
  return (
    <>
      {/* FAQPage JSON-LD  Google uses this to build accordion-style rich results */}
      <JsonLd schema={faqPageSchema(faqs)} />

      <section
        aria-label={ariaLabel ?? heading}
        className={`w-full ${className}`}
      >
        {heading && (
          <h2 className="mb-8 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight tracking-tight text-white">
            {heading}
          </h2>
        )}

        {/*
          <dl> is the correct semantic element for question/answer pairs.
          Screen readers announce it as a "description list"  crawlers
          recognise <dt> as the term (question) and <dd> as its definition (answer).
        */}
        <dl className="flex flex-col gap-6">
          {faqs.map((faq) => {
            const anchor = slugify(faq.question);
            return (
              <div
                key={anchor}
                id={anchor}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5 scroll-mt-24"
              >
                <dt className="text-[1rem] font-medium leading-snug text-white">
                  {/*
                    Deep-link anchor: "#how-long-does-onboarding-take" lets
                    Google link directly to this Q from the SERP rich result.
                  */}
                  <a
                    href={`#${anchor}`}
                    className="hover:text-[var(--accent-cyan)] transition-colors"
                  >
                    {faq.question}
                  </a>
                </dt>
                <dd className="mt-3 text-[0.95rem] leading-[1.7] text-white/60">
                  {faq.answer}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>
    </>
  );
}
