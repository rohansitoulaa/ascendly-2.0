"use client";

import { useMemo } from "react";
import LogoLoop, { type LogoItem } from "@/animations/LogoLoop";
import { brandList } from "@/animations/brandList";

export default function BrandBar() {
  const logos = useMemo<LogoItem[]>(
    () =>
      brandList.map(({ brandName, logo, url }) => ({
        alt: brandName,
        href: url,
        src: logo,
        title: brandName,
      })),
    [],
  );

  return (
    <section
      aria-label="Trusted brands"
      className="relative px-6 py-7 md:py-10"
    >
      <div className="mx-auto max-w-[1360px]">
        <LogoLoop
          ariaLabel="Trusted partner logos"
          className="review-logo-loop"
          gap={42}
          logoHeight={40}
          logos={logos}
          pauseOnHover
          scaleOnHover
          speed={58}
          width="100%"
        />
      </div>
    </section>
  );
}
