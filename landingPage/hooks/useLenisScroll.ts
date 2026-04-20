"use client";

import { LenisContext } from "@/landingPage/providers/LenisProvider";
import { useContext } from "react";

export function useLenisScroll() {
  return useContext(LenisContext)?.current ?? null;
}
