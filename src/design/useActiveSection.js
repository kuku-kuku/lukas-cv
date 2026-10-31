import { useEffect, useState } from "react";

/**
 * Tracks which section currently owns the viewport.
 *
 * The root margin collapses the observer root to a thin band across the
 * middle of the viewport (-40% from the top, -55% from the bottom). A section
 * is "active" when it crosses that band, which is where a reader's attention
 * actually is. Comparing intersection ratios instead - the previous approach -
 * favours whichever section is simply tallest, so a long work index stayed
 * selected while the next heading was already on screen.
 *
 * One observer, no scroll listener, no measuring per frame.
 */
const BAND = "-40% 0px -55% 0px";

export default function useActiveSection(ids, fallback) {
  const [active, setActive] = useState(fallback ?? ids[0]);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const visible = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        // Keep document order so a scroll that crosses two sections at once
        // settles on the later one rather than flickering.
        const next = ids.filter((id) => visible.has(id)).pop();
        if (next) setActive(next);
      },
      { threshold: 0, rootMargin: BAND }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
