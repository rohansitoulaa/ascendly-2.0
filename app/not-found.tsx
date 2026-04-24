"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#05060A] px-6 text-white">
      {/* Background atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.10),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(167,139,250,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,10,0)_0%,rgba(5,6,10,0.7)_100%)]" />
      </div>

      {/* Floating orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-1/4 h-[360px] w-[360px] rounded-full bg-violet-500/12 blur-[100px]"
      />

      <div className="flex max-w-[640px] flex-col items-center text-center">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="select-none text-[clamp(7rem,22vw,14rem)] font-semibold leading-none tracking-[-0.07em]"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,211,238,0.55) 0%, rgba(255,255,255,0.15) 50%, rgba(167,139,250,0.50) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 text-[1.75rem] font-light leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.25rem]"
        >
          Page not found
        </motion.h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-[42ch] text-[1rem] leading-[1.7] text-white/50"
        >
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been
          moved. Head back home and we&rsquo;ll get you sorted.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[0.95rem] font-medium text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #475C70 0%, #263E52 100%)",
              boxShadow:
                "0 10px 36px rgba(38,62,82,0.45), inset 0 1px 0 rgba(255,255,255,0.14)",
            }}
          >
            <FiHome className="text-[1em]" />
            Back to home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[0.95rem] font-medium text-white/65 transition-colors duration-200 hover:text-white/90"
          >
            <FiArrowLeft className="text-[1em]" />
            Go back
          </button>
        </motion.div>
      </div>

      {/* Hairline separator */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-12 h-px w-[min(420px,80vw)] bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </main>
  );
}
