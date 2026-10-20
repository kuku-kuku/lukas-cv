import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import LatticeField from "../LatticeField";
import LiveClock from "../LiveClock";
import Magnetic from "../motion/Magnetic";
import SplitText from "../motion/SplitText";
import { DUR, EASE } from "../../design/motion";
import { PRACTICE } from "../../design/content";
import { useReducedMotion } from "../../design/useMotionPrefs";

/**
 * 00 — MASTHEAD
 *
 * An editorial cover, not a centred hero: the wordmark is set as three
 * oversized lines on the left edge of the grid, the positioning statement sits
 * in the right column, and a specification strip closes the page fold with
 * facts rather than slogans.
 *
 * Scroll choreography is one transform on one element (the type block lifts
 * and fades as you leave) — the lattice behind it handles its own departure.
 */

const LINES = ["SOFTWARE", "ENGINEERING", "PRACTICE"];

export default function Masthead() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  // Driven by raw window scroll rather than by measuring this section:
  // the masthead sits at scroll 0, where no scroll event ever fires to
  // correct a stale measurement, so a measured progress value that resolves
  // late would leave the headline invisible on first paint.
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(() =>
    typeof window === "undefined" ? 800 : window.innerHeight
  );
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const y = useTransform(scrollY, [0, vh], ["0%", "-14%"]);
  const fade = useTransform(scrollY, [0, vh * 0.8], [1, 0]);

  const specs = [
    { labelKey: "spec_status", valueKey: "spec_status_value" },
    { labelKey: "spec_base", valueKey: "spec_base_value" },
    { labelKey: "spec_languages", valueKey: "spec_languages_value" },
    { labelKey: "spec_engagement", valueKey: "spec_engagement_value" },
  ];

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="index"
      aria-labelledby="masthead-title"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-10 pt-20 md:pb-12 md:pt-[4.5rem]"
    >
      {/* ambient system */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <LatticeField />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 80% at 15% 10%, transparent 20%, rgba(10,10,11,0.82) 78%)",
          }}
        />
      </div>

      <div className="shell relative z-10 flex items-baseline justify-between">
        <span className="label">00 / {t("nav_index", "Index")}</span>
        <LiveClock className="text-[0.6875rem] tracking-label uppercase text-ink-2" />
      </div>

      <motion.div
        className="shell relative z-10 py-10"
        style={reduced ? undefined : { y, opacity: fade }}
      >
        <h1 id="masthead-title" className="display-xl">
          <span className="sr-only">
            {PRACTICE.name} — {t("masthead_sr", "software engineering practice")}
          </span>
          {LINES.map((line, i) => (
            <span key={line} className="mask-line">
              <motion.span
                className="block"
                aria-hidden="true"
                initial={reduced ? false : { y: "108%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1,
                  ease: EASE,
                  delay: reduced ? 0 : 0.08 + i * 0.09,
                }}
              >
                {line}
                {i === LINES.length - 1 && (
                  <span style={{ color: "var(--signal)" }}>.</span>
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
          <motion.p
            className="lede md:col-span-5 md:col-start-7"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.m, ease: EASE, delay: reduced ? 0 : 0.18 }}
          >
            {t("masthead_lede")}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 md:col-span-5 md:col-start-7"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.m, ease: EASE, delay: reduced ? 0 : 0.3 }}
          >
            <Magnetic>
              <button
                type="button"
                onClick={() => goTo("contact")}
                className="group relative inline-flex items-center gap-3 overflow-hidden border px-6 py-4 text-sm font-semibold"
                style={{ borderColor: "var(--signal)" }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-[320ms] ease-expo group-hover:scale-y-100"
                  style={{ background: "var(--signal)" }}
                />
                <span className="relative transition-colors duration-200 group-hover:text-base">
                  {t("cta_brief", "Start a brief")}
                </span>
                <span
                  aria-hidden="true"
                  className="relative font-mono text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:text-base"
                >
                  →
                </span>
              </button>
            </Magnetic>

            <button
              type="button"
              onClick={() => goTo("method")}
              className="signal-link px-2 py-4 text-sm font-medium"
            >
              {t("cta_model", "Read the model")}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* specification strip: facts, at the fold */}
      <div className="shell relative z-10">
        <div className="h-px w-full" style={{ background: "var(--line)" }} />
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.labelKey}
              className="border-b border-r px-0 py-4 last:border-r-0 md:border-b-0 md:px-0 md:py-5"
              style={{ borderColor: "var(--line)" }}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DUR.m,
                ease: EASE,
                delay: reduced ? 0 : 0.42 + i * 0.06,
              }}
            >
              <dt className="label">{t(spec.labelKey)}</dt>
              <dd className="mt-2 pr-4 text-[0.9375rem] font-medium leading-snug">
                {spec.labelKey === "spec_status" && (
                  <span
                    aria-hidden="true"
                    className="mr-2 inline-block h-1.5 w-1.5 align-middle animate-signal-pulse"
                    style={{ background: "var(--signal)" }}
                  />
                )}
                {t(spec.valueKey)}
              </dd>
            </motion.div>
          ))}
        </dl>
        <div className="h-px w-full" style={{ background: "var(--line)" }} />

        <div className="mt-5 flex items-center justify-between">
          <SplitText
            as="span"
            className="label"
            text={`${PRACTICE.name} · ${PRACTICE.domain}`}
            trigger="mount"
            delay={0.5}
            stagger={0.02}
          />
          <button
            type="button"
            onClick={() => goTo("capabilities")}
            className="label flex items-center gap-2 hover:text-ink"
          >
            {t("scroll_cue", "Scroll")}
            <motion.span
              aria-hidden="true"
              animate={reduced ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </button>
        </div>
      </div>
    </section>
  );
}
