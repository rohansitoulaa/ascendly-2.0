import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Footer from "@/landingPage/sections/Footer";
import Navbar from "@/landingPage/sections/Navbar";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqPageSchema } from "@/lib/seo/schema";

type FAQItem = {
  title: string;
  details: string;
};

const faqItems: FAQItem[] = [
  {
    title: "What are B2B Lead Generation Services?",
    details: `B2B lead generation services are marketing and sales solutions designed to identify and connect your business with potential buyers. These services often include:
- Cold email outreach
- List building and qualification
- Appointment setting

They aim to deliver sales-ready opportunities, either managed in-house or outsourced to experts like us.`,
  },
  {
    title: "What are the benefits of B2B Lead Generation Services?",
    details: `B2B lead generation services help companies:
- Increase brand visibility
- Generate consistent qualified leads
- Improve sales team efficiency
- Optimize marketing spend
- Access better targeting through data
- Reduce time-to-sale
- Maximize ROI by outsourcing predictable pipeline generation`,
  },
  {
    title: "What are the different types of B2B Lead Generation Services?",
    details: `There are several key types:
- Cold Email Campaigns
- LinkedIn Outreach
- Paid Ads (PPC, LinkedIn, Google)
- Inbound SEO & Content
- Lead List Building & Data Enrichment
- Lead Nurturing & Drip Campaigns
- Cold Calling / SDR Support

At Ascendly, we specialize in cold email + ICP-targeted outbound  ideal for high-ticket B2B services.`,
  },
  {
    title: "What is a Lead Generation Agency?",
    details: `A lead generation agency is an external partner that:
- Manages strategy, tools, and execution
- Finds and books meetings with qualified leads
- Acts like an extension of your sales team
- Handles data scraping, messaging, and outreach
Letting you focus on closing deals instead of building a team from scratch.`,
  },
  {
    title: "What is B2B Lead Generation?",
    details: `B2B lead generation is the process of:
- Identifying Ideal Customer Profiles (ICPs)
- Building targeted lists
- Launching outreach (email, ads, LinkedIn)
- Booking qualified calls

It's about consistently getting the right message in front of the right buyer.`,
  },
  {
    title: "What are Lead Generation Services?",
    details: `Lead generation services help you:
- Generate interest
- Capture leads
- Book qualified meetings

They may include:
- Cold email & LinkedIn campaigns
- List building & enrichment
- Messaging & automation

All without hiring a full-time outbound team.`,
  },
  {
    title: "What makes Ascendly different?",
    details: `Ascendly is not your typical agency. We:
- Handle full outbound: strategy, messaging, data, and delivery
- Don't use recycled data or spam templates
- Guarantee replacements for no-shows
- Collaborate weekly and adapt in real time
We grow only when you do.`,
  },
  {
    title: "What technology does Ascendly use for B2B lead generation?",
    details: `We combine top outbound tools like:
- Apollo (list-building and targeting)
- Instantly (email automation)
- Clearbit & Dropcontact (data enrichment)
- Custom-built A/B testing, verification, and reporting processes

But our real edge? The humans behind the tools.`,
  },
  {
    title: "What is the most effective channel for B2B lead generation?",
    details: `Cold email remains the most scalable and cost-efficient for:
- Niche ICPs
- C-level and technical buyers

We also test across LinkedIn and other platforms  but email is our core strength.`,
  },
  {
    title: "What's the benefit of hiring a B2B lead generation agency?",
    details: `Hiring in-house means:
- Recruiting SDRs
- Managing tools and training
- Waiting months to see results

Ascendly offers:
- A fully built outbound engine
- Fast launch and iteration
- Results in weeks, not quarters`,
  },
  {
    title: "What if I get no-shows on my booked meetings?",
    details: `We guarantee every meeting:
- No-shows are tracked and replaced
- You'll never pay for ghost meetings
- Our nurturing flows are optimized for high attendance`,
  },
  {
    title: "What if the leads are unqualified?",
    details: `Our process includes:
- Deep ICP discovery
- Client-approved targeting
- Custom messaging

But if a lead slips through that isn't qualified  we replace it. No questions.`,
  },
  {
    title: "What if I have concerns about ROI before investing?",
    details: `We understand. That's why we:
- Start with a clear scope
- Share real expectations upfront
- Offer flexible onboarding with low commitment

Outbound with Ascendly is a system, not a gamble.`,
  },
];

export const metadata: Metadata = buildMetadata({
  pathname: "/faq",
  title: "FAQ | Ascendly",
  description:
    "Read frequently asked questions about Ascendly's B2B lead generation services, process, channels, technology, qualification standards, and ROI expectations.",
});

export default function FAQPage() {
  return (
    <>
      <JsonLd
        schema={faqPageSchema(
          faqItems.map((item) => ({
            question: item.title,
            answer: item.details,
          }))
        )}
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
                FAQ
              </span>
            </nav>

            <div className="max-w-4xl">
              <p className="mb-4 text-[0.76rem] uppercase tracking-[0.24em] text-cyan-300/75">
                Support
              </p>
              <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] font-semibold tracking-[-0.04em] text-white">
                Frequently Asked Questions
              </h1>
              <p className="mt-5 max-w-3xl text-[1rem] leading-[1.85] text-white/65 sm:text-[1.05rem]">
                Answers to common questions about Ascendly's B2B lead
                generation services, delivery model, and qualification process.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto flex w-full max-w-[1220px] flex-col gap-5 px-6 sm:px-8 lg:px-10">
            {faqItems.map((faq, index) => {
              const answerId = `faq-answer-${index}`;
              const headingId = `faq-question-${index}`;

              return (
                <article
                  key={faq.title}
                  className="rounded-[28px] border border-white/[0.08] bg-white/[0.03] shadow-[0_20px_70px_rgba(0,0,0,0.22)]"
                >
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-6 sm:px-8">
                      <h2
                        id={headingId}
                        className="text-left text-[1.02rem] font-semibold tracking-[-0.02em] text-white transition-colors group-open:text-cyan-200 sm:text-[1.16rem]"
                      >
                        {faq.title}
                      </h2>
                      <span className="shrink-0 text-[1.5rem] leading-none text-white/40 transition-transform duration-300 group-open:rotate-45 group-open:text-cyan-200">
                        +
                      </span>
                    </summary>
                    <div
                      id={answerId}
                      aria-labelledby={headingId}
                      className="border-t border-white/[0.08] px-6 pb-7 pt-5 sm:px-8"
                    >
                      <p className="whitespace-pre-line text-[0.97rem] leading-[1.9] text-white/68">
                        {faq.details}
                      </p>
                    </div>
                  </details>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
