"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * First-paint splash that fades out as soon as the window emits `load`
 * (or after a short fallback) — never blocks streaming or hydration.
 */
export default function LogoLoader() {
  const [hidden, setHidden] = useState(false);
  const [unmount, setUnmount] = useState(false);

  useEffect(() => {
    const sessionKey = "ascendly:loader-shown";
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(sessionKey)) {
      setHidden(true);
      setUnmount(true);
      return;
    }

    let fallbackId: number | null = null;
    let removeId: number | null = null;

    const finish = () => {
      setHidden(true);
      try {
        sessionStorage.setItem(sessionKey, "1");
      } catch {}
      removeId = window.setTimeout(() => setUnmount(true), 600);
    };

    if (document.readyState === "complete") {
      fallbackId = window.setTimeout(finish, 350);
    } else {
      const onLoad = () => {
        fallbackId = window.setTimeout(finish, 250);
      };
      window.addEventListener("load", onLoad, { once: true });
      const hardCap = window.setTimeout(finish, 2200);
      return () => {
        window.removeEventListener("load", onLoad);
        window.clearTimeout(hardCap);
        if (fallbackId) window.clearTimeout(fallbackId);
        if (removeId) window.clearTimeout(removeId);
      };
    }

    return () => {
      if (fallbackId) window.clearTimeout(fallbackId);
      if (removeId) window.clearTimeout(removeId);
    };
  }, []);

  if (unmount) return null;

  return (
    <div
      aria-hidden
      className={[
        "fixed inset-0 z-[200] flex items-center justify-center bg-[#05060A]",
        "transition-opacity duration-500 ease-out",
        hidden ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.10),transparent_60%)]" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 animate-[loader-pulse_1.6s_ease-in-out_infinite]">
          <Image
            src="/ascendly_logo.png"
            alt="Ascendly"
            fill
            priority
            sizes="96px"
            className="object-contain filter-[brightness(0)_invert(1)]"
          />
        </div>
        <div className="relative h-px w-32 overflow-hidden bg-surface/10">
          <span className="absolute inset-y-0 left-0 w-1/3 animate-[loader-bar_1.2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
        </div>
      </div>
      <style jsx>{`
        @keyframes loader-pulse {
          0%, 100% { transform: scale(1); opacity: 0.92; }
          50% { transform: scale(1.06); opacity: 1; }
        }
        @keyframes loader-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
