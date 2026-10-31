import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useFinePointer, useReducedMotion } from "../../design/useMotionPrefs";

/**
 * Pointer-weighted container for a *small number* of primary actions.
 * The element leans toward the cursor; the inner label leans further,
 * which reads as depth rather than as a gimmick.
 *
 * Only active for fine pointers that can hover, and never for visitors who
 * asked for reduced motion - on touch it renders as a plain element, so the
 * native tap target and hit area are untouched.
 */
export default function Magnetic({ children, strength = 0.28, className = "" }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 22, mass: 0.4 });
  const lx = useTransform(x, (v) => v * 0.45);
  const ly = useTransform(y, (v) => v * 0.45);

  if (!fine || reduced) {
    return <div className={className}>{children}</div>;
  }

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    my.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onBlur={reset}
    >
      <motion.div style={{ x: lx, y: ly }}>{children}</motion.div>
    </motion.div>
  );
}
