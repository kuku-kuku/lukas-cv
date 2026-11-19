// Explicit extensions: plain Node may import this module too.
import { CARE, CHANNELS, HOURLY, PACKAGES } from "./content.js";
import { SITE, urlFor } from "./seo.js";
import { plainText } from "./text.js";

/**
 * STRUCTURED DATA - every JSON-LD node on the site is built here.
 *
 * Rules:
 *  - Prices come from PACKAGES / CARE / HOURLY, never typed here, so the
 *    markup cannot disagree with the cards.
 *  - FAQ markup is generated from the same arrays the visible FAQ renders.
 *  - Entities have stable @ids; pages refer to the business, the person and
 *    the price catalogue by @id instead of repeating them.
 *  - Nothing that is not on the site: no ratings, reviews, phone or street
 *    address.
 *
 * Note on FAQPage: Google shows FAQ rich results only for well-known
 * government and health sites, so this earns no visible SERP feature. It is
 * kept because it is valid, cheap and exactly mirrors the visible answers
 * (it was removed once in 2026-11 and restored by the SEO brief of
 * 2026-11-19).
 */

export const ORG_ID = `${SITE}/#business`;
export const PERSON_ID = `${SITE}/#lukas`;
export const WEBSITE_ID = `${SITE}/#website`;
export const CATALOG_ID = `${SITE}/svetainiu-kurimo-kaina#catalog`;

const pkg = (id) => PACKAGES.find((p) => p.id === id);
const care = (id) => CARE.find((c) => c.id === id);

const offer = (name, url, spec) => ({
  "@type": "Offer",
  itemOffered: { "@type": "Service", name },
  url,
  priceCurrency: "EUR",
  priceSpecification: {
    "@type": spec.unitCode ? "UnitPriceSpecification" : "PriceSpecification",
    priceCurrency: "EUR",
    valueAddedTaxIncluded: false,
    ...spec,
  },
});

/** The price list, defined once. Shown in full on /svetainiu-kurimo-kaina. */
const CATALOG = {
  "@type": "OfferCatalog",
  "@id": CATALOG_ID,
  name: "Svetainių kūrimo ir priežiūros kainos",
  url: urlFor("lt", "svetainiu-kurimo-kaina"),
  itemListElement: [
    offer("Vieno puslapio svetainė", urlFor("lt", "svetainiu-kurimo-kaina"), {
      minPrice: pkg("onepage").price,
    }),
    offer("Verslo svetainė", urlFor("lt", "svetainiu-kurimo-kaina"), {
      minPrice: pkg("business").price,
    }),
    offer("El. parduotuvė", urlFor("lt", "elektroniniu-parduotuviu-kurimas"), {
      minPrice: pkg("custom").price,
    }),
    offer("Individuali verslo sistema", urlFor("lt", "individualus-programavimas"), {
      minPrice: pkg("custom").price,
    }),
    offer("Svetainės priežiūra: Ramybė", urlFor("lt", "svetainiu-prieziura"), {
      price: care("calm").price,
      unitCode: "MON",
    }),
    offer("Svetainės priežiūra: Augimas", urlFor("lt", "svetainiu-prieziura"), {
      price: care("growth").price,
      unitCode: "MON",
    }),
    offer("Vienkartiniai darbai", urlFor("lt", "svetainiu-kurimo-kaina"), {
      price: HOURLY,
      unitCode: "HUR",
    }),
  ],
};

const SAME_AS = [CHANNELS.linkedin, CHANNELS.facebook, CHANNELS.instagram].filter(Boolean);

const BUSINESS = {
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: "Beneta",
  alternateName: "Beneta - Lukas Beneta",
  url: `${SITE}/`,
  image: `${SITE}/og.png`,
  // The square mark is what Google reads for the logo beside a result.
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/logo512.png`,
    width: 512,
    height: 512,
  },
  sameAs: SAME_AS,
  description:
    "Internetinių svetainių, el. parduotuvių ir verslo sistemų kūrimas, atnaujinimas ir priežiūra Lietuvos verslui. Fiksuota kaina iš anksto, darbas nuotoliniu būdu.",
  email: CHANNELS.email,
  // A remote practice serves an area, not an address: a service-area
  // business with no street address published.
  areaServed: { "@type": "Country", name: "Lietuva" },
  availableLanguage: ["lt", "en"],
  priceRange: `${HOURLY}-${pkg("custom").price}+ EUR`,
  currenciesAccepted: "EUR",
  address: { "@type": "PostalAddress", addressCountry: "LT" },
  founder: { "@id": PERSON_ID },
  knowsAbout: [
    "Svetainių kūrimas",
    "Elektroninių parduotuvių kūrimas",
    "WordPress",
    "WooCommerce",
    "React",
    "Node.js",
    "Verslo procesų automatizavimas",
    "Techninis SEO",
    "Svetainių greitis",
  ],
  hasOfferCatalog: CATALOG,
};

const PERSON = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Lukas Beneta",
  jobTitle: "Full-stack programuotojas",
  worksFor: { "@id": ORG_ID },
  url: `${SITE}/`,
  sameAs: [CHANNELS.linkedin].filter(Boolean),
};

const WEBSITE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE}/`,
  name: "Beneta",
  inLanguage: ["lt-LT", "en"],
  publisher: { "@id": ORG_ID },
};

/** Emitted once per document from root.jsx: the site-wide entities. */
export const SITE_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [WEBSITE, BUSINESS, PERSON],
};

/* ---------- per-page nodes, returned as React Router meta entries ---------- */

const ld = (node) => ({
  "script:ld+json": { "@context": "https://schema.org", ...node },
});

/** WebPage-type node for a page. `type` may be CollectionPage etc. */
export function webPageJsonLd({ locale = "lt", path = "", name, description, type = "WebPage", extra = {} }) {
  const url = urlFor(locale, path);
  return ld({
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale === "lt" ? "lt-LT" : "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    ...extra,
  });
}

/** BreadcrumbList for a page one level below the home page. */
export function breadcrumbJsonLd(name, path) {
  return ld({
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Pradžia", item: urlFor("lt") },
      { "@type": "ListItem", position: 2, name, item: urlFor("lt", path) },
    ],
  });
}

/**
 * FAQPage from the visible FAQ items ({ q, a }). Link markup in answers is
 * stripped to its anchor text, so the text matches what is on the page.
 */
export function faqJsonLd(items, { locale = "lt", path = "" } = {}) {
  return ld({
    "@type": "FAQPage",
    "@id": `${urlFor(locale, path)}#faq`,
    inLanguage: locale === "lt" ? "lt-LT" : "en",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: plainText(q),
      acceptedAnswer: { "@type": "Answer", text: plainText(a) },
    })),
  });
}

/** Service node for a service page, priced from the same constants. */
export function serviceJsonLd(page) {
  const url = urlFor("lt", page.slug);
  const offers = (page.offers || [{ price: page.priceFrom, unitCode: page.priceUnit }]).map((o) => {
    const spec = o.unitCode
      ? { "@type": "UnitPriceSpecification", price: o.price, unitCode: o.unitCode }
      : { "@type": "PriceSpecification", minPrice: o.price };
    return {
      "@type": "Offer",
      ...(o.name ? { name: o.name } : {}),
      priceCurrency: "EUR",
      priceSpecification: { ...spec, priceCurrency: "EUR", valueAddedTaxIncluded: false },
    };
  });
  return ld({
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.serviceName,
    serviceType: page.serviceType,
    description: page.description,
    url,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Lietuva" },
    offers: offers.length === 1 ? offers[0] : offers,
  });
}
