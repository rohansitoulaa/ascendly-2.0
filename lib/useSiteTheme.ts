"use client";

import { useEffect, useState } from "react";

export type SiteTheme = "dark" | "light";

export function useSiteTheme(): SiteTheme {
  const [theme, setTheme] = useState<SiteTheme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    const read = (): SiteTheme =>
      root.getAttribute("data-site-theme") === "light" ? "light" : "dark";
    setTheme(read());

    const observer = new MutationObserver(() => setTheme(read()));
    observer.observe(root, { attributes: true, attributeFilter: ["data-site-theme"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}
