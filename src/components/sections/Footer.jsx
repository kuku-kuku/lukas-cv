import React from "react";
import { useTranslation } from "react-i18next";
import { CAPABILITIES, PRACTICE } from "../../design/content";
import { useReducedMotion } from "../../design/useMotionPrefs";

/**
 * The closing instrument panel: a status ticker, the colophon, and one way
 * back to the top. The ticker is aria-hidden decoration built from the
 * capability list, so it can never say something the page does not.
 */
export default function Footer() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  const items = [
    t("footer_available"),
    ...CAPABILITIES.map((c) => t(c.titleKey)),
    `${PRACTICE.locality} - ${PRACTICE.country}`,
  ];
  const strip = [...items, ...items];

  return (
    <footer className="relative z-10">
      <div className="h-px w-full" style={{ background: "var(--line)" }} />

      {/* status ticker */}
      <div className="overflow-hidden py-4" aria-hidden="true">
        <div
          className={`flex w-max gap-10 ${reduced ? "" : "animate-ticker"}`}
          style={{ willChange: reduced ? undefined : "transform" }}
        >
          {strip.map((item, i) => (
            <span key={`${item}-${i}`} className="label whitespace-nowrap">
              {item}
              <span className="ml-10" style={{ color: "var(--signal)" }}>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="h-px w-full" style={{ background: "var(--line)" }} />

      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="block text-3xl font-extrabold tracking-tightest md:text-4xl">
            {PRACTICE.mark}
          </span>
          <p className="mt-2 text-sm text-ink-3">
            {PRACTICE.name} · {PRACTICE.locality}, {PRACTICE.country}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <a
            href={`https://${PRACTICE.domain}`}
            className="signal-link text-sm font-medium"
            rel="noreferrer"
          >
            {PRACTICE.domain}
          </a>
          <p className="label">
            © {new Date().getFullYear()} {t("rights", "All rights reserved")}
          </p>
          <p className="label">{t("colophon")}</p>
        </div>
      </div>
    </footer>
  );
}
