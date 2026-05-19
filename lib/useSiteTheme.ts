"use client";

import { useSyncExternalStore } from "react";

export type SiteTheme = "dark" | "light";

/**
 * Module-singleton subscription to the site theme.
 *
 * One MutationObserver for the whole app — not one per hook caller.
 * `useSyncExternalStore` is React's purpose-built primitive for external
 * store subs, so we avoid the extra render that `useState + useEffect`
 * pays on mount.
 */

let cachedTheme: SiteTheme = "dark";
let observer: MutationObserver | null = null;
const listeners = new Set<() => void>();

function readTheme(): SiteTheme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-site-theme") === "light"
    ? "light"
    : "dark";
}

function ensureObserver() {
  if (observer || typeof document === "undefined") return;
  cachedTheme = readTheme();
  observer = new MutationObserver(() => {
    const next = readTheme();
    if (next === cachedTheme) return;
    cachedTheme = next;
    listeners.forEach((fn) => fn());
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-site-theme"],
  });
}

function subscribe(cb: () => void): () => void {
  ensureObserver();
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): SiteTheme {
  return cachedTheme;
}

function getServerSnapshot(): SiteTheme {
  return "dark";
}

export function useSiteTheme(): SiteTheme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
