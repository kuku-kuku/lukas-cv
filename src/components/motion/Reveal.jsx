import React from "react";
import { motion } from "framer-motion";
import { DUR, EASE, VIEWPORT, still } from "../../design/motion";
import { useReducedMotion } from "../../design/useMotionPrefs";

/**
 * The default entrance for any block of content.
 * Swaps to a no-travel variant under prefers-reduced-motion so the
 * composition is identical, only the choreography is gone.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  y = 18,
  duration = DUR.m,
  ...rest
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[Tag] || motion.div;

  const variants = reduced
    ? still
    : {
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: EASE, delay },
        },
      };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={variants}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
