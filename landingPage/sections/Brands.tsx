"use client";

import { Marquee } from "@/animations/Marquee";
import { Reveal } from "@/animations/Reveal";

const brands = [
  "Northwind",
  "Luminary",
  "Forge&Co",
  "Helix",
  "Arcadia",
  "Parallel",
  "Outlier",
  "Sundial",
  "Vector",
  "Atlas",
];

export function Brands() {
  return (
    <section className="relative border-y border-white/[0.05] bg-[#07080B]/80 py-14 sm:py-20">
      <Reveal>
        <p className="mx-auto mb-8 max-w-[38ch] px-6 text-center text-[0.7rem] uppercase tracking-[0.32em] text-white/40 sm:text-[0.75rem]">
          Trusted by revenue teams at category leaders
        </p>
      </Reveal>
      <Marquee speed={36} gap={56} fade>
        {brands.map((b) => (
          <div
            key={b}
            className="group relative inline-flex items-center gap-3"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-cyan-300 to-violet-400 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="text-[1.35rem] font-semibold tracking-[-0.04em] text-white/55 transition-colors duration-500 group-hover:text-white sm:text-[1.6rem]">
              {b}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

export default Brands;
