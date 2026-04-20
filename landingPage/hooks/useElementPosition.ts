"use client";

import {
  type RefObject,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";

export interface ElementViewportBox {
  centerX: number;
  centerY: number;
  height: number;
  left: number;
  top: number;
  width: number;
}

export function useElementPosition<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
) {
  const boxRef = useRef<ElementViewportBox | null>(null);

  const measure = useCallback(() => {
    const element = targetRef.current;

    if (!element) {
      return null;
    }

    const rect = element.getBoundingClientRect();
    const nextBox = {
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
      height: rect.height,
      left: rect.left,
      top: rect.top,
      width: rect.width,
    };

    boxRef.current = nextBox;

    return nextBox;
  }, [targetRef]);

  useLayoutEffect(() => {
    const element = targetRef.current;

    if (!element) {
      return;
    }

    measure();

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    resizeObserver.observe(element);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, targetRef]);

  return {
    boxRef,
    measure,
  };
}
