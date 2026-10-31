import React from "react";
import { motion } from "framer-motion";
import { DUR, EASE, VIEWPORT } from "../../design/motion";
import useReveal from "../../design/useReveal";

/**
 * A hairline that draws itself left-to-right as it enters.
 * Rules carry the structure of this layout, so they are animated as content
 * rather than decoration - but only when they are still below the fold. A
 * rule already on screen at hydration is simply drawn.
 */
export default function Rule({ className = "", delay = 0, tone = "line" }) {
  const [ref, armed] = useReveal();
  const background =
    tone === "signal"
      ? "var(--signal)"
      : tone === "strong"
      ? "var(--line-strong)"
      : "var(--line)";

  const motionProps = armed
    ? {
        initial: { scaleX: 0 },
        whileInView: { scaleX: 1 },
        viewport: VIEWPORT,
        transition: { duration: DUR.reveal, ease: EASE, delay },
      }
    : {};

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={`h-px w-full origin-left ${className}`}
      style={{ background }}
      {...motionProps}
    />
  );
}
