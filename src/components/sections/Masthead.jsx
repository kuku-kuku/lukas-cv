import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import LatticeField from "../LatticeField";
import Magnetic from "../motion/Magnetic";
import { DUR, EASE } from "../../design/motion";
import { PRACTICE, PROJECTS, SECTIONS } from "../../design/content";
import { useReducedMotion } from "../../design/useMotionPrefs";

/**
 * 00 - MASTHEAD
 *
 * An editorial cover, not a centred hero: the wordmark is set as three
 * oversized lines on the left edge of the grid, the positioning statement sits
 * in the right column, and a specification strip closes the page fold with
 * facts rather than slogans.
 *
 * Scroll choreography is one transform on one element (the type block lifts
 * and fades as you leave) - the lattice behind it handles its own departure.
 */

const LINES = ["Svetainės,", "kurios atneša", "klientų."];

/*
 * A note on the opening.
 *
 * The masthead used to animate itself in on mount. Now that the page is
 * prerendered it arrives as finished HTML, and replaying that entrance would
 * mean the visitor sees the headline, watches it vanish at hydration, and
 * then watches it return - the exact flash prerendering is meant to remove.
 * So the masthead renders in its final state and the boot curtain carries
 * the opening beat instead. The scroll parallax below is unaffected: it is
 * driven by scroll position, not by mount.
 */

export default function Masthead() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  // Driven by raw window scroll rather than by measuring this section:
  // the masthead sits at scroll 0, where no scroll event ever fires to
  // correct a stale measurement, so a measured progress value that resolves
  // late would leave the headline invisible on first paint.
  const { scrollY } = useScroll();
  // A fixed value for the prerender and the first render; the real height
  // is measured right after mount and on every resize after that.
  const [vh, setVh] = useState(800);
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  // The hero held full opacity for only ~300px and then sat at half, which
  // read as disabled rather than as depth. It now stays solid through the
  // first half of the fold and only clears as the hero leaves.
  const y = useTransform(scrollY, [0, vh], [0, -60]);
  const fade = useTransform(scrollY, [vh * 0.5, vh], [1, 0]);

  // Three reasons to keep reading, not four facts about me. The old strip
  // led with BUSINESS / LOCATION / LANGUAGES, none of which answers the
  // question a visitor actually has in the first ten seconds.
  const trust = ["trust_response", "trust_price", "trust_free"];
  const workSection = SECTIONS.find((x) => x.id === "work");

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
        <span className="label">{t("remote_line")}</span>
      </div>

      <motion.div
        className="shell relative z-10 py-10"
        style={reduced ? undefined : { y, opacity: fade }}
      >
        {/* The accessible name is the visible headline. It used to be a
            hidden string that said something else, so the page announced a
            heading nobody could see. The practice name is carried by the
            byline below and by the JSON-LD, which is where it belongs. */}
        <h1
          id="masthead-title"
          aria-label={LINES.join(" ")}
          className="display-xl"
        >
          {LINES.map((line, i) => (
            <span key={line} className="mask-line">
              <motion.span
                className="block"
                aria-hidden="true"
                initial={false}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1,
                  ease: EASE,
                  delay: reduced ? 0 : 0.08 + i * 0.09,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
          <motion.p
            className="lede md:col-span-6"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: reduced ? 0 : 0.18 }}
          >
            {t("masthead_lede")}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 md:col-span-6"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: reduced ? 0 : 0.3 }}
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
                  className="absolute inset-0 origin-left scale-x-0 transition-transform duration-[300ms] ease-expo group-hover:scale-x-100"
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
              className="group inline-flex items-center gap-2 border-b px-1 py-4 text-sm font-medium"
              style={{ borderColor: "var(--line-strong)" }}
            >
              {t("cta_model", "Read the model")}
              <span
                aria-hidden="true"
                className="font-mono text-xs transition-transform duration-300 group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </button>
          </motion.div>

          {/* The right column used to be empty below the headline while the
              copy sat in it. The copy moved left to line up with the
              headline, and this index of the work takes the space - an
              entry point rather than a decorative void. */}
          <motion.div
            className="hidden md:col-span-4 md:col-start-9 md:block"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: reduced ? 0 : 0.42 }}
          >
            <div className="flex items-baseline justify-between">
              {/* Derived, so renumbering a section cannot leave this stale. */}
              <span className="label">
                {workSection.index} / {t(workSection.labelKey)}
              </span>
              <button
                type="button"
                onClick={() => goTo("work")}
                className="label transition-colors hover:text-ink"
              >
                {t("view_all", "All")} →
              </button>
            </div>
            <div className="mt-3 h-px w-full" style={{ background: "var(--line)" }} />
            <ul>
              {/* A taste, not the whole index - section 03 has the rest. */}
              {PROJECTS.slice(0, 4).map((p) => (
                <li
                  key={p.id}
                  className="border-b"
                  style={{ borderColor: "var(--line)" }}
                >
                  <button
                    type="button"
                    onClick={() => goTo("work")}
                    className="group flex w-full items-center gap-3 py-2.5 text-left"
                  >
                    <span className="font-mono text-label text-ink-3">{p.index}</span>
                    <span className="flex-1 truncate text-base text-ink-2 transition-colors group-hover:text-ink">
                      {t(`projects.${p.id}.title`)}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0"
                      style={{
                        background:
                          p.statusKey === "live" ? "var(--signal)" : "var(--ink-4)",
                      }}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* specification strip: facts, at the fold */}
      <div className="shell relative z-10">
        <div className="h-px w-full" style={{ background: "var(--line)" }} />
        <ul className="grid grid-cols-1 sm:grid-cols-3">
          {trust.map((key, i) => (
            <motion.li
              key={key}
              className="flex items-center gap-3 border-b py-4 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0"
              style={{ borderColor: "var(--line)" }}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.base, ease: EASE, delay: i * 0.06 }}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0"
                style={{ background: "var(--signal)" }}
              />
              <span className="text-base font-medium">{t(key)}</span>
            </motion.li>
          ))}
        </ul>
        <div className="h-px w-full" style={{ background: "var(--line)" }} />

        <div className="mt-5 flex items-center justify-between">
          {/* A byline, not a performance: animating it per character would
              leave a span with no accessible name. */}
          <span className="label">
            {PRACTICE.name} · {PRACTICE.domain}
          </span>
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
