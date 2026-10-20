import { useEffect, useState } from "react";

/**
 * Environment probes used to scale the experience down rather than off.
 *
 * reduced  — the visitor asked for less motion (OS level), live-updating.
 * fine     — a precision pointer that can hover: gates magnetic/cursor work.
 * compact  — small viewport: gates pinned/horizontal choreography and
 *            lowers canvas density.
 */
function read(query) {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(query).matches;
}

export function useMediaFlag(query) {
  const [flag, setFlag] = useState(() => read(query));

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mql = window.matchMedia(query);
    const onChange = (e) => setFlag(e.matches);
    mql.addEventListener("change", onChange);
    setFlag(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return flag;
}

export const useReducedMotion = () =>
  useMediaFlag("(prefers-reduced-motion: reduce)");

export const useFinePointer = () =>
  useMediaFlag("(hover: hover) and (pointer: fine)");

export const useCompactViewport = () => useMediaFlag("(max-width: 767px)");
