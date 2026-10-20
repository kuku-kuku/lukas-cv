import { useEffect, useState } from "react";

/**
 * Tracks which section currently owns the viewport.
 *
 * Uses one IntersectionObserver with a set of thresholds and picks the entry
 * with the largest visible ratio, which behaves correctly for sections of
 * very different heights (a tall work index next to a short stack table).
 * No scroll listener, no measuring on every frame.
 */
export default function useActiveSection(ids, fallback) {
  const [active, setActive] = useState(fallback ?? ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return undefined;

    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let best = null;
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      {
        threshold: [0, 0.12, 0.25, 0.4, 0.6, 0.8, 1],
        rootMargin: "-12% 0px -24% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
