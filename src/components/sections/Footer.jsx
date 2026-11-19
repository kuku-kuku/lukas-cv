import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import ChannelLinks from "../ChannelLinks";
import { openConsent } from "../../design/analytics";
import { CAPABILITIES, LEGAL, PRACTICE } from "../../design/content";
import { PRICE_PAGE, SERVICE_PAGES } from "../../design/pages";
import { SITE } from "../../design/seo";
import { useReducedMotion } from "../../design/useMotionPrefs";

/**
 * The closing instrument panel: a status ticker, the channels and one way
 * back to the top. The ticker is aria-hidden decoration built from the
 * capability list, so it can never say something the page does not.
 */
export default function Footer() {
  const { t, i18n } = useTranslation();
  const isLt = i18n.language === "lt";
  const reduced = useReducedMotion();

  const items = [t("footer_available"), ...CAPABILITIES.map((c) => t(c.titleKey))];
  const strip = [...items, ...items];


  return (
    <footer className="relative z-10">
      <div className="h-px w-full" style={{ background: "var(--line)" }} />

      {/* Status ticker. It is inset by the rail like every other piece of
          content - previously it began at x=0 and scrolled underneath the
          sidebar - and its edges are masked so items enter and leave by
          fading rather than being chopped by the viewport. */}
      <div
        className="overflow-hidden py-4 ml-[var(--gutter)] md:ml-[calc(var(--gutter)+var(--rail))]"
        aria-hidden="true"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className={`flex w-max gap-10 ${reduced ? "" : "animate-ticker"}`}>
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
          <p className="mt-2 text-base text-ink-2">{PRACTICE.name}</p>
        </div>

        {/* The services as crawlable links, on every page. Lithuanian only,
            because the service pages are; /en links to its own home. */}
        {isLt && (
          <nav aria-label={t("footer_services")} className="md:order-none">
            <span className="label">{t("footer_services")}</span>
            <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              <li>
                <Link to="/" className="signal-link text-sm font-medium">
                  {t("footer_home_service")}
                </Link>
              </li>
              {SERVICE_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link to={`/${p.slug}`} className="signal-link text-sm font-medium">
                    {p.nav}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={`/${PRICE_PAGE.slug}`} className="signal-link text-sm font-medium">
                  {t("nav_pricing")}
                </Link>
              </li>
              <li>
                <Link to="/darbai" className="signal-link text-sm font-medium">
                  {t("nav_work")}
                </Link>
              </li>
            </ul>
          </nav>
        )}

        <div className="flex flex-col gap-2 md:items-end">
          {/* Icons rather than a row of words: the email address alone ran
              wider than the three names beside it and the row read as a
              ragged list. ChannelLinks is shared with the contact column. */}
          <ChannelLinks tone="chrome" className="mb-3 md:justify-end" />

          <div className="flex flex-wrap gap-x-5 gap-y-1 md:justify-end">
            {/* The canonical host. A bare beneta.lt link costs a redirect
                hop and points crawlers at the non-canonical host. */}
            <a href={`${SITE}/`} className="signal-link text-sm font-medium">
              {PRACTICE.domain}
            </a>
            <Link to="/privatumas" className="signal-link text-sm font-medium">
              {t("nav_privacy", "Privatumo politika")}
            </Link>
            <button
              type="button"
              onClick={openConsent}
              className="signal-link text-left text-sm font-medium"
            >
              {t("consent_settings")}
            </button>
          </div>

          {(LEGAL.entity || LEGAL.code) && (
            <p className="label">
              {[LEGAL.entity, LEGAL.code].filter(Boolean).join(" · ")}
            </p>
          )}

          <p className="label">
            © {new Date().getFullYear()} {t("rights", "All rights reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
