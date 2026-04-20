"use client";

import type { ButtonHTMLAttributes, RefObject } from "react";
import { Button } from "./Button";
import { PaperPlane } from "./PaperPlane";

interface HeroCtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconAnchorRef: RefObject<HTMLSpanElement | null>;
  isPlaneDocked: boolean;
  planeVisualRef?: RefObject<HTMLSpanElement | null>;
}

export function HeroCtaButton({
  iconAnchorRef,
  isPlaneDocked,
  planeVisualRef,
  className = "",
  children = "Book a strategy call",
  ...props
}: HeroCtaButtonProps) {
  return (
    <Button
      variant="primary"
      className={`pl-6 pr-2 py-2.5 md:pl-7 md:pr-2.5 md:py-3 ${className}`}
      trailingAdornmentClassName="ml-1"
      trailingAdornment={
        <span
          ref={iconAnchorRef}
          className="relative inline-flex size-11 items-center justify-center overflow-hidden rounded-full border border-black/5 bg-[#12202c] shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_12px_24px_rgba(2,8,12,0.18)]"
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_55%),linear-gradient(180deg,#203141_0%,#111a23_100%)]" />
          <span
            ref={planeVisualRef}
            className={`relative z-10 origin-center ${
              isPlaneDocked ? "opacity-100" : "opacity-0"
            }`}
          >
            <PaperPlane size={34} />
          </span>
        </span>
      }
      {...props}
    >
      {children}
    </Button>
  );
}
