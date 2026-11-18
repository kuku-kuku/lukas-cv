import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  CONSENT_OPEN_EVENT,
  getConsent,
  installClickTracking,
  setConsent,
} from "../design/analytics";

/**
 * Cookie consent for Google Analytics.
 *
 * Rendered only after mount: the prerendered HTML cannot know a visitor's
 * choice, and rendering it on the server would mean a banner flashing for
 * people who already answered (or a hydration mismatch). It is a fixed
 * overlay, so appearing late shifts no layout.
 *
 * Two equal buttons - refusing is as easy as accepting, as the GDPR
 * guidance on consent expects.
 */
export default function ConsentBanner() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!getConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    const untrack = installClickTracking();
    return () => {
      window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
      untrack();
    };
  }, []);

  if (!open) return null;

  const choose = (value) => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("consent_title")}
      className="fixed inset-x-3 bottom-3 z-[95] border p-5 md:inset-x-auto md:bottom-6 md:right-6 md:max-w-[26rem]"
      style={{
        background: "var(--bg-elev)",
        borderColor: "var(--line-strong)",
        borderTopColor: "var(--signal)",
        borderTopWidth: "2px",
        color: "var(--ink)",
      }}
    >
      <p className="label" style={{ color: "var(--signal)" }}>
        {t("consent_title")}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-2">
        {t("consent_body")}{" "}
        <Link to="/privatumas" className="signal-link">
          {t("nav_privacy", "Privatumo politika")}
        </Link>
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="border px-4 py-3 text-sm font-semibold"
          style={{ borderColor: "var(--line-strong)" }}
        >
          {t("consent_deny")}
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="border px-4 py-3 text-sm font-semibold"
          style={{ borderColor: "var(--signal)", background: "var(--signal)", color: "var(--bg)" }}
        >
          {t("consent_accept")}
        </button>
      </div>
    </div>
  );
}
