import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionHead from "../SectionHead";
import Reveal from "../motion/Reveal";
import Rule from "../motion/Rule";
import { CARE, HOURLY, PACKAGES } from "../../design/content";
import { DUR, EASE, STAGGER, VIEWPORT } from "../../design/motion";
import useReveal from "../../design/useReveal";
import { useReducedMotion } from "../../design/useMotionPrefs";

/**
 * 03 - PRICING
 *
 * The single most common question a small business has, answered before they
 * have to ask it. Three packages, the middle one emphasised; every price
 * comes from PACKAGES/CARE/HOURLY in content.js so the cards, the budget
 * select on the contact form and the JSON-LD can never disagree.
 *
 * On a light ground: this is the densest block of text on the page, and long
 * copy reads easier dark-on-light.
 *
 * Each card's button opens the quote drawer with that package already
 * chosen, so deciding and enquiring is one movement instead of two.
 */
export default function Pricing({ onChoose }) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [revealRef, armed] = useReveal();

  // Opens the quote drawer. Scrolling to the contact section instead would
  // take the visitor away from the prices they are comparing and leave the
  // decision they just made behind.
  const choose = (id) => onChoose?.(id);

  return (
    <section
      id="pricing"
      ref={revealRef}
      aria-labelledby="pricing-title"
      className="invert-section section relative z-10 border-y"
      style={{ borderColor: "rgba(10,10,11,0.35)" }}
    >
      <div className="shell">
        <SectionHead
          id="pricing"
          index="03"
          eyebrow={t("nav_pricing")}
          title={t("pricing_title")}
          lede={t("pricing_lede")}
        />

        <ol className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <motion.li
              key={pkg.id}
              className={`relative flex flex-col border p-6 md:p-8 ${
                pkg.featured ? "lg:-mt-4 lg:pb-12" : ""
              } ${pkg.featured ? "order-first lg:order-none" : ""}`}
              style={{
                borderColor: pkg.featured ? "var(--signal)" : "var(--line-strong)",
                borderWidth: pkg.featured ? 2 : 1,
              }}
              initial={armed ? { opacity: 0, y: 16 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: DUR.base,
                ease: EASE,
                delay: reduced ? 0 : i * STAGGER,
              }}
            >
              {pkg.featured && (
                <span
                  className="label absolute -top-3 left-6 px-2"
                  style={{ background: "#f1efea", color: "var(--signal)" }}
                >
                  {t("pkg_popular")}
                </span>
              )}

              <h3 className="text-2xl font-semibold tracking-display">
                {t(pkg.titleKey)}
              </h3>
              <p className="copy-sm mt-3">{t(pkg.forKey)}</p>

              <p className="mt-6 flex items-baseline gap-2">
                <span className="label">{t("pkg_from")}</span>
                <span className="nums text-4xl font-bold tracking-tightest">
                  {pkg.price} &euro;
                </span>
              </p>
              <p className="label mt-2">{pkg.duration}</p>

              <Rule className="my-6" />

              <span className="label">{t("pkg_includes")}</span>
              <ul className="mt-4 flex-1 space-y-2.5">
                {pkg.includes.map((key) => (
                  <li key={key} className="flex gap-3 text-base leading-snug">
                    <span
                      aria-hidden="true"
                      className="mt-[0.45em] h-1.5 w-1.5 shrink-0"
                      style={{ background: "var(--signal)" }}
                    />
                    {t(key)}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => choose(pkg.id)}
                className="group relative mt-8 inline-flex items-center justify-between gap-4 overflow-hidden border px-6 py-4 text-base font-semibold"
                style={{ borderColor: "var(--signal)" }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left scale-x-0 transition-transform duration-[300ms] ease-expo group-hover:scale-x-100"
                  style={{ background: "var(--signal)" }}
                />
                <span className="relative transition-colors duration-200 group-hover:text-bone">
                  {t("pkg_choose")}
                </span>
                <span
                  aria-hidden="true"
                  className="relative font-mono text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:text-bone"
                >
                  &rarr;
                </span>
              </button>
            </motion.li>
          ))}
        </ol>

        {/* ---- care plans + hourly ---- */}
        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <h3 className="display-m">{t("care_title")}</h3>
              <p className="copy mt-3">{t("care_lede")}</p>
            </Reveal>
            <Rule className="mt-6" />
            <ul>
              {CARE.map((plan) => (
                <li
                  key={plan.id}
                  className="border-b py-5"
                  style={{ borderColor: "var(--line)" }}
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <h4 className="text-lg font-semibold">{t(plan.titleKey)}</h4>
                    <span className="nums whitespace-nowrap font-mono text-base">
                      {t("pkg_from")} {plan.price} &euro;{t("care_month")}
                    </span>
                  </div>
                  <p className="copy-sm mt-2">{t(plan.bodyKey)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={0.08}>
              <h3 className="display-m">{t("hourly_title")}</h3>
              <p className="copy mt-3">
                {t("hourly_body").replace("35", String(HOURLY))}
              </p>
              <Rule className="mt-6" />
              <p className="copy-sm mt-6">{t("rate_note")}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
