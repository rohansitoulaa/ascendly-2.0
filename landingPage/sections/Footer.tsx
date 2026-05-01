"use client";

import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FiArrowRight, FiLinkedin } from "react-icons/fi";
import { AnimatedLink } from "@/design/AnimatedLink";
import { Divider } from "@/design/Divider";
import { Button } from "@/design/Button";
import { LenisContext } from "@/landingPage/providers/LenisProvider";

const groups = [
  {
    title: "Explore",
    items: [
      { label: "Systems", href: "/#systems" },
      { label: "Services", href: "/#services" },
      { label: "Process", href: "/#process" },
      { label: "Client proof", href: "/#proof" },
      { label: "Industries", href: "/#industries" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Revenue Automation", href: "/services/revenue-automation" },
      { label: "Outbound Pipeline", href: "/services/outbound-pipeline" },
    ],
  },
  {
    title: "Ascendly",
    items: [
      { label: "About Us", href: "/aboutus" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
];

export function Footer() {
  const lenisRef = useContext(LenisContext);
  const pathname = usePathname();
  const router = useRouter();

  function smoothScrollTo(hash: string) {
    const target = document.getElementById(hash);
    if (!target) return false;
    const lenis = lenisRef?.current;
    if (lenis) {
      lenis.scrollTo(target, {
        offset: -64,
        duration: 1.4,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return true;
  }

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    if (!href.startsWith("/#")) return;
    const hash = href.slice(2);

    if (pathname === "/") {
      e.preventDefault();
      if (smoothScrollTo(hash)) {
        history.replaceState(null, "", `#${hash}`);
      }
      return;
    }

    e.preventDefault();
    router.push(href);
    const start = Date.now();
    const tryScroll = () => {
      if (smoothScrollTo(hash)) return;
      if (Date.now() - start > 4000) return;
      requestAnimationFrame(tryScroll);
    };
    requestAnimationFrame(tryScroll);
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#05060A]/85 pt-20 pb-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

      <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
        <div className="flex flex-col gap-14 md:grid md:grid-cols-[1.4fr_2.6fr] md:gap-20">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              aria-label="Ascendly home"
              className="inline-flex items-center gap-2.5 text-[1.1rem] font-semibold tracking-[-0.02em] text-white"
            >
              <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center">
                <Image
                  src="/ascendly_logo.png"
                  alt="Ascendly"
                  fill
                  sizes="36px"
                  className="object-contain filter-[brightness(0)_invert(1)]"
                />
              </span>
              <span>
                ascendly<span className="text-cyan-300">.</span>
                <span className="text-white/55">one</span>
              </span>
            </Link>
            <p className="max-w-[38ch] text-[0.92rem] leading-[1.7] text-white/55">
              Revenue systems, engineered. We design and operate the loop —
              your team runs it.
            </p>

            <div>
              <Button
                variant="primary"
                size="sm"
                icon={<FiArrowRight />}
                iconAnimation="nudge"
              >
                Book a revenue audit
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/ascendly1/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                aria-label="Ascendly on LinkedIn"
              >
                <FiLinkedin className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
            {groups.map((g) => (
              <div key={g.title} className="flex flex-col gap-4">
                <h5 className="text-[0.7rem] uppercase tracking-[0.28em] text-white/45">
                  {g.title}
                </h5>
                <ul className="flex flex-col gap-2.5">
                  {g.items.map((it) => (
                    <li key={it.label}>
                      <AnimatedLink
                        href={it.href}
                        onClick={(e) => handleAnchorClick(e, it.href)}
                        showArrow={false}
                        underline={false}
                        className="text-[0.92rem] text-white/68"
                      >
                        {it.label}
                      </AnimatedLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <Divider variant="gradient" />
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-[0.78rem] text-white/40 sm:flex-row sm:items-center">
          <span>© 2026 Ascendly. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white/80">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white/80">
              Terms
            </Link>
            <Link
              href="/cookies"
              className="transition-colors hover:text-white/80"
            >
              Cookies
            </Link>
            <Link href="/faq" className="transition-colors hover:text-white/80">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
