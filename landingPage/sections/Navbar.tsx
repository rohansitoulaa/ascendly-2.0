"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";
import { Button } from "@/design/Button";
import { AnimatedLink } from "@/design/AnimatedLink";

const nav = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/aboutus" },
  { label: "Testimonials", href: "/testimonials" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
              // secondaryText="Book a 15"
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
          className="flex h-full flex-col items-start justify-center gap-7 px-8"
        >
          {nav.map((n, i) => (
            <motion.a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : -20 }}
              transition={{ delay: 0.08 + i * 0.05, duration: 0.5 }}
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
