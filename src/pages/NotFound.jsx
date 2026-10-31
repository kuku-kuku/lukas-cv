import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PRACTICE } from "../design/content";

/**
 * 404, in the same language as the rest of the site: a status readout rather
 * than a sad illustration. The 2.4 MB photographic background it used to load
 * is gone - this page now costs nothing but the stylesheet.
 */
export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col justify-between px-5 py-8 md:px-10">
      <div className="flex items-baseline justify-between">
        <Link to="/" className="text-base font-extrabold tracking-tightest">
          {PRACTICE.mark}
        </Link>
        <span className="label" style={{ color: "var(--signal)" }}>
          HTTP 404
        </span>
      </div>

      <div>
        <span className="label">{t("not_found_code", "Resource not found")}</span>
        <h1 className="display-l mt-5 max-w-[22ch]">{t("not_found_title")}</h1>
        <p className="lede mt-6 max-w-[48ch]">{t("not_found_subtitle")}</p>

        <div className="mt-10 h-px w-full" style={{ background: "var(--line)" }} />
        <Link
          to="/"
          className="group mt-8 inline-flex items-center gap-3 border px-6 py-4 text-sm font-semibold"
          style={{ borderColor: "var(--signal)" }}
        >
          <span
            aria-hidden="true"
            className="font-mono text-xs transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          {t("back_home")}
        </Link>
      </div>

      <div className="flex items-baseline justify-between">
        <span className="label">{PRACTICE.domain}</span>
        <span className="label">
          {PRACTICE.locality} - {PRACTICE.country}
        </span>
      </div>
    </div>
  );
}
