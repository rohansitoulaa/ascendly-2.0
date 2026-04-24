"use client";

import Link from "next/link";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { AnimatedLink } from "@/design/AnimatedLink";
import { Divider } from "@/design/Divider";

const groups = [
  {
    title: "Systems",
    items: [
      { label: "Pipeline engine", href: "#systems" },
      { label: "Forecast", href: "#systems" },
      { label: "Attribution", href: "#systems" },
      { label: "Automations", href: "#systems" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Process", href: "#process" },
      { label: "Industries", href: "#industries" },
      { label: "Client proof", href: "#proof" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Field guides", href: "#" },
      { label: "Operating manual", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#05060A]/85 pt-20 pb-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />

      <div className="mx-auto w-full max-w-[1220px] px-6 sm:px-8">
        <div className="flex flex-col gap-14 md:grid md:grid-cols-[1.4fr_2.6fr] md:gap-20">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[1.1rem] font-semibold tracking-[-0.02em] text-white"
            >
              <span className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-300 via-sky-400 to-violet-500">
                <span className="absolute inset-[2px] rounded-full bg-[#05060A]" />
                <span className="relative text-[0.62rem] font-bold text-white">
                  A
                </span>
              </span>
              <span>
                ascendly<span className="text-cyan-300">.</span>
                <span className="text-white/55">one</span>
              </span>
            </Link>
            <p className="max-w-[38ch] text-[0.92rem] leading-[1.7] text-white/55">
              Revenue systems, engineered. We design and operate the loop 
              your team runs it.
            </p>
            <div className="flex items-center gap-2">
              {[FiLinkedin, FiTwitter, FiGithub].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  aria-label="Social"
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
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
            <a href="#" className="transition-colors hover:text-white/80">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
