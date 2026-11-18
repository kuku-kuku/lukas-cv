import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import Odometer from "../motion/Odometer";
import Reveal from "../motion/Reveal";
import { PROCESS_STEPS, SECTIONS } from "../../design/content";
import { useCompactViewport, useReducedMotion } from "../../design/useMotionPrefs";

/**
 * 05 - PROCESS
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
    // Ends while the final step is still on screen, so the meter is full
    // when you reach the end of the strip rather than after it.
    offset: ["start 0.85", "end 0.75"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progress = useSpring(raw, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section
      id="process"
      ref={ref}
      aria-labelledby="process-title"
      className="invert-section section relative z-10 border-y"
      style={{ borderColor: "rgba(10,10,11,0.35)" }}
    >
      <div className="shell">
        {/* Same opening as SectionHead (one reveal, odometer number,
            plain-text title), kept local for the stronger rule on the
            inverted ground. */}
        <Reveal as="header" className="mb-14 md:mb-20">
          <div className="flex items-baseline justify-between gap-6">
            <Odometer
              value={SECTIONS.find((x) => x.id === "process").index}
              className="label"
              style={{ color: "var(--signal)" }}
            />
            <span className="label flex-1 text-right md:text-left">
              {t("nav_process", "Process")}
            </span>
          </div>
          <div className="mt-3 h-px w-full" style={{ background: "var(--line-strong)" }} />
          <div className="mt-6 grid gap-6 md:grid-cols-12 md:gap-10">
            <h2 id="process-title" className="display-l md:col-span-7">
              {t("process_title")}
            </h2>
            <p className="lede md:col-span-5 md:pt-2">{t("process_lede")}</p>
          </div>
        </Reveal>

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

        <ol className="grid gap-x-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:grid-rows-[auto_auto_1fr_auto] lg:gap-x-0">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal as="li" i={(i % 3)}
              key={step.id}
              className="border-b pb-8 pt-6 lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:border-b-0 lg:border-r lg:px-5 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="font-mono text-label"
                  style={{ color: "var(--signal)" }}
                >
                  {step.index}
                </span>
                <span className="label">{`/0${PROCESS_STEPS.length}`}</span>
              </div>

              <h3 className="mt-4 text-lg font-semibold tracking-display">
                {t(step.titleKey)}
              </h3>
              <p className="copy-sm mt-3 max-w-[34ch]">
                {t(step.bodyKey)}
              </p>

              <div
                /* self-start, not self-end: the row is shared by all six
                   steps, so aligning to the bottom lines up the blocks'
                   baselines only if they are the same height - and they are
                   not. Starting them together is what makes the "Ka gaunate"
                   rule read as one line across the strip. */
                className="mt-5 self-start border-t pt-3"
                style={{ borderColor: "var(--line)" }}
              >
                <span className="label">{t("deliverable", "You get")}</span>
                <p className="mt-2 max-w-[32ch] text-base font-medium leading-snug">
                  {t(step.outKey)}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
