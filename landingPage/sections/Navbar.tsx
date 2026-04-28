"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import { FiMenu, FiX, FiPhone, FiChevronDown } from "react-icons/fi";
import { Button } from "@/design/Button";
import { AnimatedLink } from "@/design/AnimatedLink";

const services = [
  {
    label: "Revenue Automation System",
    description: "For companies with demand but inconsistent conversion.",
    href: "/services/revenue-automation",
  },
  {
    label: "Outbound Pipeline System",
    description: "For companies that need qualified meetings without relying on referrals.",
    href: "/services/outbound-pipeline",
  },
];

const nav = [
  { label: "About Us", href: "/aboutus" },
  { label: "Testimonials", href: "/testimonials" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4 sm:pt-5"
      >
        <nav
          className={[
            "relative flex w-full items-center justify-between gap-6 rounded-full border px-4 sm:px-5",
            "transition-[max-width,padding,background-color,border-color,box-shadow] duration-300 ease-out",
            scrolled
              ? "max-w-[1080px] py-2.5 border-white/10 bg-black/50 shadow-[0_18px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
              : "max-w-[1180px] py-3.5 border-white/[0.06] bg-white/[0.02] backdrop-blur-md",
          ].join(" ")}
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 text-[1.02rem] font-semibold tracking-[-0.02em] text-white"
          >
            <span className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-300 via-sky-400 to-violet-500 shadow-[0_0_18px_rgba(125,211,252,0.45)]">
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

          <div className="hidden items-center gap-7 md:flex">
            {/* Services dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                onClick={() => setServicesOpen((o) => !o)}
                className="flex items-center gap-1 text-[0.88rem] text-white/65 transition-colors duration-150 hover:text-white"
              >
                Services
                <motion.span
                  animate={{ rotate: servicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="inline-flex"
                >
                  <FiChevronDown size={13} />
                </motion.span>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-full mt-3 w-[300px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/9 bg-[#080A10]/95 shadow-[0_24px_64px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
                  >
                    <div className="px-2 py-2">
                      <p className="px-3 pb-2 pt-1 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-white/30">
                        Services
                      </p>
                      {services.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setServicesOpen(false)}
                          className="group flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-white/5"
                        >
                          <span className="text-[0.86rem] font-medium text-white/85 transition-colors duration-150 group-hover:text-white">
                            {s.label}
                          </span>
                          <span className="text-[0.75rem] leading-normal text-white/40">
                            {s.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {nav.map((n) => (
              <AnimatedLink
                key={n.href}
                href={n.href}
                showArrow={false}
                underline
                className="text-[0.88rem]"
              >
                {n.label}
              </AnimatedLink>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="primary"
              size="sm"
              icon={<FiPhone />}
              iconAnimation="shake"
            >
              Book a call
            </Button>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 md:hidden"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </nav>
      </motion.header>

      <motion.div
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[70] bg-[#05060A]/85 backdrop-blur-2xl md:hidden"
      >
        <motion.div
          initial={false}
          animate={{ y: open ? 0 : -30, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-full flex-col items-start justify-center gap-6 px-8"
        >
          {/* Services mobile accordion */}
          <div className="flex flex-col gap-0">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : -20 }}
              transition={{ delay: 0.08, duration: 0.5 }}
              onClick={() => setMobileServicesOpen((o) => !o)}
              className="flex items-center gap-2 text-[2rem] font-semibold tracking-[-0.035em] text-white"
            >
              Services
              <motion.span
                animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                transition={{ duration: 0.22 }}
                className="inline-flex"
              >
                <FiChevronDown size={22} />
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {mobileServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-4 pb-2 pl-2 pt-4">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => { setOpen(false); setMobileServicesOpen(false); }}
                        className="flex flex-col gap-0.5"
                      >
                        <span className="text-[1.1rem] font-medium text-white/80">
                          {s.label}
                        </span>
                        <span className="text-[0.82rem] leading-normal text-white/35">
                          {s.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {nav.map((n, i) => (
            <motion.a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : -20 }}
              transition={{ delay: 0.13 + i * 0.05, duration: 0.5 }}
              className="text-[2rem] font-semibold tracking-[-0.035em] text-white"
            >
              {n.label}
            </motion.a>
          ))}

          <div className="mt-6 flex gap-3">
            <Button
              variant="primary"
              size="md"
              magnetic={false}
              icon={<FiPhone />}
              iconAnimation="shake"
            >
              Book a call
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Navbar;
