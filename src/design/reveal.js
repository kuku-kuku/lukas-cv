/**
 * One scroll reveal for the whole site.
 *
 * Every revealed element goes through a single shared IntersectionObserver
 * and a single CSS rule (see `[data-reveal]` in styles.css). The state lives
 * in a data attribute written straight onto the DOM node, not in React
 * state, so:
 *
 *  - the prerendered HTML carries no motion styles at all. A crawler, a
 *    JS-disabled visitor and the first paint all get finished content;
 *  - hydration never re-renders anything to start or stop a reveal;
 *  - StrictMode's mount / unmount / mount only re-observes the node.
 *
 * The rule that removes the old "text shows up twice" bug: an element is
 * judged from its FIRST observer report, which arrives after layout and
 * after scroll restoration. If it is on screen then, it is left alone for
 * good. Only something genuinely below (or above) the viewport is hidden,
 * and it is revealed exactly once when it scrolls in.
 *
 * States: (none) finished -> "armed" hidden, waiting -> "shown" animating ->
 * (none) again once the transition ends, so no clip-path is left behind to
 * cut off focus rings or hover effects.
 */

const seen = new WeakSet();
let io = null;

function reduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

function finish(el) {
  const done = () => {
    el.removeAttribute("data-reveal");
    el.removeEventListener("transitionend", onEnd);
    clearTimeout(timer);
  };
  // transitionend bubbles from children (the odometer digits, hover
  // transitions); only the element's own clip-path ends the reveal.
  const onEnd = (e) => {
    if (e.target === el && e.propertyName === "clip-path") done();
  };
  el.addEventListener("transitionend", onEnd);
  // Safety net for a transition that never fires (tab hidden, element
  // removed from layout).
  const timer = setTimeout(done, 2000);
}

function getObserver() {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target;

        if (!seen.has(el)) {
          seen.add(el);
          const r = entry.boundingClientRect;
          const onScreen = r.top < window.innerHeight && r.bottom > 0;
          if (onScreen) {
            io.unobserve(el);
          } else {
            el.setAttribute("data-reveal", "armed");
          }
          continue;
        }

        if (entry.isIntersecting && el.getAttribute("data-reveal") === "armed") {
          io.unobserve(el);
          el.setAttribute("data-reveal", "shown");
          finish(el);
        }
      }
    },
    // Fires once the element's top has cleared the bottom 8% of the
    // viewport, so the reveal is under way by the time it is read.
    { rootMargin: "0px 0px -8% 0px", threshold: 0 }
  );
  return io;
}

/** Observe an element; returns the cleanup for useEffect. */
export function observeReveal(el) {
  if (!el || typeof IntersectionObserver === "undefined" || reduced()) {
    return () => {};
  }
  const observer = getObserver();
  observer.observe(el);
  return () => observer.unobserve(el);
}
