import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_LOCALE, LOCALES } from "./seo";

/**
 * Language is decided by the URL, not by component state.
 *
 * It used to live only in i18next memory, which meant the English version had
 * no address: it could not be linked, shared, bookmarked or indexed, and a
 * reload always came back in Lithuanian. Now / is Lithuanian and /en is
 * English, each prerendered to its own HTML file with its own metadata.
 */

/** "/en", "/en/darbai/x" -> "en"; anything else -> "lt". */
export function localeFromPath(pathname = "/") {
  const seg = pathname.split("/").filter(Boolean)[0];
  return Object.keys(LOCALES).includes(seg) && seg !== DEFAULT_LOCALE
    ? seg
    : DEFAULT_LOCALE;
}

/** The same page in the other locale, preserving the path within it. */
export function swapLocale(pathname = "/") {
  const current = localeFromPath(pathname);
  const next = current === "lt" ? "en" : "lt";
  const parts = pathname.split("/").filter(Boolean);
  if (current !== DEFAULT_LOCALE) parts.shift();
  const rest = parts.join("/");
  const prefix = LOCALES[next];
  return `${prefix}/${rest}`.replace(/\/+$/, "") || "/";
}

/**
 * Binds i18next to the route's locale.
 *
 * The language is set during render rather than in an effect: prerendering
 * has no effects, so an effect would emit Lithuanian HTML for /en and then
 * swap it on the client - a hydration mismatch and a flash of the wrong
 * language. Resources are bundled, so changeLanguage resolves synchronously.
 */
export function useLocale(locale) {
  const { i18n } = useTranslation();

  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  // Keeps <html lang> correct on client-side navigation between locales.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return locale;
}
