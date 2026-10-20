import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import SplitText from "../motion/SplitText";
import Reveal from "../motion/Reveal";
import { PROCESS_STEPS } from "../../design/content";
import { DUR, EASE, STAGGER } from "../../design/motion";
import { useCompactViewport, useReducedMotion } from "../../design/useMotionPrefs";

/**
 * 05 — PROCESS
 *
 * The one inverted spread on the site. Flipping to bone-on-black here does
 * two things: it breaks the vertical monotony of a long dark page at exactly
 * the point where the reader is being asked to imagine working together, and
 * it makes the section recognisable in a screenshot with every animation off.
 *
 * Choreography is scrubbed, not pinned: the rule between the steps draws
 * itself in proportion to how far through the section you have scrolled. The
 * page never takes the scroll away from you, and on phones the strip becomes
 * an ordinary vertical list.
 */
export default function Process() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const compact = useCompactViewport();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progress = useSpring(raw, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section
      id="process"
      ref={ref}
      aria-labelledby="process-title"
      className="invert-section relative z-10 py-24 md:py-32"
    >
      <div className="shell">
        <header className="mb-14 md:mb-20">
          <div className="flex items-baseline justify-between gap-6">
            <span className="label" style={{ color: "var(--signal)" }}>
              05
            </span>
            <span className="label flex-1 text-right md:text-left">
              {t("nav_process", "Process")}
            </span>
          </div>
          <div className="mt-3 h-px w-full" style={{ background: "var(--line-strong)" }} />
          <div className="mt-6 grid gap-6 md:grid-cols-12 md:gap-10">
            <h2 id="process-title" className="display-l md:col-span-7">
              <SplitText text={t("process_title")} stagger={0.045} />
            </h2>
            <Reveal as="p" delay={0.12} className="lede md:col-span-5 md:pt-2">
              {t("process_lede")}
            </Reveal>
          </div>
        </header>

        {/* scrubbed progress rule */}
        {!compact && (
          <div className="relative mb-0 h-px w-full" style={{ background: "var(--line)" }}>
            <motion.div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-full origin-left"
              style={{
                background: "var(--signal)",
                scaleX: reduced ? 1 : progress,
              }}
            />
          </div>
        )}

        <ol className="grid gap-x-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-x-0">
          {PROCESS_STEPS.map((step, i) => (
            <motion.li
              key={step.id}
              className="border-b pb-8 pt-6 lg:border-b-0 lg:border-r lg:px-5 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              style={{ borderColor: "var(--line)" }}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{
                duration: DUR.m,
                ease: EASE,
                delay: reduced ? 0 : (i % 3) * STAGGER.base,
              }}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="font-mono text-[0.6875rem] tracking-label"
                  style={{ color: "var(--signal)" }}
                >
                  {step.index}
                </span>
                <span className="label">{`/0${PROCESS_STEPS.length}`}</span>
              </div>

              <h3 className="mt-4 text-lg font-semibold tracking-display">
                {t(step.titleKey)}
              </h3>
              <p className="mt-3 max-w-[34ch] text-[0.875rem] leading-relaxed text-ink-2">
                {t(step.bodyKey)}
              </p>

              <div className="mt-5 border-t pt-3" style={{ borderColor: "var(--line)" }}>
                <span className="label">{t("deliverable", "You get")}</span>
                <p className="mt-2 max-w-[32ch] text-[0.8125rem] font-medium leading-snug">
                  {t(step.outKey)}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
