import i18n from "../i18n";
import { FAQ } from "./content";

/**
 * Per-route document metadata.
 *
 * One place builds the title, description, canonical, Open Graph tags and the
 * hreflang set, so a new route cannot ship with half of them. Every URL here
 * is absolute: canonical and hreflang are meaningless relative.
 *
 * The locale pair is the whole point of the hreflang block - lt at / and en
 * at /en, with x-default pointing at lt because that is the primary market.
 */

export const SITE = "https://www.beneta.lt";

/** Locale -> path prefix. Adding a locale means adding one line here. */
export const LOCALES = {
  lt: "",
  en: "/en",
};

export const DEFAULT_LOCALE = "lt";

const OG_LOCALE = { lt: "lt_LT", en: "en_US" };

/** What the share card shows, for anyone who cannot see it. */
const IMAGE_ALT = "Beneta - software engineering practice";

/** Absolute URL for a path within a locale. */
export function urlFor(locale, path = "") {
  const prefix = LOCALES[locale] ?? "";
  const tail = path.replace(/^\/+/, "");
  // The root must keep its trailing slash: https://www.beneta.lt/ and
  // https://www.beneta.lt are the same page but not the same canonical.
  if (!prefix && !tail) return `${SITE}/`;
  return `${SITE}${prefix}${tail ? `/${tail}` : ""}`;
}

/**
 * The alternates for one page across every locale, plus x-default.
 * `path` is the page within the locale ("" for the home page,
 * "darbai/bangu-klinika" for a case study).
 *
 * The key is lowercase `hreflang`, not React's camelCase `hrefLang`. React
 * Router writes these props onto the tag verbatim, so camelCase ships a
 * `hrefLang=` attribute that search engines do not read - which is what
 * happened the first time. React's dev build warns about the unknown DOM
 * property; the warning is the price of correct output. Check the built
 * HTML, not the console, before changing this.
 */
export function alternates(path = "") {
  const links = Object.keys(LOCALES).map((locale) => ({
    tagName: "link",
    rel: "alternate",
    hreflang: locale,
    href: urlFor(locale, path),
  }));
  links.push({
    tagName: "link",
    rel: "alternate",
    hreflang: "x-default",
    href: urlFor(DEFAULT_LOCALE, path),
  });
  return links;
}

/**
 * Builds the full meta array for a route.
 *
 * @param {object} o
 * @param {"lt"|"en"} o.locale
 * @param {string} o.title      full <title>
 * @param {string} o.description
 * @param {string} [o.path]     page within the locale, "" for home
 * @param {string} [o.image]    absolute or site-relative OG image
 * @param {boolean} [o.noIndex] keep the page out of the index
 * @param {boolean} [o.translated] false for a page that exists in one locale
 *   only - declaring an hreflang alternate that 404s is worse than
 *   declaring none.
 */
export function buildMeta({
  locale,
  title,
  description,
  path = "",
  image = "/og.png",
  noIndex = false,
  translated = true,
}) {
  const url = urlFor(locale, path);
  const img = image.startsWith("http") ? image : `${SITE}${image}`;

  const tags = [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },

    { property: "og:site_name", content: "Beneta" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: img },
    // Facebook and Messenger will not render a card until they have fetched
    // the image themselves; declaring the type and the exact box lets them
    // lay the card out on the first pass instead of showing a blank frame
    // while the crawler catches up.
    { property: "og:image:secure_url", content: img },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: IMAGE_ALT },
    { property: "og:url", content: url },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: OG_LOCALE[locale] },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
    { name: "twitter:image:alt", content: IMAGE_ALT },
  ];

  if (translated) {
    Object.keys(LOCALES)
      .filter((l) => l !== locale)
      .forEach((l) =>
        tags.push({ property: "og:locale:alternate", content: OG_LOCALE[l] })
      );
  }

  if (noIndex) {
    tags.push({ name: "robots", content: "noindex, nofollow" });
  } else if (translated) {
    tags.push(...alternates(path));
  }

  return tags;
}

/**
 * FAQPage structured data, built from the same strings the page renders.
 *
 * Google can show these answers directly in search results, so they must be
 * the answers on the page - not a separate, friendlier set written for the
 * crawler. Taking them from i18n guarantees that.
 */
export function faqJsonLd(locale) {
  const t = i18n.getFixedT(locale);

  return {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: t(item.qKey),
        acceptedAnswer: { "@type": "Answer", text: t(item.aKey) },
      })),
    },
  };
}
