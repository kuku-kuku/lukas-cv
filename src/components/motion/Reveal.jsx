import React from "react";
import { motion } from "framer-motion";
import { DUR, EASE, VIEWPORT } from "../../design/motion";
import useReveal from "../../design/useReveal";

/**
 * The default entrance for any block of content.
 *
 * Renders as finished content until useReveal says otherwise: during
 * prerender, on the first client render, under prefers-reduced-motion, and
 * for anything already on screen when the page hydrates. Only elements that
 * are still below the fold get motion props, so nothing the visitor is
 * already reading is snapped away and replayed.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  y = 18,
  duration = DUR.slow,
  ...rest
}) {
  const [ref, armed] = useReveal();
  const MotionTag = motion[Tag] || motion.div;

  const motionProps = armed
    ? {
        initial: "hidden",
        whileInView: "show",
        viewport: VIEWPORT,
        variants: {
          hidden: { opacity: 0, y },
          show: { opacity: 1, y: 0, transition: { duration, ease: EASE, delay } },
        },
      }
    : {};

  return (
    <MotionTag ref={ref} className={className} {...motionProps} {...rest}>
      {children}
    </MotionTag>
  );
}
