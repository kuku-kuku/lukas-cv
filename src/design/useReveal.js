import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useMotionPrefs";

/**
 * Decides, once, whether an element should play its entrance.
 *
 * Prerendering changed the rules here. The page now arrives as finished HTML,
 * so an entrance animation that starts from `opacity: 0` does something new
 * and ugly: the visitor sees the real content, then hydration snaps it away,
 * then it fades back in. Worse, the prerendered HTML itself would carry
 * `opacity: 0` inline, which is the wrong thing to hand a crawler or anyone
 * browsing without JavaScript.
 *
 * So the rule is:
 *
 *   - during prerender and on the very first client render, nothing is
 *     animating and nothing carries motion styles. The HTML is the finished
 *     page.
 *   - immediately after mount each element asks one question: was I already
 *     on screen? If yes it stays exactly as rendered - no replay of something
 *     the visitor is already reading. If no, its entrance is armed and plays
 *     when it scrolls into view, as before.
 *
 * Returns `[ref, armed]`. Attach the ref, and pass motion props only when
 * `armed` is true.
 */
export default function useReveal() {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight && rect.bottom > 0;

    // Already visible: leave it alone. Below the fold: arm the entrance.
    if (!onScreen) setArmed(true);
  }, [reduced]);

  return [ref, armed];
}
