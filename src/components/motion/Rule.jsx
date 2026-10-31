import React from "react";
import { motion } from "framer-motion";
import { DUR, EASE, VIEWPORT } from "../../design/motion";
import { useReducedMotion } from "../../design/useMotionPrefs";

/**
 * A hairline that draws itself left-to-right as it enters.
 * Rules carry the structure of this layout, so they are animated as
 * content rather than decoration.
 */
export default function Rule({ className = "", delay = 0, tone = "line" }) {
  const reduced = useReducedMotion();
  const background =
    tone === "signal" ? "var(--signal)" : tone === "strong" ? "var(--line-strong)" : "var(--line)";

  return (
    <motion.div
      aria-hidden="true"
      className={`h-px w-full origin-left ${className}`}
      style={{ background }}
      initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: reduced ? 0 : DUR.reveal, ease: EASE, delay }}
    />
  );
}
