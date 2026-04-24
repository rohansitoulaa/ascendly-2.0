"use client";

import Image from "next/image";
import { Marquee } from "@/animations/Marquee";
import { Reveal } from "@/animations/Reveal";
import { brandList } from "@/landingPage/data/brands";

export function Brands() {
  return (
    <section className="relative border-y border-white/5 bg-[#07080B]/80 py-12 sm:py-16">
      <Reveal>
        <p className="mx-auto mb-10 max-w-[38ch] px-6 text-center text-[0.7rem] uppercase tracking-[0.32em] text-white/38 sm:text-[0.75rem]">
          Trusted by revenue teams at category leaders
        </p>
      </Reveal>

      <Marquee speed={52} gap={64} fade pauseOnHover>
        {brandList.map((brand) => (
          <a
            key={brand.brandName}
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            title={brand.brandName}
            className="group relative flex items-center opacity-45 transition-opacity duration-700 hover:opacity-100"
          >
            <Image
              src={brand.logo}
              alt={brand.brandName}
              width={100}
              height={32}
              className={`max-h-8 w-auto object-contain${brand.invert ? " brightness-0 invert" : ""}`}
              unoptimized
            />
          </a>
        ))}
      </Marquee>
    </section>
  );
}

export default Brands;
