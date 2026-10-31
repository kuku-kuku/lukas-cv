import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PRACTICE, SECTIONS } from "../design/content";
import { DUR, EASE, STAGGER } from "../design/motion";
import useActiveSection from "../design/useActiveSection";
import { useReducedMotion } from "../design/useMotionPrefs";

/**
 * COMMAND RAIL - navigation as instrumentation.
 *
 * Desktop: a permanent hairline rail on the left. It carries the section
 * indices, a travelling marker that tracks the section you are reading, and a
 * progress line drawn along its edge. Labels are not hidden decoration: they
 * expand on hover and focus, and the index itself is always legible.
 *
 * Small screens: a slim top meter that reports the current section, plus a
 * full-height sheet. Nothing hover-dependent, everything reachable with one
 * thumb.
 *
 * Both share one state source (useActiveSection) so the rail, the meter and
 * the sheet can never disagree.
 */
export default function CommandRail() {
  const { t, i18n } = useTranslation();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const activeId = useActiveSection(ids, "index");
  const activeSection = SECTIONS.find((s) => s.id === activeId) || SECTIONS[0];

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const goTo = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      setOpen(false);
    },
    [reduced]
  );

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language?.startsWith("lt") ? "en" : "lt");
  };

  const lang = i18n.language?.startsWith("lt") ? "LT" : "EN";

  // Close the sheet on Escape and lock the page behind it.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <a
        href="#capabilities"
        className="sr-only-focusable fixed left-4 top-4 z-[90] bg-base px-4 py-2 text-sm"
      >
        {t("skip_to_content", "Skip to content")}
      </a>

      {/* ---------------- desktop rail ---------------- */}
      <nav
        aria-label={t("nav_aria", "Sections")}
        className="fixed left-0 top-0 z-50 hidden h-screen w-[4.5rem] flex-col justify-between border-r md:flex"
        style={{
          borderColor: "var(--line)",
          background: "rgba(10,10,11,0.72)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* progress drawn along the rail edge */}
        <motion.div
          aria-hidden="true"
          className="absolute right-[-1px] top-0 w-px origin-top"
          style={{ height: "100%", background: "var(--signal)", scaleY: progress }}
        />

        <button
          type="button"
          onClick={() => goTo("index")}
          className="flex h-[4.5rem] w-full items-center justify-center border-b text-lg font-extrabold tracking-tightest hairline"
          style={{ borderColor: "var(--line)" }}
          aria-label={`${PRACTICE.mark} - ${t("nav_index", "Index")}`}
        >
          B
        </button>

        <ul className="flex flex-1 flex-col justify-center gap-1 py-6">
          {SECTIONS.map((s) => {
            const on = s.id === activeId;
            return (
              <li key={s.id} className="group relative">
                <button
                  type="button"
                  onClick={() => goTo(s.id)}
                  aria-current={on ? "true" : undefined}
                  className="relative flex h-11 w-full items-center justify-center"
                >
                  <span
                    className="font-mono text-label transition-colors duration-200"
                    style={{ color: on ? "var(--signal)" : "var(--ink-3)" }}
                  >
                    {s.index}
                  </span>
                  {on && (
                    <motion.span
                      layoutId="rail-marker"
                      aria-hidden="true"
                      className="absolute left-0 h-6 w-[2px]"
                      style={{ background: "var(--signal)" }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 34 }
                      }
                    />
                  )}
                  {/* label flyout: appears on hover and on keyboard focus */}
                  <span
                    className="pointer-events-none absolute left-[4.5rem] whitespace-nowrap border px-3 py-2 text-[0.8125rem] font-medium opacity-0 transition-[opacity,transform] duration-200 ease-expo group-hover:opacity-100 group-focus-within:opacity-100"
                    style={{
                      borderColor: "var(--line)",
                      background: "var(--bg-elev)",
                      transform: "translateX(-6px)",
                    }}
                  >
                    {t(s.labelKey)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="border-t hairline" style={{ borderColor: "var(--line)" }}>
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex h-[4.5rem] w-full flex-col items-center justify-center gap-1"
            aria-label={`${lang} - ${t("switch_language", "Switch language")}`}
          >
            <span className="font-mono text-label text-ink">
              {lang}
            </span>
            <span
              aria-hidden="true"
              className="h-px w-5"
              style={{ background: "var(--line-strong)" }}
            />
          </button>
        </div>
      </nav>

      {/* ---------------- compact meter ---------------- */}
      <div
        className="fixed inset-x-0 top-0 z-50 md:hidden"
        style={{
          background: "rgba(10,10,11,0.86)",
          backdropFilter: "blur(10px)",
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <div className="flex h-14 items-center justify-between px-5">
          <button
            type="button"
            onClick={() => goTo("index")}
            className="text-base font-extrabold tracking-tightest"
          >
            {PRACTICE.mark}
          </button>

          <div className="flex items-center gap-4">
            <span className="label" aria-live="polite">
              {activeSection.index} / {t(activeSection.labelKey)}
            </span>
            <button
              type="button"
              onClick={toggleLanguage}
              className="font-mono text-label text-ink"
              aria-label={`${lang} - ${t("switch_language", "Switch language")}`}
            >
              {lang}
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="nav-sheet"
              className="relative flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
              aria-label={t("open_menu", "Open menu")}
            >
              <span className="h-px w-5" style={{ background: "var(--ink)" }} />
              <span className="h-px w-5" style={{ background: "var(--ink)" }} />
            </button>
          </div>
        </div>
        <motion.div
          aria-hidden="true"
          className="h-px origin-left"
          style={{ background: "var(--signal)", scaleX: progress }}
        />
      </div>

      {/* ---------------- compact sheet ---------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-sheet"
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : DUR.base, ease: EASE }}
            style={{ background: "var(--bg)" }}
          >
            <div
              className="flex h-14 items-center justify-between px-5"
              style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
            >
              <span className="label">{t("nav_aria", "Sections")}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center text-xl"
                aria-label={t("close", "Close")}
              >
                ×
              </button>
            </div>

            <ul className="px-5 pt-4">
              {SECTIONS.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: DUR.slow,
                    ease: EASE,
                    delay: reduced ? 0 : i * STAGGER,
                  }}
                  className="border-b hairline"
                  style={{ borderColor: "var(--line)" }}
                >
                  <button
                    type="button"
                    onClick={() => goTo(s.id)}
                    className="flex w-full items-baseline gap-5 py-5 text-left"
                  >
                    <span
                      className="font-mono text-label"
                      style={{
                        color: s.id === activeId ? "var(--signal)" : "var(--ink-3)",
                      }}
                    >
                      {s.index}
                    </span>
                    <span className="text-2xl font-semibold tracking-display">
                      {t(s.labelKey)}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
