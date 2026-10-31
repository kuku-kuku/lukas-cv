import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionHead from "../SectionHead";
import Reveal from "../motion/Reveal";
import Rule from "../motion/Rule";
import { CAPABILITIES, PROJECTS, RATE_CARD } from "../../design/content";
import { DUR, EASE, STAGGER } from "../../design/motion";
import { useCompactViewport, useFinePointer, useReducedMotion } from "../../design/useMotionPrefs";

/**
 * 01 - CAPABILITIES
 *
 * Presented as a matrix, not as feature cards: six capabilities on the left,
 * one detail panel on the right. The connective tissue is evidence - each
 * capability names the shipped work it draws on, and selecting one marks the
 * other capabilities that share that evidence. That is what makes it a system
 * view: you can see which abilities travel together on a real project.
 *
 * Evidence is clickable and hands the selected project to the work index
 * (lifted into Home), so the two sections stay in agreement.
 *
 * Compact viewports collapse the same data into an accordion; the panel markup
 * is shared so there is only one description of a capability in the DOM.
 */
export default function Capabilities({ onEvidence }) {
  const { t } = useTranslation();
  const compact = useCompactViewport();
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState(CAPABILITIES[0].id);

  const projectTitle = (id) => t(`projects.${id}.title`);

  const active = CAPABILITIES.find((c) => c.id === activeId) || CAPABILITIES[0];

  /** Capabilities that share at least one piece of evidence with the active one. */
  const related = useMemo(() => {
    const set = new Set();
    CAPABILITIES.forEach((c) => {
      if (c.id === active.id) return;
      if (c.evidence.some((e) => active.evidence.includes(e))) set.add(c.id);
    });
    return set;
  }, [active]);

  const detail = (cap) => (
    <div className="pb-2">
      <p className="max-w-[58ch] text-[0.975rem] leading-relaxed text-ink-2">
        {t(cap.bodyKey)}
      </p>

      <ul className="mt-6 grid grid-cols-2 border-t" style={{ borderColor: "var(--line)" }}>
        {cap.items.map((item) => (
          <li
            key={item}
            className="border-b border-r py-3 pr-3 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-ink-2 last:border-r-0 even:border-r-0"
            style={{ borderColor: "var(--line)" }}
          >
            {item}
          </li>
        ))}
      </ul>

      {cap.evidence.length > 0 && (
        <div className="mt-6">
          <span className="label">{t("evidence", "Evidence")}</span>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {cap.evidence.map((pid) => {
              const project = PROJECTS.find((p) => p.id === pid);
              if (!project) return null;
              return (
                <button
                  key={pid}
                  type="button"
                  onClick={() => onEvidence?.(pid)}
                  className="signal-link text-sm font-medium"
                >
                  <span className="mr-2 font-mono text-[0.6875rem] text-ink-3">
                    {project.index}
                  </span>
                  {projectTitle(pid)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="shell relative z-10 py-24 md:py-32"
    >
      <SectionHead
        id="capabilities"
        index="01"
        eyebrow={t("nav_capabilities", "Capabilities")}
        title={t("cap_title")}
        lede={t("cap_lede")}
      />

      <div className="grid gap-x-10 md:grid-cols-12">
        {/* ---- matrix ---- */}
        <div className="md:col-span-6">
          <div className="h-px w-full" style={{ background: "var(--line-strong)" }} />
          <ul>
            {CAPABILITIES.map((cap, i) => {
              const on = cap.id === activeId;
              const isRelated = related.has(cap.id);
              return (
                <motion.li
                  key={cap.id}
                  className="border-b"
                  style={{ borderColor: "var(--line)" }}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{
                    duration: DUR.m,
                    ease: EASE,
                    delay: reduced ? 0 : i * STAGGER.tight,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(compact && on ? "" : cap.id)}
                    onMouseEnter={fine && !compact ? () => setActiveId(cap.id) : undefined}
                    onFocus={() => setActiveId(cap.id)}
                    aria-expanded={compact ? on : undefined}
                    aria-pressed={compact ? undefined : on}
                    className="group relative flex w-full items-center gap-4 py-5 text-left md:gap-6"
                  >
                    <span
                      className="font-mono text-[0.6875rem] tracking-label transition-colors duration-200"
                      style={{ color: on ? "var(--signal)" : "var(--ink-3)" }}
                    >
                      {cap.index}
                    </span>

                    <span
                      className={`flex-1 text-lg font-semibold tracking-display transition-colors duration-200 md:text-[1.375rem] ${
                        on ? "text-ink" : "text-ink-2 group-hover:text-ink"
                      }`}
                    >
                      {t(cap.titleKey)}
                    </span>

                    {/* shared-evidence marker */}
                    <span
                      className="label hidden transition-opacity duration-200 md:block"
                      style={{ opacity: isRelated ? 1 : 0 }}
                      aria-hidden={!isRelated}
                    >
                      {isRelated ? t("shared", "shared") : ""}
                    </span>

                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 transition-colors duration-200"
                      style={{
                        background: on
                          ? "var(--signal)"
                          : isRelated
                          ? "var(--ink-3)"
                          : "var(--ink-4)",
                      }}
                    />

                    {on && !compact && (
                      <motion.span
                        layoutId="cap-marker"
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-full w-[2px]"
                        style={{ background: "var(--signal)", marginLeft: "-0.75rem" }}
                        transition={
                          reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }
                        }
                      />
                    )}
                  </button>

                  {/* compact: inline detail */}
                  {compact && (
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduced ? 0 : DUR.s, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6">{detail(cap)}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* ---- detail panel (desktop) ---- */}
        {!compact && (
          <div className="md:col-span-6 md:col-start-7">
            <div className="sticky top-[6rem]">
              <div className="flex items-baseline justify-between">
                <span className="label" style={{ color: "var(--signal)" }}>
                  {active.index}
                </span>
                <span className="label">{t("detail", "Detail")}</span>
              </div>
              <Rule className="mt-3" />
              <motion.div
                key={active.id}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DUR.s, ease: EASE }}
                className="mt-6"
              >
                <h3 className="display-m mb-5">{t(active.titleKey)}</h3>
                {detail(active)}
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* ---- rate card ---- */}
      <div className="mt-24 md:mt-32">
        <Reveal className="flex items-baseline justify-between gap-6" y={10}>
          <span className="label">{t("rate_card", "Engagements")}</span>
          <span className="label">{t("rate_note", "VAT not included · fixed scope or hourly")}</span>
        </Reveal>
        <Rule className="mt-3" tone="strong" />

        <ul>
          {RATE_CARD.map((row, i) => (
            <motion.li
              key={row.id}
              className="border-b"
              style={{ borderColor: "var(--line)" }}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{
                duration: DUR.m,
                ease: EASE,
                delay: reduced ? 0 : i * STAGGER.tight,
              }}
            >
              <div className="group flex items-baseline gap-4 py-4 md:gap-8">
                <span className="font-mono text-[0.6875rem] tracking-label text-ink-3">
                  {String(row.id).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[0.975rem] font-medium transition-colors duration-200 group-hover:text-ink md:text-lg">
                  {t(row.titleKey)}
                </span>
                <span className="font-mono text-sm tabular-nums text-ink">
                  {row.from && (
                    <span className="mr-2 text-[0.6875rem] uppercase tracking-label text-ink-3">
                      {t("starting_from", "From")}
                    </span>
                  )}
                  {t(row.priceKey)}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
