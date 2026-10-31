import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionHead from "../SectionHead";
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
 */
export default function Faq() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [revealRef, armed] = useReveal();
  const [open, setOpen] = useState(null);

  return (
    <section
      id="faq"
      ref={revealRef}
      aria-labelledby="faq-title"
      className="shell section relative z-10"
    >
      <SectionHead
        id="faq"
        index="05"
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
      </div>
    </section>
  );
}
