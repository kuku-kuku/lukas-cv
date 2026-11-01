import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionHead from "../SectionHead";
import Rule from "../motion/Rule";
import { FAQ } from "../../design/content";
import { DUR, EASE, STAGGER, VIEWPORT } from "../../design/motion";
import useReveal from "../../design/useReveal";
import { useReducedMotion } from "../../design/useMotionPrefs";

/**
 * 05 - FAQ
 *
 * The questions clients actually ask, including the two most people are too
 * polite to ask out loud: what happens when it breaks, and who owns the
 * thing afterwards. Answering those in public is worth more than any
 * adjective.
 *
 * The same answers are emitted as FAQPage structured data from root.jsx, so
 * what Google shows is what the page says.
 *
 * The right-hand column used to be four empty grid columns. Someone whose
 * question is not on the list is the most motivated reader on this page, so
 * that space now carries the way to ask it.
 */
export default function Faq() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [revealRef, armed] = useReveal();
  const [open, setOpen] = useState(null);

  // Takes the visitor to the brief rather than opening the drawer: by this
  // point in the page they have a question, not a package in mind.
  const ask = () => {
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="faq"
      ref={revealRef}
      aria-labelledby="faq-title"
      className="shell section relative z-10"
    >
      <SectionHead
        id="faq"
        eyebrow={t("nav_faq")}
        title={t("faq_title")}
      />

      <div className="md:grid md:grid-cols-12">
        <ul className="md:col-span-8">
          <li className="h-px w-full" style={{ background: "var(--line-strong)" }} />
          {FAQ.map((item, i) => {
            const isOpen = open === item.id;
            return (
              <motion.li
                key={item.id}
                className="border-b"
                style={{ borderColor: "var(--line)" }}
                initial={armed ? { opacity: 0, y: 12 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{
                  duration: DUR.base,
                  ease: EASE,
                  delay: reduced ? 0 : i * STAGGER,
                }}
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${item.id}`}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-lg font-semibold tracking-display transition-colors group-hover:text-ink md:text-xl">
                      {t(item.qKey)}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 font-mono text-lg leading-none transition-transform duration-[250ms] ease-expo"
                      style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : DUR.base, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="copy pb-6">{t(item.aKey)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>

        <aside className="mt-12 md:col-span-4 md:col-start-10 md:mt-0">
          <div
            className="border p-6 md:sticky md:top-[calc(var(--gutter)+2rem)]"
            style={{ borderColor: "var(--line-strong)" }}
          >
            <span className="label">{t("faq_more_label")}</span>
            <h3 className="mt-3 text-xl font-semibold tracking-display">
              {t("faq_more_title")}
            </h3>
            <Rule className="mt-5" />
            <p className="copy-sm mt-5">{t("faq_more_body")}</p>
            <button
              type="button"
              onClick={ask}
              className="signal-link mt-6 inline-flex items-center gap-2 text-base font-semibold"
            >
              {t("faq_more_cta")}
              <span aria-hidden="true" className="font-mono text-xs">
                &rarr;
              </span>
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
