import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Rule from "../motion/Rule";
import { DUR, EASE, STAGGER, VIEWPORT } from "../../design/motion";
import useReveal from "../../design/useReveal";
import { useReducedMotion } from "../../design/useMotionPrefs";

/**
 * The band that replaced the engineering "Method" section on the homepage.
 *
 * That section explained how a vague request becomes a system - genuinely
 * interesting, and written for someone who already knows what a system is.
 * Three plain reasons do more work here. The method section and its
 * interactive diagram are not deleted; they move to the case studies, where
 * a reader has already decided they want the detail.
 */
const REASONS = [
  { id: "price", titleKey: "why_price_title", bodyKey: "why_price_body" },
  { id: "progress", titleKey: "why_progress_title", bodyKey: "why_progress_body" },
  { id: "speed", titleKey: "why_speed_title", bodyKey: "why_speed_body" },
];

export default function Why() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [revealRef, armed] = useReveal();

  return (
    <section
      ref={revealRef}
      aria-labelledby="why-title"
      className="shell relative z-10 py-16 md:py-24"
    >
      <h2 id="why-title" className="display-m">
        {t("why_title")}
      </h2>
      <Rule className="mt-5" />

      <ul className="mt-10 grid items-start gap-x-10 gap-y-8 md:grid-cols-3">
        {REASONS.map((r, i) => (
          <motion.li
            key={r.id}
            initial={armed ? { opacity: 0, y: 16 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{
              duration: DUR.base,
              ease: EASE,
              delay: reduced ? 0 : i * STAGGER,
            }}
          >
            <span
              aria-hidden="true"
              className="block h-1.5 w-1.5"
              style={{ background: "var(--signal)" }}
            />
            <h3 className="mt-4 text-xl font-semibold tracking-display">
              {t(r.titleKey)}
            </h3>
            <p className="copy-sm mt-3">{t(r.bodyKey)}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
