import { useEffect, useState } from "react";

/**
 * Environment probes used to scale the experience down rather than off.
 *
 * reduced  - the visitor asked for less motion (OS level), live-updating.
 * fine     - a precision pointer that can hover: gates magnetic/cursor work.
 * compact  - small viewport: gates pinned/horizontal choreography and
 *            lowers canvas density.
 */
function read(query) {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(query).matches;
}

export function useMediaFlag(query) {
  /*
   * Always starts false, even though the answer is knowable on the client.
   *
   * The page is prerendered, where matchMedia does not exist, so the HTML is
   * always built as "no". If the first client render answered truthfully it
   * would disagree with that HTML and React would throw the whole tree away
   * and re-render it - a hydration mismatch, and a visible one on a phone,
   * where the diagram would swap from drawing to list mid-paint. So the
   * first render matches the HTML and the effect below tells the truth one
   * tick later.
   */
  const [flag, setFlag] = useState(false);

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
