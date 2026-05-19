"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiSun, FiMoon } from "react-icons/fi";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("site-theme") as Theme | null;
    const initial: Theme = stored === "light" ? "light" : "dark";
    setTheme(initial);
    if (initial === "light") {
      document.documentElement.setAttribute("data-site-theme", "light");
    }
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.setAttribute("data-site-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-site-theme");
    }
    localStorage.setItem("site-theme", next);
  };

  if (!mounted) {
    return <div className="h-9 w-9 shrink-0" aria-hidden />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-hairline/10 bg-surface/[0.04] text-ink/65 transition-colors duration-200 hover:border-hairline/20 hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 26, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inline-flex items-center justify-center"
        >
          {theme === "dark" ? <FiSun size={15} /> : <FiMoon size={15} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default ThemeToggle;
