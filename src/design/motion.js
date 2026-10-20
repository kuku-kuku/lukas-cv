/**
 * Motion tokens — the single vocabulary every animation in the site speaks.
 * Mirrors the CSS custom properties in src/styles.css.
 *
 * Rule of the system: things enter from below, along the reading direction,
 * with an expo-out curve. Nothing bounces. Nothing spins. Nothing loops
 * unless it is reporting live state.
 */

export const EASE = [0.16, 1, 0.3, 1]; // expo-out: fast commit, long settle
export const EASE_INOUT = [0.76, 0, 0.24, 1];

export const DUR = {
  xs: 0.18,
  s: 0.32,
  m: 0.6,
  l: 0.9,
  xl: 1.4,
};

export const STAGGER = {
  tight: 0.035,
  base: 0.07,
  loose: 0.12,
};

/** Shared viewport config: reveal once, slightly before the edge. */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" };

/* ---------------- Variants ---------------- */

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.m, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.m, ease: EASE } },
};

/** Masked line: the signature text reveal. Parent must clip overflow. */
export const maskUp = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: DUR.l, ease: EASE } },
};

export const ruleDraw = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: DUR.l, ease: EASE } },
};

/** Container that hands timing to its children. */
export const stagger = (amount = STAGGER.base, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: amount, delayChildren: delay } },
});

/**
 * Reduced-motion fallback: identical final state, no travel.
 * Components swap variants rather than branching their markup, so the DOM
 * (and therefore the content) is the same either way.
 */
export const still = {
  hidden: { opacity: 1, y: 0, x: 0, scaleX: 1 },
  show: { opacity: 1, y: 0, x: 0, scaleX: 1, transition: { duration: 0 } },
};
