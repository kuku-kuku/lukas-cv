/**
 * MOTION TOKENS - the single vocabulary every animation on this site speaks.
 *
 * Rules of the system (also written up in MOTION.md):
 *  1. Things enter from below, along the reading direction, on an expo-out
 *     curve. Nothing bounces, nothing spins, nothing overshoots.
 *  2. Anything that loops is reporting live state. Everything else runs once.
 *  3. Nothing rests at opacity < 1. A reveal that has finished is invisible
 *     as an effect - the content simply looks normal.
 *  4. Every reveal completes within DUR.reveal of entering the viewport.
 *  5. prefers-reduced-motion removes choreography, never content.
 *
 * Durations are seconds (Framer Motion); the CSS equivalents live in
 * src/styles.css as --dur-* and must be kept in step with these.
 */

/** Expo-out: commits fast, settles long. The house curve. */
export const EASE = [0.22, 1, 0.36, 1];
/** For things that leave and return (collapses, cross-fades). */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

export const DUR = {
  fast: 0.18,
  base: 0.3,
  slow: 0.6,
  reveal: 0.8,
};

/** One stagger step. Multiply by index; never let a list exceed DUR.reveal. */
export const STAGGER = 0.06;

/**
 * Shared viewport config for every scroll reveal.
 * `amount: 0.2` fires once a fifth of the element is in view, which is early
 * enough that nothing is still animating by the time it is read.
 */
export const VIEWPORT = { once: true, amount: 0.2 };

/* ---------------------------------------------------------------- variants */

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.base, ease: EASE } },
};

/** Masked line: the signature text reveal. The parent must clip overflow. */
export const maskUp = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: DUR.reveal, ease: EASE } },
};

export const ruleDraw = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: DUR.reveal, ease: EASE } },
};

/** Container that hands timing to its children. */
export const stagger = (amount = STAGGER, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: amount, delayChildren: delay } },
});

/**
 * Reduced-motion fallback: identical final state, no travel. Components swap
 * variants rather than branching their markup, so the DOM - and therefore the
 * content - is the same either way.
 */
export const still = {
  hidden: { opacity: 1, y: 0, x: 0, scaleX: 1 },
  show: { opacity: 1, y: 0, x: 0, scaleX: 1, transition: { duration: 0 } },
};
