"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { Button } from "./Button";
import { PaperPlane } from "./PaperPlane";

interface NavbarProps {
  planeAnchorRef: RefObject<HTMLSpanElement | null>;
  showStartPlane: boolean;
}

export default function Navbar({
  planeAnchorRef,
  showStartPlane,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);

  // Close menu on escape
  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  return (
    <nav className="relative z-20 w-full px-4 pt-4 sm:px-6 md:pt-8" ref={menuRef}>
      <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-4 rounded-full border border-white/10 bg-white/6 px-3 py-2.5 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_22px_48px_rgba(0,0,0,0.18)] sm:gap-6 sm:px-4 sm:py-3 md:px-6">
        <a
          href="#top"
          className="flex items-center gap-2 text-white transition-opacity duration-300 hover:opacity-95 sm:gap-3"
        >
          <span
            ref={planeAnchorRef}
            className="relative inline-flex size-9 items-center justify-center sm:size-11"
          >
            <PaperPlane
              size={28}
              className={`transition-all duration-500 sm:[--plane-size:34px] ${
                showStartPlane
                  ? "translate-y-0 scale-100 opacity-100"
                  : "-translate-y-1 scale-75 opacity-0"
              }`}
            />
          </span>
          <span className="text-base font-semibold tracking-[0.08em] text-white/96 uppercase sm:text-lg">
            Ascendly
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-white/78 md:flex">
          <a
            href="#about"
            className="transition-colors duration-200 hover:text-white"
          >
            About
          </a>
          <a
            href="#services"
            className="transition-colors duration-200 hover:text-white"
          >
            Services
          </a>
          <a
            href="#reviews"
            className="transition-colors duration-200 hover:text-white"
          >
            Reviews
          </a>
          <a
            href="#faqs"
            className="transition-colors duration-200 hover:text-white"
          >
            FAQs
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="glass" className="hidden text-xs sm:inline-flex sm:text-sm">
            Book a 15 min call
          </Button>

          {/* Mobile hamburger button */}
          <button
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/6 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            onClick={toggleMenu}
            type="button"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen ? (
        <div className="absolute inset-x-4 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e10]/95 backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.4)] md:hidden sm:inset-x-6">
          <div className="flex flex-col gap-1 p-3">
            <a
              href="#about"
              className="rounded-xl px-4 py-3 text-sm font-medium text-white/78 transition-colors hover:bg-white/8 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#services"
              className="rounded-xl px-4 py-3 text-sm font-medium text-white/78 transition-colors hover:bg-white/8 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#reviews"
              className="rounded-xl px-4 py-3 text-sm font-medium text-white/78 transition-colors hover:bg-white/8 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reviews
            </a>
            <a
              href="#faqs"
              className="rounded-xl px-4 py-3 text-sm font-medium text-white/78 transition-colors hover:bg-white/8 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQs
            </a>
            <div className="mt-1 border-t border-white/8 pt-2">
              <Button
                variant="glass"
                className="w-full text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a 15 min call
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
