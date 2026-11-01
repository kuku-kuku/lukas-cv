import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionHead from "../SectionHead";
import Reveal from "../motion/Reveal";
import Rule from "../motion/Rule";
import { CAPABILITIES, PROJECTS } from "../../design/content";
import { DUR, EASE, STAGGER, VIEWPORT } from "../../design/motion";
import { useCompactViewport, useFinePointer, useReducedMotion } from "../../design/useMotionPrefs";
import useReveal from "../../design/useReveal";

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
  const [revealRef, armed] = useReveal();
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
      <p className="copy">
        {t(cap.bodyKey)}
      </p>

      {/* The technology lives behind a disclosure. A client who wants it can
          open it; nobody has to read "Core Web Vitals" to understand that
          their site will be fast. */}
      {cap.tech?.length > 0 && (
        <details className="mt-6 border-t pt-4" style={{ borderColor: "var(--line)" }}>
          <summary className="label cursor-pointer select-none">
            {t("tech_details")}
          </summary>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {cap.tech.map((item) => (
              <li key={item} className="font-mono text-label text-ink-2">
                {item}
              </li>
            ))}
          </ul>
        </details>
      )}

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
                  <span className="mr-2 font-mono text-label normal-case text-ink-3">
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
      ref={revealRef}
      aria-labelledby="capabilities-title"
      className="shell section relative z-10"
    >
      <SectionHead
        id="capabilities"
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
                  initial={armed ? { opacity: 0, y: 14 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{
                    duration: DUR.slow,
                    ease: EASE,
                    delay: reduced ? 0 : i * STAGGER,
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
                      className="font-mono text-label transition-colors duration-200"
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
                          transition={{ duration: reduced ? 0 : DUR.base, ease: EASE }}
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
                initial={armed ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DUR.base, ease: EASE }}
                className="mt-6"
              >
                <h3 className="display-m mb-5">{t(active.titleKey)}</h3>
                {detail(active)}
              </motion.div>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}
